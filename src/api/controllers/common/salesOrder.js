const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 10 })
uid.setDictionary('alpha_upper');
const path = require('path');
const xlsx = require('xlsx');

exports.salesController = async (req, res) => {
    try {
        let sales = await prisma.sales.create({

        })
    } catch (error) {
        console.log('sales controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

exports.createOrder = async (req, res) => {
    try {
        const order_id = uid.rnd();
        let cart = [];
        let total = 0
        cart = await Promise.all(
            req.body.product_list.map(async (element) => {

                let product = await prisma.product.findUnique({
                    where: {
                        product_id: element.product_id,
                    },
                    omit: {
                        created_by: true,
                        created_at: true,
                        updated_by: true,
                        updated_at: true,
                    }
                });
                if (product) {
                    product.count = element.count;
                    console.log(product)
                    total = total + product.price * element.count
                    console.log(total)
                    return product;
                }
                return null;
            })
        );


        let order = await prisma.orders.create({
            data: {
                order_id: order_id,
                userUid: req.user.user_id,
                product_list: cart,
                order_total: total,
                offers: { "offer": "test" },
                shipping_address: req.body.shipping_address,
                status: "pending",
                delivery_agent_id: 1
            }
        })

        return res.json({ success: true, status: 200, message: "Order created" })

    } catch (error) {
        console.log('order controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

exports.adminGetOrderList = async (req, res) => {
    try {
        let order_list = await prisma.orders.findMany({
            include: {
                delivery_person_details: {
                    select: {
                        phone_num: true,
                        first_name: true,
                        last_name: true,
                    }
                },
                customer: {
                    select: {
                        userUid: true,
                        customer_name: true,
                        customer_type: true,
                        phone_num: true
                    }
                }
            },
        })
        return res.json({ success: true, status: 200, orderList: order_list })
    } catch (error) {
        console.log('order list controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

exports.customerGetOrderList = async (req, res) => {
    try {
        let order_list = await prisma.orders.findMany({
            where: {
                userUid: req.user.user_id
                // userUid: 'ahsnhFMsjhhBkwdhxhXDt8Uk5Uo1'
            },
            select: {
                order_id: true,
                product_list: true,
                order_total: true,
                offers: true,
                shipping_address: true,
                status: true,
                delivery_agent_id: false,
                created_at: true
            },
            orderBy: {
                id: 'asc'
            }
        })
        return res.json({ success: true, status: 200, orderList: order_list })
    } catch (error) {
        console.log('order list controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

exports.generateOrderReport = async (req, res) => {
    try {
        let order_list = await prisma.orders.findMany({
            include: {
                customer: {
                    select: {
                        customer_name: true,
                        phone_num: true,
                        customer_type: true,
                    }
                }
            },
        })

        console.log('order list>>>', order_list)

        if (order_list) {
            const excelFilePath = path.join(__dirname, "../../../../admin_files/reports/", 'orderreport.xlsx')
            await exportToExcel(order_list, excelFilePath)
            return res.json({ success: true, status: 200 })
        }

    } catch (error) {
        console.log('generate order report controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

exports.adminSearchOrder = async (req, res) => {
    try {
        console.log('req body>>>', req.body)
        console.log('from data>>>>', req.body.from_date)
        console.log('to date>>>>', req.body.to_date)
        console.log('search keyword>>>>', req.body.search_keyword)

        let whereCondition = {
            OR: [
                {
                    customer: {
                        customer_name: {
                            contains: req.body.search_keyword
                        }
                    }
                },
                {
                    customer: {
                        userUid: {
                            contains: req.body.search_keyword
                        }
                    }
                },
                {
                    status: {
                        contains: req.body.search_keyword
                    }
                },
                {
                    order_id: {
                        contains: req.body.search_keyword
                    }
                }
            ]
        };

        if (req.body.to_date && req.body.from_date) {
            whereCondition.AND = [
                {
                    created_at: {
                        lte: new Date(req.body.to_date).toISOString(),
                        gte: new Date(req.body.from_date).toISOString()
                    }
                }
            ];
        }

        let order_list = await prisma.orders.findMany({
            include: {
                delivery_person_details: {
                    select: {
                        phone_num: true,
                        first_name: true,
                        last_name: true,
                    }
                },
                customer: {
                    select: {
                        userUid: true,
                        customer_name: true,
                        customer_type: true,
                        phone_num: true
                    }
                }
            },
            where: whereCondition
        })

        return res.json({ success: true, status: 200, orderList: order_list })
    } catch (error) {
        console.log('search order by date controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

async function exportToExcel(data, excelFilePath) {
    const workbook = xlsx.utils.book_new();
    // const today = new Date().toLocaleDateString('en-GB');
    // const [startYear, startMonth, startDay] = start_date.split('-');
    // const formattedStartDate = `${startDay}/${startMonth}/${startYear}`;

    // const [endYear, endMonth, endDay] = end_date.split('-');
    // const formattedEndDate = `${endDay}/${endMonth}/${endYear}`;

    const firstHeader = ['GoCow'];
    const secondHeader = ['List of Orders for the period:'];
    // const thirdHeader = ['From Date:', formattedStartDate, '', 'To Date:', formattedEndDate];
    const headers = ['Sl No.', 'Order ID', 'Order Total', 'Status', 'Shipping Address', 'Customer Name', 'Phone Number', 'Customer Type'];
    const worksheet = [firstHeader, secondHeader, [], [], headers, ...data.map((row, index) => [
        index + 1,
        row.order_id,
        row.order_total.toString(),
        row.status,
        row.shipping_address.address,
        row.customer.customer_name,
        row.customer.phone_num,
        row.customer.customer_type
    ])];
    const ws = xlsx.utils.aoa_to_sheet(worksheet);
    xlsx.utils.book_append_sheet(workbook, ws, 'Data');
    xlsx.writeFile(workbook, excelFilePath);
}
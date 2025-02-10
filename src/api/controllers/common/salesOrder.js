const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 10 })
uid.setDictionary('alpha_upper');

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
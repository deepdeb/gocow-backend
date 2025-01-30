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
        
        console.log(">>>>", req.body.product_list);

        let order = await prisma.orders.create({
           data: { order_id: order_id,
            userUid: "req.user.user_id",
            product_list: req.body.product_list,
            order_total: 3000,
            offers: { "offer" : "test"},
            shipping_address : req.body.shipping_address,
            status : "pending",
            delivery_agent_id: 1}
        })

        return res.json({ success: true, status: 200, message: "Order created"})

    } catch (error) {
        console.log('order controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

exports.adminGetOrderList = async (req, res) => {
    try {
        let order_list = await prisma.orders.findMany({})
        return res.json({ success: true, status: 200, response: order_list})
    } catch (error) {
        console.log('order list controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

exports.customerGetOrderList = async (req, res) => {
    try {
        let order_list = await prisma.orders.findMany({
            where: {
                userUid: "req.user.user_id"
            },
            select: {
                order_id: true,
                product_list: true,
                order_total: true,
                offers: true,
                shipping_address: true,
                status: true,
                delivery_agent_id: false
            }
        })
        return res.json({ success: true, status: 200, response: order_list})
    } catch (error) {
        console.log('order list controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}
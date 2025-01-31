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



        let order = await prisma.orders.create({
           data: { order_id: order_id,
            userUid: req.user.user_id,
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
        return res.json({ success: true, status: 200, orderList: order_list})
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
        const updatedOrderList = await updateOrderProducts(order_list);
        return res.json({ success: true, status: 200, orderList: updatedOrderList})
    } catch (error) {
        console.log('order list controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}


async function updateOrderProducts(orderList) {
    const updatedOrders = [];
    // Iterate through each order
    for (let order of orderList) {
    var total = 0

      // Create an array of promises for finding products
      const productPromises = order.product_list.map(async (product) => {

        const productData = await prisma.product.findUnique({
          where: { product_id: product.product_id },
          omit: {
            created_by: true,
            created_at: true,
            updated_by: true,
            updated_at: true,
          },
        });
  
        // Return updated product data with the correct count
        if (productData) {
            total = total + product.count * productData.price
            order.total = total
          productData.count=product.count
          product = productData
          return product;
        }
      });
  
      // Wait for all product queries to complete using Promise.all
      const updatedProductList = await Promise.all(productPromises);
  
      // Push the updated order with the new product list
      updatedOrders.push({
        ...order,
        product_list: updatedProductList,
      });
    }
  
    return updatedOrders;
  }
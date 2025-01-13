const Joi = require('joi');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProductListController = async (req, res) => {
    try {
        let productList = await prisma.product.findMany({})
        return res.json({ success: true, status: 200, message: res.message, products: productList})
    } catch (error) {
        console.log('Get product list controller error: ', error);
        return res.json({ success: false, status: 400, message: error, products: []})
    }
}
const Joi = require('joi');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProductListController = async (req, res) => {
    try {
        let productList = await prisma.$queryRaw`select pl.product_id, pl.product_name, pl.catch_phrase, pl.product_image, pl.product_description, pl.price, pl.availability, pl.unit, pl.package, o.offer_type, o.offer_amount, pl.price - (pl.price * (o.offer_amount / 100)) as final_price, (pl.price * (o.offer_amount / 100)) as difference from product as pl left join offers as o on o.product_id = pl.product_id where pl.is_deleted = 0`
        return res.json({ success: true, status: 200, message: res.message, products: productList })
    } catch (error) {
        console.log('Get product list controller error: ', error);
        return res.json({ success: false, status: 400, message: error, products: [] })
    }
}

exports.getProductListCustomerController = async (req, res) => {
    try {
        let productList = await prisma.$queryRaw`select pl.product_id, pl.product_name, pl.catch_phrase, pl.product_image, pl.product_description, pl.price, pl.availability, pl.unit, pl.package, o.offer_type, o.offer_amount, pl.price - (pl.price * (o.offer_amount / 100)) as final_price, (pl.price * (o.offer_amount / 100)) as difference from product as pl left join offers as o on o.product_id = pl.product_id where pl.is_deleted = 0`
        return res.json({ success: true, status: 200, message: res.message, products: productList })
    } catch (error) {
        console.log('Get product list customer controller error: ', error);
        return res.json({ success: false, status: 400, message: error, products: [] })
    }
}
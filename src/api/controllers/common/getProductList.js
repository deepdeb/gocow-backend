const Joi = require('joi');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProductListAdminController = async (req, res) => {
    try {
        // let productList = await prisma.$queryRaw`select pl.product_id, pl.product_name, pl.catch_phrase, pl.product_image, pl.product_description, pl.price, pl.availability, pl.unit, pl.package, o.offer_type, o.offer_amount, pl.price - (pl.price * (o.offer_amount / 100)) as final_price, (pl.price * (o.offer_amount / 100)) as difference, pl.updated_at, pl.updated_by, pl.created_at, pl.created_by from product as pl left join offers as o on o.product_id = pl.product_id where pl.is_deleted = 0`

        let productList = await prisma.product.findMany({})
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

exports.getProductListAdminWithSearch = async (req, res) => {
    try {
        console.log('search keyword>>>', req.body.search_keyword)
        var productList;
        var search_keyword = req.body.search_keyword
        var search_query_extended = ''

        if (req.body.search_keyword) {
            search_query_extended = ` and pl.product_name like '%${search_keyword}%'`
        }

        let rawQuery = "select pl.product_id, pl.product_name, pl.catch_phrase, pl.product_image, pl.product_description, pl.price, pl.availability, pl.unit, pl.package, o.offer_type, o.offer_amount, pl.price - (pl.price * (o.offer_amount / 100)) as final_price, (pl.price * (o.offer_amount / 100)) as difference, pl.updated_at, pl.updated_by, pl.created_at, pl.created_by from product as pl left join offers as o on o.product_id = pl.product_id where pl.is_deleted = 0" + search_query_extended + ""

        console.log('raw query>>>', rawQuery)

        console.log()

        productList = await prisma.$queryRawUnsafe(rawQuery);

        return res.json({ success: true, status: 200, products: productList })
    } catch (error) {
        console.log('Get product list with search controller error: ', error);
        return res.json({ success: false, status: 400, message: error, products: [] })
    }
}
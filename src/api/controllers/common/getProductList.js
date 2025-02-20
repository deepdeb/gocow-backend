const Joi = require('joi');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProductListAdminController = async (req, res) => {
    try {
        let productList = await prisma.product.findMany({
            where: {
                is_deleted: false
            }
        })
        return res.json({ success: true, status: 200, message: res.message, products: productList })
    } catch (error) {
        console.log('Get product list controller error: ', error);
        return res.json({ success: false, status: 400, message: error, products: [] })
    }
}

// exports.getProductListCustomerController = async (req, res) => {
//     try {
//         let productList = await prisma.$queryRaw`select pl.product_id, pl.product_name, pl.catch_phrase, pl.product_image, pl.product_description, pl.price, pl.availability, pl.unit, pl.package, o.type, o.discount_value, pl.price - (pl.price * (o.discount_value / 100)) as final_price, (pl.price * (o.discount_value / 100)) as difference from product as pl left join offer as o on o.product_id = pl.product_id where pl.is_deleted = 0`
//         return res.json({ success: true, status: 200, message: res.message, products: productList })
//     } catch (error) {
//         console.log('Get product list customer controller error: ', error);
//         return res.json({ success: false, status: 400, message: error, products: [] })
//     }
// }

exports.getProductListAdminWithSearch = async (req, res) => {
    try {

        const allProducts = await prisma.product.findMany();

        const priceInStrings = allProducts.map(product => product.price.toString());

        const pricesMatchingReqPrice = priceInStrings.filter(price => price.includes(req.body.search_keyword));

        let productList = await prisma.product.findMany({
            where: {
                OR: [
                    {
                        product_name: {
                            contains: req.body.search_keyword
                        }
                    },
                    {
                        price: {
                            in: pricesMatchingReqPrice
                        }
                    }
                ]
            }
        })

        return res.json({ success: true, status: 200, products: productList })
    } catch (error) {
        console.log('Get product list with search controller error: ', error);
        return res.json({ success: false, status: 400, message: error, products: [] })
    }
}

exports.getProductListCustomerController = async (req, res) => {

    try {
        let productList = await prisma.product.findMany({

            where: {
                is_deleted: false
            },
            include: {
                offer_product: {
                    include: {
                        offer: {
                            omit: {
                                created_at: true,
                                updated_at: true,
                                admin_id: true
                            }
                        }
                    }
                }
            },
            omit:{
                created_at:true,
                created_by:true,
                updated_at:true,
                updated_by:true,
            }
        })

        const filteredProducts = productList.map(product => ({
            ...product,
            offer_product: product.offer_product.filter(op =>
              op.offer.is_active 
            ),
          }));

        return res.json({ success: true, status: 200, message: res.message, products: filteredProducts })
    } catch (error) {
        console.log('Get product list customer controller error: ', error);
        return res.json({ success: false, status: 400, message: error, products: [] })
    }
}
const { PrismaClient } = require('@prisma/client');
const Joi = require('joi');
const prisma = new PrismaClient()
exports.createProductListController = async (req, res) => {
    try {
        let products = [
            {
                "product_id": 1,
                "product_name": "Farm Fresh Milk",
                "catch_phrase": "Freshness in every sip",
                "product_image": "assets/images/milk_carton.png",
                "product_description": 'null',
                "price": 50.00,
                "availability": 'null',
                "unit": "1 ltr",
                "package": "bottle"
            },
            {
                "product_id": 2,
                "product_name": "Farm Fresh Milk",
                "catch_phrase": "Freshness in every sip",
                "product_image": "assets/images/milk_packet.png",
                "product_description": 'null',
                "price": 29.00,
                "availability": 'null',
                "unit": "500 ml",
                "package": "bottle"
            },
            {
                "product_id": 3,
                "product_name": "Farm Fresh Milk",
                "catch_phrase": "Freshness in every sip",
                "product_image": "assets/images/milk_packet.png",
                "product_description": 'null',
                "price": 15.00,
                "availability": 'null',
                "unit": "300 ml",
                "package": "bottle"
            },
            {
                "product_id": 4,
                "product_name": "Farm Fresh Pure Ghee",
                "catch_phrase": "Freshness in every sip",
                "product_image": "assets/images/ghee_product.png",
                "product_description": 'null',
                "price": 230.00,
                "availability": 'null',
                "unit": "500 mg",
                "package": "bottle"
            },
            {
                "product_id": 5,
                "product_name": "Farm Fresh Pure Ghee",
                "catch_phrase": "Freshness in every sip",
                "product_image": "assets/images/ghee_product.png",
                "product_description": 'null',
                "price": 120.00,
                "availability": 'null',
                "unit": "250 mg",
                "package": "bottle"
            },
            {
                "product_id": 6,
                "product_name": "Paneer",
                "catch_phrase": "Freshness in every sip",
                "product_image": "assets/images/paneer_product.png",
                "product_description": 'null',
                "price": 45.00,
                "availability": 'null',
                "unit": "300 mg",
                "package": "pack"
            },
            {
                "product_id": 7,
                "product_name": "Paneer",
                "catch_phrase": "Freshness in every sip",
                "product_image": "assets/images/paneer_product.png",
                "product_description": 'null',
                "price": 30.00,
                "availability": 'null',
                "unit": "200 mg",
                "package": "pack"
            }
        ];

        products.forEach(async element => {
            const newProduct = await prisma.product.create({
                data: {
                    product_name: element.product_name,
                    product_image: element.product_image,
                    availability: element.availability,
                    product_description: element.product_description,
                    is_deleted: false,
                    unit: element.unit,
                    package: element.package,
                    catch_phrase: element.package,
                    price: element.price
                },
            })
        });

        return res.json({ status: 200, message: 'Product inserted successfully' })

    } catch (error) {
        console.log('Create product list controller error: ', error);
        return res.json({ status: 200, message: error })

    }
}
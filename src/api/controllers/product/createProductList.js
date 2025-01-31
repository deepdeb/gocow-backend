const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
exports.createProductListController = async (req, res) => {
    try {
        let products = [
            {
                "product_id": 1,
                "product_name": "Farm Fresh Milk",
                "catch_phrase": "Freshness in every sip",
                "product_image": "assets/images/milk_carton.png",
                "product_description": "Pure and fresh milk sourced directly from the farm for your daily nutrition.",
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
                "product_description": "Fresh, creamy milk packed in a convenient 500 ml packet for your everyday needs.",
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
                "product_description": "Compact and fresh milk in a 300 ml packet, perfect for small servings.",
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
                "product_description": "Rich, aromatic pure ghee made from the best farm-fresh cream for a wholesome cooking experience.",
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
                "product_description": "A smaller, 250 mg pack of our premium quality pure ghee, ideal for your everyday cooking.",
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
                "product_description": "Soft, fresh paneer made from high-quality milk, perfect for cooking or snacking.",
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
                "product_description": "A 200 mg pack of our fresh, soft paneer that adds a delicious touch to any meal.",
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
                    catch_phrase: element.catch_phrase,
                    price: element.price,
                    created_by: "test@gmail.com"
                },
            })
        });

        return res.json({ status: 200, message: 'Product inserted successfully' })

    } catch (error) {
        console.log('Create product list controller error: ', error);
        return res.json({ status: 200, message: error })

    }
}
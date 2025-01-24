const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.setCartController = async (req, res) => {
    try {
        console.log("data>>>", req.body);
        let cart_insert = await prisma.cart.upsert({
            where: {
                userUid: req.user.user_id
            },
            update:  {
                product_list: req.body.cart
            },
            create: {
                userUid: req.user.user_id,
                product_list: req.body.cart
            }
        })

        return res.json({ success: true, status: 200, message: 'Cart added successfully' })

    } catch (error) {
        console.log('Set cart controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

exports.getCartController = async (req, res) => {
    try {
        let cart_get = await prisma.cart.findUnique({
            where: {
                userUid: req.user.user_id
            }
        })

        console.log(cart_get);
        
        cart_get.product_list.forEach(async element => {
            var product_id = element.product_id
            console.log(product_id);
            console.log(element.product_id);
            
            try {
                let product = await prisma.product.findUnique({
                    where: {
                        product_id: product_id
                    }
                })
                console.log('>>> product', product);
            } catch (error) {
                
            }
        });

        console.log('>>>', cart_get)
        res.sendStatus(200)
    } catch (error) {
        console.log('Set cart controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}
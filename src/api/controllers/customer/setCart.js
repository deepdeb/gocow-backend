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
        let cart = [];
        try {
            cart = await Promise.all(
                cart_get.product_list.map(async (element) => {
                    let product = await prisma.product.findUnique({
                        where: {
                            product_id: element.product_id,
                        },
                    });
                    if (product) {
                        product.count = element.count;
                        return product;
                    }
                    return null;
                })
            );
            cart = cart.filter((item) => item !== null);
        } catch (error) {
            console.log("Prisma error: ", error);
        }
        
        console.log(cart);
        return res.json({ success: true, status: 200, message: cart });
        

    } catch (error) {
        console.log('Set cart controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}
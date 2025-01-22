const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.setCartController = async (req, res) => {
    try {
        let cart_insert = await prisma.cart.create({
            data:  {
                userUid: req.user.user_id,
                product_list: req.user.product_list
            }
        })

        return res.json({ success: true, status: 200, message: 'Cart added successfully' })

    } catch (error) {
        console.log('Set cart controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.adminCreateOffer = async (req, res) => {
    try {
        
        console.log('req body>>>>', req.body)

        let admin_create_offer = await prisma.offer.create({
            data: {
                admin_id: req.body.admin_id,
                type: req.body.type,
                category: req.body.category,
                discount_type: req.body.discount_type,
                discount_value: req.body.discount_value,
                buy_quantity: req.body.category === "BUY_N_GET_X"? req.body.buy_quantity : undefined,
                get_quantity: req.body.category === "BUY_N_GET_X"? req.body.get_quantity : undefined,
                from_date: req.body.from_date,
                to_date: req.body.to_date,
                offer_products: req.body.type === "PRODUCT" && req.body.product_ids.length > 0 ? {
                    create: req.body.product_ids.map(product_id => ({ product: { connect: { product_id } } }))
                  } : undefined,
                
            }
        })
        return res.json({ success: true, status: 200})
    } catch (error) {
        console.log('Admin create offer controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}
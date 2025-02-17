const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.adminCreateOffer = async (req, res) => {
    try {

        // console.log('req body>>>>', req.body)

        let admin_create_offer = await prisma.offer.create({
            data: {
                admin_id: req.admin.id,
                offer_label: req.body.label,
                type: req.body.offerType,
                category: req.body.offerCategory,
                discount_type: req.body.offerDisc,
                discount_value: req.body.discount_value,
                buy_quantity: req.body.offerCategory === "BUY_N_GET_X" ? req.body.buy_quantity : undefined,
                get_quantity: req.body.offerCategory === "BUY_N_GET_X" ? req.body.get_quantity : undefined,
                from_date: req.body.startDate,
                to_date: req.body.endDate,
                offer_products: req.body.type === "PRODUCT" && req.body.product_ids.length > 0 ? {
                    create: req.body.product_ids.map(product_id => ({ product: { connect: { product_id } } }))
                } : undefined,

            }
        })
        return res.json({ success: true, status: 200 })
    } catch (error) {
        console.log('Admin create offer controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

exports.adminGetOffer = async (req, res) => {
    try {
        let offer_list = await prisma.offer.findMany({
            include : {
                offer_products: {
                    include: {
                        product: true
                    }
                },
                admin: true
            }
        })

        return res.json({ success: true, status: 200, offer_list: offer_list })
    } catch (error) {
        console.log('Admin get offer controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}
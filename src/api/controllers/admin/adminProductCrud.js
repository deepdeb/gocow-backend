const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.adminCreateProductController = async (req, res) => {
    try {
        let admin_create_product = await prisma.product.create({
            data: {
                product_name: req.body.product_name,
                product_image: null,
                product_description: req.body.product_description,
                unit: req.body.unit,
                package: req.body.package,
                catch_phrase: req.body.catch_phrase,
                price: req.body.price
            }
        })

        return res.json({ success: true, status: 200, message: "Product created successfully" })
    } catch (error) {
        console.log('Admin create product controller error: ', error);
        return res.json({ success: false, status: 400, message: error})
    }
}

exports.adminEditProductController = async (req, res) => {
    try {
        let admin_edit_product = await prisma.product.update({
            where: {
                product_id: req.body.product_id
            },
            data: {
                product_name: req.body.product_name,
                product_description: req.body.product_description,
                unit: req.body.unit,
                package: req.body.package,
                catch_phrase: req.body.catch_phrase,
                price: req.body.price
            }
        })
        return res.json({ success: true, status: 200, message: 'Product edited successfully' })
    } catch (error) {
        console.log('Admin edit product controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

exports.adminDeleteProductController = async (req, res) => {
    try {
        let admin_delete_product = await prisma.product.update({
            where: {
                product_id: req.body.product_id
            },
            data: {
                is_deleted: 1
            }
        })
        return res.json({ success: true, status: 200, message: 'Product deleted successfully' })
    } catch (error) {
        console.log('Admin delete product controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}
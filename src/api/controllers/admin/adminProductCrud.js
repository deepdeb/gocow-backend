const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const { dirname } = require('path');
const path = require('path')

exports.adminCreateProductController = async (req, res) => {
    try {

        let data = JSON.parse(req.body.data);

        let admin_create_product = await prisma.product.create({
            data: {
                product_name: data.product_name,
                product_image: req.filepath,
                product_description: data.product_description,
                unit: data.unit,
                package: data.package,
                catch_phrase: data.catch_phrase,
                availability: data.availability,
                price: data.price,
                updated_at: null,
                updated_by: null,
                created_by: req.admin.email
            }
        })
        return res.json({ success: true, status: 200, message: "Product created successfully", filePath: req.filepath })
    } catch (error) {
        console.log('Admin create product controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

exports.adminUpdateProductController = async (req, res) => {
    try {

        let data = JSON.parse(req.body.data);

        let previous_data = await prisma.product.findFirst({
            where: {
                product_id: data.product_id
            }
        })

        if (previous_data) {
            let admin_edit_product = await prisma.product.update({
                where: {
                    product_id: data.product_id
                },
                data: {
                    product_name: data.product_name,
                    product_image: req.filepath,
                    product_description: data.product_description,
                    unit: data.unit,
                    package: data.package,
                    catch_phrase: data.catch_phrase,
                    availability: data.availability,
                    price: data.price,
                    updated_by: req.admin.email,
                    updated_at: new Date().toISOString()
                }
            })

            if (req.filepath) {
                try {
                    const imagePath = path.join(__dirname, "../../../../admin_files/product_images/");
                    const imageName = previous_data.product_image
                    fs.unlinkSync(imagePath + imageName)
                } catch (error) {
                    console.log(error + 'filename>>>', + previous_data.product_image)
                }
                return res.json({ success: true, status: 200, message: 'Product edited successfully' })
            } else {
                return res.json({ success: true, status: 200, message: 'Product edited successfully' })
            }
        }

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
                is_deleted: true
            }
        })
        return res.json({ success: true, status: 200, message: 'Product deleted successfully' })
    } catch (error) {
        console.log('Admin delete product controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}
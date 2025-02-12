const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path')
const xlsx = require('xlsx')

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

exports.generateProductReport = async (req, res) => {
    try {
        let product_list = await prisma.product.findMany({})

        console.log('product list>>>>', product_list)

        if (product_list) {
            console.log('enter if product list')
            const excelFilePath = path.join(__dirname, '../../../../admin_files/reports/', 'producttable.xlsx')
            await exportToExcel(product_list, excelFilePath)
            return res.json({ success: true, status: 200 })
        }
    } catch (error) {
        console.log('Generate product report controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

async function exportToExcel(data, excelFilePath) {
    const workbook = xlsx.utils.book_new();
    // const today = new Date().toLocaleDateString('en-GB');
    // const [startYear, startMonth, startDay] = start_date.split('-');
    // const formattedStartDate = `${startDay}/${startMonth}/${startYear}`;

    // const [endYear, endMonth, endDay] = end_date.split('-');
    // const formattedEndDate = `${endDay}/${endMonth}/${endYear}`;

    const firstHeader = ['GoCow'];
    const secondHeader = ['List of Products for the period:'];
    // const thirdHeader = ['From Date:', formattedStartDate, '', 'To Date:', formattedEndDate];
    const headers = ['Sl No.', 'Product ID', 'Product Name', 'Product Description', 'Unit', 'Package', 'Catch Phrase', 'Price'];
    const worksheet = [firstHeader, secondHeader, [], [], headers, ...data.map((row, index) => [
        index + 1,
        row.product_id,
        row.product_name,
        row.product_description,
        row.unit,
        row.package,
        row.catch_phrase,
        row.price.toString()
    ])];
    const ws = xlsx.utils.aoa_to_sheet(worksheet);
    xlsx.utils.book_append_sheet(workbook, ws, 'Data');
    xlsx.writeFile(workbook, excelFilePath);
}
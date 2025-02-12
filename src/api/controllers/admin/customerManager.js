const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path')
const xlsx = require('xlsx')

exports.adminReadCustomer = async (req, res) => {
    try{
        let customer_list = await prisma.customer.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return res.json({ success: true, status: 200 ,customerList:customer_list })
    }catch(error){
        console.log('Customer table read error ', error);
        return res.json({ success: false, status: 400, message: error})
    }
}

exports.generateCustomerReport = async (req, res) => {
    try {
        let customer_list = await prisma.customer.findMany({})

        console.log('customer list>>>>', customer_list)

        if(customer_list) {
            console.log('enter if customer list')
            const excelFilePath = path.join(__dirname, '../../../../admin_files/reports/', 'customer_table.xlsx')
            await exportToExcel(customer_list, excelFilePath)
            return res.json({ success: true, status: 200 })
        }
        return res.json({ success: true, status: 200 })
    } catch (error) {
        console.log('Generate customer report controller error: ', error);
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
    const secondHeader = ['List of Customer for the period:'];
    // const thirdHeader = ['From Date:', formattedStartDate, '', 'To Date:', formattedEndDate];
    const headers = ['Sl No.', 'Customer Name', 'Customer Type', 'Phone Number', 'Wallet Balance', 'Joined on'];
    const worksheet = [firstHeader, secondHeader, [], [], headers, ...data.map((row, index) => [
        index + 1,
        row.customer_name,
        row.customer_type,
        row.phone_num,
        row.wallet_balance.toString(),
        row.createdAt
    ])];
    const ws = xlsx.utils.aoa_to_sheet(worksheet);
    xlsx.utils.book_append_sheet(workbook, ws, 'Data');
    xlsx.writeFile(workbook, excelFilePath);
}
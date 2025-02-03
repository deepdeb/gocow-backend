const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.adminReadCustomer = async (req, res) => {
    try{
        let customer_list = await prisma.customer.findMany({})
        return res.json({ success: true, status: 200 ,customerList:customer_list })
    }catch(error){
        console.log('Customer table read error ', error);
        return res.json({ success: false, status: 400, message: error})
    }
}
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.customerLoginController = async (req, res) => {
    try {
        let customer_check = await prisma.customer.findUnique({
            where: {
                userUid: req.user.user_id
            }
        })

        if(customer_check == null) {
            let new_customer_insert = await prisma.customer.create({
                data: {
                    userUid: req.user.user_id,
                    phone_num: req.user.phone_number.toString(),
                    customer_name: null,
                    customer_type: null,
                    wallet_balance: 0.00
                }
            })

            let new_customer_address = await prisma.address.findMany({
                where: {
                    // userUid: new_customer_insert.userUid
                    userUid: req.user.user_id
                }
            })
            return res.json({ success: true, status: 200, user: new_customer_insert, address: new_customer_address })
        } else {
            let customer_address = await prisma.address.findMany({
                where: {
                    userUid: customer_check.userUid
                }
            })

            console.log('customer already exists>>', customer_check)
            return res.json({ success: true, status: 200, user: customer_check, address: customer_address })
        }
    } catch (error) {
        console.log('Customer login controller error: ', error);
        return res.json({ success: false, status: 400, message: error, user: [], address: []})
    }
}
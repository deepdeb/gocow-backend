const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.customerLoginController = async (req, res) => {
    try {
        const customerLoginData = Joi.object({
            phone_num : Joi.number().required().messages({'number.base': 'Please send valid phone number'})
        })
        const {error, value} = customerLoginData.validate(req.body);
        if(error) {
            console.log(`Invalid customer login data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid customer login data`);
        console.log('phone num', value.phone_num)

        let customer_check = await prisma.customer.findUnique({
            where: {
                phone_num: value.phone_num.toString()
            }
        })

        if(customer_check == null) {
        const newUUID = uuidv4();
            console.log('uuid>>>', newUUID)
            let new_customer_insert = await prisma.customer.create({
                data: {
                    userUid: newUUID,
                    phone_num: value.phone_num.toString(),
                    customer_name: null,
                    customer_type: null,
                    wallet_balance: 0.00
                }
            })

            let new_customer_address = await prisma.address.findMany({
                where: {
                    userUid: new_customer_insert.userUid
                }
            })
            console.log('new customer insert resp>>>', new_customer_insert)
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
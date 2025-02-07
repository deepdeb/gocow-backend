const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authHelpers = require('../../utils/authHelpers');
const { customerGetOrderList } = require('../common/salesOrder');

exports.deliveryPersonLoginController = async (req, res) => {
    try {
        console.log('>>>>',req.body)
        let delivery_check = await prisma.delivery_person_details.findUnique({
            where: {
                phone_num: req.body.phone_number.toString()
            }
        })
        console.log(delivery_check);
        if(delivery_check != null){

            const access_token = await authHelpers.generateDeliveryAccessToken(delivery_check)

            if(delivery_check.password === req.body.password) {
                return res.json({ success: true, status: 200, message: "Login successful", response: {"id": delivery_check.delivery_person_id, "first_name": delivery_check.first_name, "last_name": delivery_check.last_name, "access_token": access_token }})
            } else {
                return res.json({ success: false, status: 420, message: "Incorrect credential"})
            }
        } else {
            return res.json({ success: false, status: 420, message: "Incorrect credential"})
        }
    } catch (error) {
        console.log('Admin login controller error: ', error);
        return res.json({ success: false, status: 400, message: error})
    }
}


exports.deliveryPersonList = async (req, res) => {
    try{
        let delivery_person_list = await prisma.delivery_person_details.findMany({})
        return res.json({ success: true, status:200, list:delivery_person_list})
    }catch(error){
        console.log('delivery person list controller error: ', error);
        return res.json({ success: false, status: 400, message: error})
    }
}

exports.getDeliverablelistByid = async (req, res) => {
    try{
        let deli_list = await prisma.orders.findMany({
            where:{
                delivery_person_id:req.deliveryMan.id
            },
            omit:{
                id:true,
                userUid:true,
            },
            include:{
                customer:{
                    select:{
                        customer_name:true
                    }
                }
            }
        })
        return res.json({ success: true, status:200, orderList:deli_list})
    }catch(error){
        console.log('delivery person list controller error: ', error);
        return res.json({ success: false, status: 400, message: error})
    }
}
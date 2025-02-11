const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authHelpers = require('../../utils/authHelpers');
const { customerGetOrderList } = require('../common/salesOrder');

exports.deliveryPersonLoginController = async (req, res) => {
    try {
        console.log('>>>>', req.body)
        let delivery_check = await prisma.delivery_person_details.findUnique({
            where: {
                phone_num: req.body.phone_number.toString()
            }
        })
        console.log(delivery_check);
        if (delivery_check != null) {

            const access_token = await authHelpers.generateDeliveryAccessToken(delivery_check)

            if (delivery_check.password === req.body.password) {
                return res.json({ success: true, status: 200, message: "Login successful", response: { "id": delivery_check.delivery_person_id, "first_name": delivery_check.first_name, "last_name": delivery_check.last_name, "access_token": access_token } })
            } else {
                return res.json({ success: false, status: 420, message: "Incorrect credential" })
            }
        } else {
            return res.json({ success: false, status: 420, message: "Incorrect credential" })
        }
    } catch (error) {
        console.log('Admin login controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}


exports.deliveryPersonList = async (req, res) => {
    try {
        let delivery_person_list = await prisma.delivery_person_details.findMany({})
        return res.json({ success: true, status: 200, list: delivery_person_list })
    } catch (error) {
        console.log('delivery person list controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

exports.getDeliverablelistByid = async (req, res) => {
    try {
        let deli_list = await prisma.orders.findMany({
            where: {
                delivery_agent_id: req.deliveryMan.id,
                OR: [
                    {
                        status: 'pending'
                    },
                    {
                        status: 'confirmed'
                    }
                ]
            },
            omit: {
                id: true,
                userUid: true,
            },
            include: {
                customer: {
                    select: {
                        customer_name: true
                    }
                }
            }
        })
        return res.json({ success: true, status: 200, orderList: deli_list })
    } catch (error) {
        console.log('delivery person list controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

exports.assignDeliveryPerson = async (req, res) => {
    try {
        // console.log('req body>>>', req.body)
        let assign_deli = await prisma.orders.update({
            where: {
                order_id: req.body.order_id
            },
            data: {
                delivery_agent_id: req.body.delivery_person_id,
                status: 'confirmed'
            }
        })
        return res.json({ success: true, status: 200, message: 'Delivery assigned successfully' })
    } catch (error) {
        console.log('assign delivery person controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

const path = require('path')

exports.getDoorImageForDelivery = async (req, res) => {
    try {
        let customer = await prisma.orders.findUnique({
            where: {
                order_id: req.body.order_id
            }, select: {
                userUid: true
            }
        })
        console.log(customer)
        const imageName = customer.userUid + "_door" + '.' + 'jpg'
        console.log(imageName)
        const imagePath = path.join(__dirname, "../../../../customer_uploaded_files/customer_door/", imageName);

        res.sendFile(imagePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(404).json({ error: 'Image not found' });
            } else (
                console.log("sent image")
            )
        });

    } catch (error) {
        return res.json({ success: false, status: 400, message: error })
    }

}

exports.addDeliveryPerson = async (req, res) => {
    try {

        console.log('req', req.files)
        var aadhar
        var photo
        var vehicleImage
        var pan
        var driving_license
        req.files.forEach(element => {
            let namewithoutextention = element.originalname.match(/^([^.]+)/)[1];
            if (namewithoutextention == 'adhar-pic') {
                aadhar = element.filename;
            } else if (namewithoutextention == 'profile-pic') {
                photo = element.filename;
            } else if (namewithoutextention == 'vehicle-pic') {
                vehicleImage = element.filename;
            } else if (namewithoutextention == 'pan-pic') {
                pan = element.filename;
            } else if (namewithoutextention == 'driving-pic') {
                driving_license = element.filename;
            }
        });


        var data = JSON.parse(req.body.data)

        console.log('data', data)

        let addDeliveryPerson = await prisma.delivery_person_details.create({
            data: {
                first_name: data.first_name,
                last_name: data.last_name,
                phone_num: data.phone_num,
                password: data.password,
                details: data.details,
                vehicle_number: data.vehicle_number,
                aadhar: aadhar,
                driving_license: driving_license,
                pan: pan,
                vehicle_image: vehicleImage,
                photo: photo
            }
        })

        return res.json({ success: true, status: 200, message: 'Delivery person added successfully' })

    } catch (error) {
        console.log('add delivery person controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}
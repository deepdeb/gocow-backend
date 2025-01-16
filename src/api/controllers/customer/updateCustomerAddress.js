const Joi = require('joi');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.updateCustomerAddressController = async (req, res) => {
    try {
        const updateCustomerAddressData = Joi.object({
            userUid: Joi.string().required(),
            customer_name: Joi.string().required(),
            flat_house_apartment: Joi.string().required(),
            locality_area_landmark: Joi.string().required(),
            coordinate: Joi.string().required(),
            address_type: Joi.string().required()
        })
        const { error, value } = updateCustomerAddressData.validate(req.body);
        if (error) {
            console.log(`Invalid update customer address data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid update customer address data`);

        const address_add = await prisma.address.create({
            data: {
                userUid: value.userUid,
                flat_house_apartment: value.flat_house_apartment,
                locality_area_landmark: value.locality_area_landmark,
                coordinate: value.coordinate,
                address_type: value.address_type
            }
        })

        const name_update = await prisma.customer.update({
            data: {
                customer_name: value.customer_name
            },
            where: {
                userUid: value.userUid
            }
        })

        return res.json({ success: true, status: 200, message: 'Address inserted successfully' })
    } catch (error) {
        console.log('Update customer address controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}
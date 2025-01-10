const Joi = require('joi');
const updateCustomerAddressService = require('../../services/updateCustomerAddressService');
exports.updateCustomerAddressController = async (req, res) => {
    try {
        const updateCustomerAddressData = Joi.object({
            customer_id: Joi.number().required(),
            flat_house_apartment: Joi.string().required(),
            locality_area_landmark: Joi.string().required(),
            customer_name: Joi.string().required()
        })
        const { error, value } = updateCustomerAddressData.validate(req.body);
        if (error) {
            console.log(`Invalid update customer address data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid update customer address data`);
        const resp = await updateCustomerAddressService.updateCustomerAddress(value);
        if (resp) {
            return res.json({ success: true, status: 200 })
        }
        else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('Update customer address controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: [] })
    }
}
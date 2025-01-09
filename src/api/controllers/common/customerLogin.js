const Joi = require('joi');
const customerLoginService = require('../../services/customerLoginService');
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
        const resp = await customerLoginService.customerLogin(value);
        if (resp) {
            return res.json({ status: 200 })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('Customer login controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}
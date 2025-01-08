const Joi = require('joi');
const customerOtpVerifyService = require('../../services/customerOtpVerifyService');
exports.customerOtpVerifyController = async (req, res) => {
    try {
        const customerOtpVerifyData = Joi.object({
            customer_id: Joi.number().required().messages({'number.base': 'Please send valid customer_id'}),
            otp : Joi.string().length(6).pattern(/^[0-9]+$/).required().messages({'string.pattern.base': 'Please send valid otp'})
        })
        const {error, value} = customerOtpVerifyData.validate(req.body);
        if(error) {
            console.log(`Invalid customer otp verify data: ${error.details[0].message}`);
            return res.status(400).json({ success: false, message: error.details[0].message.replace(/["':]/g, '') });
        }
        console.log(`Valid customer otp verify data`);
        const resp = await customerOtpVerifyService.customerOtpVerify(value);
        if (resp == true) {
            return res.json({ success: resp, status: 200 })
        } else if(resp == false){
            return res.json({ success: false, status: 200})
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('Customer otp verify controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}
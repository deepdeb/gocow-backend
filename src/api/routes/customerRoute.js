const router = require('express').Router();
const { customerOtpVerifyController } = require('../controllers/customer/customerOtpVerify');
module.exports = router;
router.post('/customerOtpVerify', customerOtpVerifyController )
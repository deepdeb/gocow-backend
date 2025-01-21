const auth  = require('../../api/middleware/authMiddleware')
const ensureAuthenticated = auth.ensureAuthenticated
const router = require('express').Router();
const { customerOtpVerifyController } = require('../controllers/customer/customerOtpVerify');
const { updateCustomerAddressController } = require('../controllers/customer/updateCustomerAddress');
module.exports = router;
router.post('/customerOtpVerify', customerOtpVerifyController )
router.post('/updateCustomerAddress', ensureAuthenticated, updateCustomerAddressController)
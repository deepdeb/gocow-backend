const router = require('express').Router();
const { customerLoginController } = require('../controllers/common/customerLogin');
const { getProductListController } = require('../controllers/common/getProductList');
module.exports = router;
router.get('/getProductList', getProductListController)
router.post('/customerLogin', customerLoginController)
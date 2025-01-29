const router = require('express').Router();
const { getProductListController } = require('../controllers/common/getProductList');
const { createOrder, adminGetOrderList, customerGetOrderList } = require('../controllers/common/salesOrder');
module.exports = router;
router.get('/getProductList', getProductListController)
router.post('/createOrder', createOrder)
router.get('/getAdminOrderList', adminGetOrderList)
router.get('/getCustomerOrderList', customerGetOrderList)
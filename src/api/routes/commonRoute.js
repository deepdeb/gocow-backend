const auth  = require('../../api/middleware/authMiddlewareCustomer')
const ensureAuthenticated = auth.ensureAuthenticated
const router = require('express').Router();
const { getProductListController } = require('../controllers/common/getProductList');
const { createOrder, adminGetOrderList, customerGetOrderList } = require('../controllers/common/salesOrder');
module.exports = router;
router.get('/getProductList', getProductListController)
router.post('/createOrder', ensureAuthenticated, createOrder)
router.get('/getAdminOrderList', adminGetOrderList)
router.get('/getCustomerOrderList', ensureAuthenticated, customerGetOrderList)
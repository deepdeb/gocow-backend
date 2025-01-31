const auth  = require('../../api/middleware/authMiddlewareCustomer')
const ensureAuthenticated = auth.ensureAuthenticated
const router = require('express').Router();
const { getProductListAdminController, getProductListCustomerController } = require('../controllers/common/getProductList');
const { createOrder, adminGetOrderList, customerGetOrderList } = require('../controllers/common/salesOrder');
module.exports = router;
router.get('/getProductListAdmin', getProductListAdminController)
router.post('/createOrder', ensureAuthenticated, createOrder)
router.get('/getAdminOrderList', adminGetOrderList)
router.get('/getCustomerOrderList', ensureAuthenticated, customerGetOrderList)
router.get('/getProductListCustomer', getProductListCustomerController)
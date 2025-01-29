const auth  = require('../../api/middleware/authMiddlewareCustomer')
const ensureAuthenticated = auth.ensureAuthenticated
const router = require('express').Router();
const { adminLoginController } = require('../controllers/admin/adminLogin');
const { adminCreateProductController, adminUpdateProductController, adminDeleteProductController } = require('../controllers/admin/adminProductCrud')
const authenticateToken = require('../middleware/authenticateTokenAdmin')
module.exports = router;
router.post('/adminLogin', adminLoginController)
router.post('/adminCreateProduct', authenticateToken, adminCreateProductController)
router.post('/adminUpdateProduct', authenticateToken, adminUpdateProductController)
router.post('/adminDeleteProduct', authenticateToken, adminDeleteProductController)
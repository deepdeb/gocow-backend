const auth  = require('../../api/middleware/authMiddleware')
const ensureAuthenticated = auth.ensureAuthenticated
const router = require('express').Router();
const { adminLoginController } = require('../controllers/admin/adminLogin');
const { adminCreateProductController, adminEditProductController } = require('../controllers/admin/adminProductCrud')
const authenticateToken = require('../middleware/authenticateTokenUser')
module.exports = router;
router.post('/adminLogin', adminLoginController)
router.post('/adminCreateProduct', authenticateToken, adminCreateProductController)
router.post('/adminEditProduct', authenticateToken, adminEditProductController)
const auth  = require('../../api/middleware/authMiddlewareCustomer')
const router = require('express').Router();
const { adminLoginController } = require('../controllers/admin/adminLogin');
const { adminCreateProductController, adminUpdateProductController, adminDeleteProductController } = require('../controllers/admin/adminProductCrud');
const {deliveryPersonList } = require('../controllers/admin/deliveryPersonController');
const { adminReadCustomer } = require('../controllers/admin/customerManager');
const authenticateToken = require('../middleware/authenticateTokenAdmin')
const multer = require('multer');
const path = require('path')
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 10 })
uid.setDictionary('alpha_upper');
const product_image_storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "../../../admin_files/product_images");
      cb(null, uploadPath); 
    },
    filename: (req, file, cb) => {
      // Generate a new file name
      const uniqueSuffix = uid.rnd();
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix +"_productImage"+ '.' + 'jpg');
      req.filepath = "http://localhost:3000/"+uniqueSuffix +"_productImage"+ '.' + 'jpg'
    },
  });
const product_image_upload = multer({ storage: product_image_storage })
module.exports = router;
router.post('/adminLogin', adminLoginController)
router.post('/adminCreateProduct', authenticateToken, product_image_upload.single("image"), adminCreateProductController)
router.post('/adminUpdateProduct', authenticateToken, adminUpdateProductController)
router.post('/adminDeleteProduct', authenticateToken, adminDeleteProductController)
router.get('/getCustomerList',authenticateToken,adminReadCustomer)
router.get('/getDeliveryPersonList',authenticateToken,deliveryPersonList)


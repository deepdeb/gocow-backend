const auth  = require('../../api/middleware/authMiddlewareCustomer')
const router = require('express').Router();
const { adminLoginController } = require('../controllers/admin/adminLogin');
const { adminCreateProductController, adminUpdateProductController, adminDeleteProductController } = require('../controllers/admin/adminProductCrud');
const {deliveryPersonList, assignDeliveryPerson, addDeliveryPerson, updateDeliveryPerson,toggleDeliveryPersonStatus } = require('../controllers/admin/deliveryPersonController');
const { adminReadCustomer } = require('../controllers/admin/customerManager');
const { adminAddActiveArea, getActiveArea, toggleActiveArea } = require('../controllers/admin/areaManager');
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
      req.filepath = uniqueSuffix +"_productImage"+ '.' + 'jpg'
    },
  });

const delivery_image_storage = multer.diskStorage({

  destination: (req, file, cb) => { 
    const uploadPath = path.join(__dirname, "../../../admin_files/delivery_images");
    cb(null, uploadPath); 

  },
  filename: (req, file, cb) => {
    // Generate a new file name
    const uniqueSuffix = uid.rnd();
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix +"_deliveryImage"+ '.' + 'jpg');
  },
})

const product_image_upload = multer({ storage: product_image_storage })
const delivery_image_upload = multer({ storage: delivery_image_storage })

module.exports = router;
router.post('/adminLogin', adminLoginController)
router.post('/adminCreateProduct', authenticateToken, product_image_upload.single("image"), adminCreateProductController)
router.post('/adminUpdateProduct', authenticateToken, product_image_upload.single("image"), adminUpdateProductController)
router.post('/adminDeleteProduct', authenticateToken, adminDeleteProductController)
router.get('/getCustomerList',authenticateToken,adminReadCustomer)
router.get('/getDeliveryPersonList',authenticateToken,deliveryPersonList)
router.post('/assignDeliveryPerson', authenticateToken, assignDeliveryPerson)
router.post('/addDeliveryPerson', authenticateToken, delivery_image_upload.array("image", 5), addDeliveryPerson)
router.post('/updateDeliveryPerson', authenticateToken, delivery_image_upload.array("image", 5), updateDeliveryPerson)
router.post('/addActiveArea', authenticateToken, adminAddActiveArea)
router.get('/getActiveAreaList', authenticateToken, getActiveArea)
router.post('/toggleActiveArea', authenticateToken, toggleActiveArea)
router.post('/toggleDeliveryPersonActiveStatus', authenticateToken, toggleDeliveryPersonStatus)




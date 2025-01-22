const auth  = require('../../api/middleware/authMiddleware')
const ensureAuthenticated = auth.ensureAuthenticated
const router = require('express').Router();
const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "../../../public/customer_door");
      cb(null, uploadPath); 
    },
    filename: (req, file, cb) => {
      // Generate a new file name
      const uniqueSuffix = req.user.user_id;
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix +"_door"+ '.' + 'jpg');
    },
  });
const upload = multer({ storage: storage })

const { customerLoginController } = require('../controllers/customer/customerLogin');
const { updateCustomerAddressController } = require('../controllers/customer/updateCustomerAddress');
const { uploadDoorImageController } = require('../controllers/customer/uploadDoorImage');
const { getDoorImageController } = require('../controllers/customer/getDoorImage');
const { deleteDoorImageController } = require('../controllers/customer/deleteDoorImage');

const { setCartController } = require('../controllers/customer/setCart');
module.exports = router;

router.get('/customerLogin', ensureAuthenticated, customerLoginController)
router.post('/updateCustomerAddress', ensureAuthenticated, updateCustomerAddressController)

router.post('/uploadDoorImage', ensureAuthenticated,upload.single('image'), uploadDoorImageController)
router.get('/getDoorImage', ensureAuthenticated,getDoorImageController)
router.post('/setCart', ensureAuthenticated, setCartController)
router.get('/deleteDoorImage', ensureAuthenticated,deleteDoorImageController)


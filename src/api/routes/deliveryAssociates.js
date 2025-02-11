const router = require('express').Router();
const authenticateDeliveryToken = require('./../middleware/authenticateTokenDelivery')
const { deliveryPersonLoginController,getDeliverablelistByid,getDoorImageForDelivery} = require('./../controllers/admin/deliveryPersonController')






router.post('/deliveryPersonLogin', deliveryPersonLoginController)
router.get('/getDeliverableListByid',authenticateDeliveryToken,getDeliverablelistByid)
router.post('/getDoorImage',authenticateDeliveryToken,getDoorImageForDelivery)
module.exports = router;
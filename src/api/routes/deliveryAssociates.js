const router = require('express').Router();
const authenticateDeliveryToken = require('./../middleware/authenticateTokenDelivery')
const { deliveryPersonLoginController,getDeliverablelistByid  } = require('./../controllers/admin/deliveryPersonController')






router.post('/deliveryPersonLogin', deliveryPersonLoginController)
router.get('/getDeliverableListByid',authenticateDeliveryToken,getDeliverablelistByid)
module.exports = router;
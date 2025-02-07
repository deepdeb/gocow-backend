const router = require('express').Router();
const commonRoute = require('./commonRoute');
const customerRoute = require('./customerRoute');
const productRoute = require('./productRoute');
const adminRoute = require('./adminRoute')
const deliveryAssociateRoute = require('./deliveryAssociates')

router.use('/common', commonRoute);
router.use('/customer', customerRoute);
router.use('/product', productRoute);
router.use('/admin', adminRoute)
router.use('/deliveryAsc', deliveryAssociateRoute)



module.exports = router;

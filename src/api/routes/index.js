const router = require('express').Router();
const commonRoute = require('./commonRoute');
const customerRoute = require('./customerRoute');
const productRoute = require('./productRoute');
module.exports = router;

router.use('/common', commonRoute);
router.use('/customer', customerRoute);
router.use('/product', productRoute);
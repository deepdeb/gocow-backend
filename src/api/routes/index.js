const router = require('express').Router();
const commonRoute = require('./commonRoute');
const customerRoute = require('./customerRoute');
module.exports = router;
router.use('/common', commonRoute);
router.use('/customer', customerRoute);
const router = require('express').Router();
const { createProductListController } = require('../controllers/product/createProductList')
module.exports = router;
router.get('/createProductList', createProductListController)
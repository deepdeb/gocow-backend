const express = require('express');
const cors = require('cors');
const router = require('../api/routes');
const path = require('path');
const root = path.join(__dirname, '../../public');
const product_images=path.join(__dirname,'../../admin_files/product_images')
const delivery_images=path.join(__dirname,'./../../admin_files/delivery_images')
const app = express();

//parse incoming data in the request body
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }))

//serve static files
app.use(express.static(root));
app.use(express.static(product_images))
app.use(express.static(delivery_images))


app.use(cors());

//mount api routes
app.use('', router);

module.exports = app;
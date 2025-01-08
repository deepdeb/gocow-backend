const express = require('express');
const cors = require('cors');
const router = require('../api/routes');
const path = require('path');
const root = path.join(__dirname, '../../public');

const app = express();

//parse incoming data in the request body
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }))

//serve static files
app.use(express.static(root));

app.use(cors());

//mount api routes
app.use('', router);

module.exports = app;
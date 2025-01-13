require('dotenv').config();
const app = require('./config/express');
const logger = require('./config/logger')
const { port, env } = require('./config/vars');
const { PrismaClient } = require('@prisma/client');

// app.listen(port, 192.168.1.6, () => console.log(`server listening on port ${port} || 3000(${env})`));

app.listen(port, () => console.log(`server listening on port ${port} || 3000(${env})`));
logger.info(`Server listening on port ${port} || 3000 (${env})`);

app.get('/test', (req, res) => {
    console.log('test api called');
    res.send('test api called');
})

module.exports = app;
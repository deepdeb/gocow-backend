require('dotenv').config();
const auth  = require('./api/middleware/authMiddlewareCustomer');

const ensureAuthenticated = auth.ensureAuthenticated;
const app = require('./config/express');
const { port, env } = require('./config/vars');
const socketRunner = require('../src/api/middleware/socketRunner');

const http = require('http').createServer(app); // Creating an HTTP server with Express

const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:4200']
    }
});

socketRunner.execute(io);

// Using the same port for both Express and WebSocket
http.listen(port, () => console.log(`Server listening on port ${port} (${env})`));

app.set('socketIo', io);


app.get('/test', async function (req, res) {
    console.log('Test API called');
    res.send('Test API called');
});

module.exports = app;

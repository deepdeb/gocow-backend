require('dotenv').config();
const auth  = require('./api/middleware/authMiddlewareCustomer')

const ensureAuthenticated = auth.ensureAuthenticated
const app = require('./config/express');
const { port, env } = require('./config/vars');
const socketRunner = require('../src/api/middleware/socketRunner')

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
      origins: ['http://localhost:4200']
    }
  });
// app.listen(port, 192.168.1.6, () => console.log(`server listening on port ${port} || 3000(${env})`));
socketRunner.execute(io)
http.listen(5000, () => console.log(`Listening on port ${3000}`));
app.listen(port, () => console.log(`server listening on port ${port} || 3000(${env})`));
app.set('socketIo',io)
app.get('/test',async function (req, res)  {
    console.log('test api called');
    res.send('test api called');
})

module.exports = app;
require('dotenv').config();
const auth  = require('./api/middleware/authMiddlewareCustomer')

const ensureAuthenticated = auth.ensureAuthenticated
const app = require('./config/express');
const { port, env } = require('./config/vars');
const socketRunner = require('../src/api/middleware/socketRunner')

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Adjust based on frontend domain
    methods: ["GET", "POST"]
  }
});


socketRunner.execute(io)

server.listen(port, () => console.log(`Server running on port ${port}`));

app.set('socketIo',io)
app.get('/test',async function (req, res)  {
    console.log('test api called');
    res.send('test api called');
})

module.exports = app;
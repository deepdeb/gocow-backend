require('dotenv').config();
const auth  = require('./api/middleware/authMiddleware')

const ensureAuthenticated = auth.ensureAuthenticated
const app = require('./config/express');
const { port, env } = require('./config/vars');

// app.listen(port, 192.168.1.6, () => console.log(`server listening on port ${port} || 3000(${env})`));

app.listen(port, () => console.log(`server listening on port ${port} || 3000(${env})`));

app.get('/test',async function (req, res)  {
    console.log('test api called');
    console.log(req.user)
    res.send('test api called');
})

module.exports = app;
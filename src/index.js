require('dotenv').config();
const app = require('./config/express');
const { port, env } = require('./config/vars');

// app.listen(port, 192.168.1.6, () => console.log(`server listening on port ${port} || 3000(${env})`));

app.listen(3000, () => console.log(`server listening on port ${port} || 3000(${env})`));

app.get('/test', (req, res) => {
    console.log('test api called');
    res.send('test api called');
})


module.exports = app;
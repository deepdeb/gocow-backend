const mysql = require('mysql2');

//mysql config
const MYSQL_CONFIG = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    multipleStatements: true
}

//create a connection pool
const pool = mysql.createPool(MYSQL_CONFIG);
const readPool = pool.promise();
const writePool = pool.promise();

//export pools to use in other modules
module.exports = {
    readPool: readPool,
    writePool: writePool
}
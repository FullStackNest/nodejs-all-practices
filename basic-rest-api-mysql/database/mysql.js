// get the client
const mysql = require('mysql2');


// create the connection to database
const mySQLConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'nodejsdemo',
    password: '',
});


module.exports = {
    mySQLConnection
}
const { mySQLConnection } = require("../database/mysql");


const sqlQuery = 'SELECT * FROM users';
const test1 = mySQLConnection.query(sqlQuery, (err, results) => {
    if (err) {
        console.error('Error executing SQL query:', err);
        throw err;
    }

    // console.log('Query results:', results);

    // Do something with the results here

    // Close the connection when done
    mySQLConnection.end();
});

module.exports = {
    test1
}
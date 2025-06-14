const mysql = require("mysql2");


const DB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
})

const createStudentTable = `CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    age VARCHAR(5) NOT NULL

)`

const insertStudents = `INSERT INTO students (firstname, lastname, email, age) VALUES (?, ?,?, ?)`;

const getAllStudents = `SELECT * FROM students`;

module.exports = {
    DB,
    createStudentTable,
    insertStudents,
    getAllStudents
}
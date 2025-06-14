const express = require("express");
const cors = require('cors');
const path = require('path');

const { DB, createStudentTable, insertStudents } = require("./config/config");
const IndexController = require("./controllers/IndexController");
const ContactController = require("./controllers/ContactController");

const PORT = 5100;
const app = express();
app.use(express.json());
app.use(cors());

// Set the view engine and views directory
app.set('view engine', 'ejs'); // ejs is a template engine of nodejs / hbs, pug
app.set('views', path.join(__dirname, 'views'));



DB.connect(err => {
    if (err) {
        console.log(`Error connecting ${err}`);

    }
    console.log("Connected to DB");

})

app.post('/add-user', (req, res) => {
    const { firstname, lastname, email, age } = req.body;
    DB.query(insertStudents, [firstname, lastname, email, age], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err.message);
            // res.status(500).send('Error inserting data.');
            res.status(500).json({ error: 'Error inserting data.' });
        } else {
            console.log(`User added with ID: ${result.insertId}`);

            // res.status(201).send(`User added with ID: ${result.insertId}`);
            res.status(201).json({ message: 'User added successfully', id: result.insertId });
        }

        res.end();
    })
})

app.get('/students', (req, res) => {
    DB.query(createStudentTable, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err.message);
            res.status(500).send("Server failed for Table")
        } else {
            console.log("Table created");

            res.status(200);
        }
        res.end();
    })

})

app.get("/", IndexController.getIndexPage)

app.get("/contact-us", ContactController.getContactPage)


app.listen(PORT, () => {
    console.log("SERVER RUNNING");

})

// MVC: Model View Controller


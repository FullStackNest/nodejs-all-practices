// userRegistration.js

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Mock user database
let users = [];

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password });
    res.send('User registered successfully');
});

app.listen(port, () => {
    console.log(`User Registration microservice listening at http://localhost:${port}`);
});

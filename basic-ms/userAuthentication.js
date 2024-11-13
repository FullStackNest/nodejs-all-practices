// userAuthentication.js

const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

// Mock user database
let users = [];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.send('Login successful');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

app.listen(port, () => {
    console.log(`User Authentication microservice listening at http://localhost:${port}`);
});

const express = require('express')
const path = require('path');
const { HomeController } = require('./controllers/HomeController');

const PORT = 5000;


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('components', path.join(__dirname, 'components'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', HomeController)





app.listen(PORT, () => {
    console.log('Server Running');
})

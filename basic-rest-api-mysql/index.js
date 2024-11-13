const express = require('express')
const { Sequelize } = require('sequelize');
const path = require('path');


const { routeNames } = require('./utils/routeNames')
const { GetData, IndexPath, PostsPath } = require('./controllers/controllerOne')
const User = require('./models/user');
const sequelize = require('./database/connection');
const { test1 } = require('./sql/querries');
const viewController = require('./controllers/viewController');


const app = express()

// app.get(routeNames.home, IndexPath)


// Set the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define a route to render the index.ejs view
app.get('/', viewController.getIndexPage);
app.get('/about', viewController.getAboutPage);
app.get('/contact', viewController.getContactPage);
app.get('/contact/:id/:companyId', viewController.getContactPage);


app.get(routeNames.blogs, GetData)

app.get(routeNames.posts, PostsPath)


// Test the connection
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// Sync Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
    console.log('Models synced with database');
});


test1;

app.listen(3000, () => {
    console.log('Server running');
    console.log(this);
})
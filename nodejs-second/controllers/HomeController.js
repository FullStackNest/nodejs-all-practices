const path = require('path');
const { Header } = require('../components');

// 1st way of handling
// function HomeController(req, res) {
//     res.render('Home/Home', {
//         headerPartial: path.join(__dirname, '../components', 'Header', 'Header.ejs'),
//     })
// }

// 2nd way
function HomeController(req, res) {
    res.render('Home/Home', {
        HEADER: Header
    })
}

module.exports = {
    HomeController
}


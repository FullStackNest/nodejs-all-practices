const path = require('path');

const IndexController = {
    getIndexPage: (req, res) => {
        // Render the index.ejs view
        res.render('index', {
            name: "Seema"
        });
        res.end();
    },
}
module.exports = IndexController;
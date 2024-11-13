const path = require('path');

const viewController = {
    getIndexPage: (req, res) => {
        // Render the index.ejs view
        res.render('index');
    },
    getAboutPage: (req, res) => {
        // Render the index.ejs view
        res.render('about');
    },
    getContactPage: (req, res) => {
        // Render the index.ejs view
        if (req.params?.id) {
            const { id, companyId } = req.params
            const data = {
                id,
                companyId
            }
            res.render('contact', data);
        } else {
            res.render('contact');
        }

    },
};

module.exports = viewController;
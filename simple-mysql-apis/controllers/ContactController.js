const { DB, getAllStudents } = require('../config/config');

const ContactController = {
    getContactPage: (req, res) => {

        DB.query(getAllStudents, (err, result) => {
            if (err) {
                console.log(err);

                res.render('contact', {
                    students: [],
                });

            } else {
                res.render('contact', {
                    students: result,
                });
            }
        })
    },
}
module.exports = ContactController;
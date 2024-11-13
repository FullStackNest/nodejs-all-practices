const fs = require('fs');
const path = require('path');
const { routes } = require('../utils/routes');

const filesPath = path.join(__dirname, "files");

const imagePath = "/flipkart-logo.png";
function IndexController(req, res) {
    // console.log(filesPath);
    let data;
    fs.readFile('files/data.txt', 'utf-8', function (err, fileData) {
        if (err) {
            data = "Error in readin file " + err;
        } else {
            data = fileData;
        }
        res.render('index', {
            data: data,
            title: "Home Page",
            imagePath: imagePath,
            routes: routes,
        })
    })
}

// Not Working
// function HandleImageRoute(req, res) {
//     const imagePath = "public/flipkart-logo.png";
//     fs.readFile(imagePath, "binary", function (err, data) {
//         if (err) {
//             console.log("Error = ", err);
//             res.status(500).send("Error reading the image file");
//             return;
//         }

//         res.contentType("image/png");
//         res.send(data)

//     })
// }

module.exports = {
    IndexController,
    // HandleImageRoute,
}
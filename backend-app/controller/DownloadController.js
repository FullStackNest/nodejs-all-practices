const fs = require("fs");
const https = require("https");
const path = require("path");

const folderName = 'downloads';
const allowedVideos = [".mp4", ".avi", ".mov"];
const allowedImages = [".png", ".jpg", ".jpeg", ".gif"];
function downloadController(req, res) {

    fs.readdir(folderName, (err, files) => {
        let images = [], videos = [];
        if (err) {
            console.log('Error while reading files');
            res.render("urls", {
                title: "Url Data Downloads",
                path: req.route.path,
                message: files.length === 0 ? "No Files yet" : "Error",
                files: [],
            })
        } else {
            files.forEach(file => {
                const fileExtension = path.extname(file).toLowerCase();
                if (allowedImages.includes(fileExtension)) {
                    images.push({
                        type: "image",
                        src: file,
                    })
                } else if (allowedVideos.includes(fileExtension)) {
                    videos.push({
                        type: "video",
                        src: file
                    })
                }

            })


            res.render("urls", {
                title: "Url Data Downloads",
                path: req.route.path,
                message: "Success",
                files: [...images, ...videos]
            })
        }
    })
}


// Only when Video file is there
// function downloadController(req, res) {

//     fs.readdir(folderName, (err, files) => {
//         if (err) {
//             console.log('Error while reading files');
//             res.render("urls", {
//                 title: "Url Data Downloads",
//                 path: req.route.path,
//                 message: files.length === 0 ? "No Files yet" : "Error",
//                 files: [],
//             })
//         } else {
//             res.render("urls", {
//                 title: "Url Data Downloads",
//                 path: req.route.path,
//                 message: "Success",
//                 files: files
//             })
//         }
//     })
// }

/**
 * 
 * https://player.vimeo.com/progressive_redirect/playback/885979977/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=439ced136906f05b61a8528e2f9e39705ec8ae0513fb50d7d57c864962fb1cef
 * 
 * https://images.pexels.com/photos/20491793/pexels-photo-20491793/free-photo-of-sunflower.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load
 */

function handleDownloadURL(req, res) {
    // console.log("internalRoutes");
    const { siteURL } = req.body;
    let fileName = Date.now().toString()
    let extension = "";
    let message = "";

    if (siteURL.includes("images.pexels.com/photos")) {
        let ext = siteURL.split("?")[0].split(".");
        extension = ext[ext.length - 1];
        fileName += `.${extension}`
    } else {
        fileName += ".mp4";
    }




    // Now Checking if folder exists
    if (!fs.existsSync(folderName)) {

        // If the folder doesn't exist then create it
        fs.mkdirSync(folderName);
        console.log(`"${folderName}" folder have been created`);
    }

    // Now lets combine the folder & file path
    const filePath = `${folderName}/${fileName}`;


    // Now lets write stream of bytes into our file
    // 1st step to initialize
    const fileStream = fs.createWriteStream(filePath);

    function handleRedirect(response) {
        if (response.statusCode === 301 || response.statusCode === 302) {
            console.log("Redirected to ", response.headers.location);
            https.get(response.headers.location, handleRedirect).end();
        } else {

            // If the final response has been received, proceed with the file download
            response.pipe(fileStream);
            res.send({
                status: 200,
                message: `File downloaded after re-direct`,

            })
        }
    }


    // We're checking if the file exists within the folder.
    if (fs.existsSync(filePath)) {
        message = `Filename ${fileName} already exists`;
        res.send({
            status: 500,
            message: message,

        })
    } else {
        https.get(siteURL, function (response) {
            if (response.statusCode === 301 || response.statusCode === 302) {

                // If a redirect is encountered, handle it
                handleRedirect(response);
            } else if (response.statusCode === 200) {

                // If the response is successful (status code 200), proceed with the file download
                response.pipe(fileStream);

                fileStream.on("finish", function () {
                    fileStream.close();
                    console.log('closed here');
                    const fileSize = fs.statSync(filePath).size;
                    console.log(fileSize);
                    if (fileSize === 0) {
                        message = `Stage 4: File size 0`;
                        console.log(message);
                        res.send({
                            status: 500,
                            message: message,

                        })
                    } else {
                        message = `File downloaded successfully`
                        console.log(message);
                        res.send({
                            status: 200,
                            message: message,

                        })
                    }
                    console.log('once here');
                })



                fileStream.on("error", function (err) {
                    message = `Stage 3 Error ${err.message}`
                    res.send({
                        status: 500,
                        message: message,

                    })
                })

            } else {
                message = `Stage 2 Error: Failed to download the file. Status code: ${response.statusCode}`;
                res.send({
                    status: 200,
                    message: message,

                })
            }
        }).on("error", function (err) {
            message = `Stage 1 Error occured while downloading the file from URL ${err.message}`;
            res.send({
                status: 500,
                message: message,

            })
        })
    }




}


module.exports = {
    downloadController,
    handleDownloadURL
}
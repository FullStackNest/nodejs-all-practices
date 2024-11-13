const fs = require('fs');
const https = require('https');

const folderName = 'your_folder';  // Replace with the actual folder name
const fileName = 'your_video.mp4';  // Replace with the actual video file name
const videoUrl = 'https://player.vimeo.com/external/625579723.sd.mp4?s=38ee1d67f27848bdff7ab867f0f93b8687f4c5d8&profile_id=164&oauth2_token_id=57447761';  // Replace with the actual video URL



// Check if the folder exists
if (!fs.existsSync(folderName)) {
    // If the folder doesn't exist, create it
    fs.mkdirSync(folderName);
    console.log(`The folder '${folderName}' has been created.`);
}

// Combine the folder and file paths
const filePath = `${folderName}/${fileName}`;

// Create the file stream outside the if-else block
const fileStream = fs.createWriteStream(filePath);

// Function to handle redirects
function handleRedirect(response) {
    if (response.statusCode === 302 || response.statusCode === 301) {
        console.log(`Redirected to: ${response.headers.location}`);
        https.get(response.headers.location, handleRedirect).end();
    } else {
        // If the final response has been received, proceed with the file download
        response.pipe(fileStream);

    }
}

// Check if the file exists within the folder
if (fs.existsSync(filePath)) {
    console.log(`The file '${fileName}' already exists in the folder '${folderName}'.`);
} else {
    // If the file doesn't exist, download and save the video
    https.get(videoUrl, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
            // If a redirect is encountered, handle it
            handleRedirect(response);
        } else if (response.statusCode === 200) {
            // If the response is successful (status code 200), proceed with the file download

            response.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                const fileSize = fs.statSync(filePath).size;
                if (fileSize === 0) {
                    console.error('Error: The downloaded file has a size of 0 bytes. Check the video URL and try again.');
                    // Optionally, you can delete the empty file here if needed: fs.unlinkSync(filePath);
                } else {
                    console.log(`The video from '${videoUrl}' has been saved as '${fileName}' in the folder '${folderName}'.`);
                }
            });

            fileStream.on('error', (err) => {
                console.error(`Error: Failed to write the video file. ${err.message}`);
            });
        } else {
            console.error(`Error: Failed to download the video. Status code: ${response.statusCode}`);
        }
    }).on('error', (err) => {
        console.error(`Error: Failed to download the video. ${err.message}`);
    });
}
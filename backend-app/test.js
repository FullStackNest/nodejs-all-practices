const fs = require('fs');


// Read the file asynchronously
fs.readFile('./files/data.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log("Error while reading the file", err);
    }
    console.log(data);

})


// Read the file Synchronously
const FILEPATH = './files/data.txt';
try {
    const data = fs.readFileSync(FILEPATH, 'utf-8');
    console.log(data);

} catch (error) {
    console.log('Error in Sync: ', error);
}
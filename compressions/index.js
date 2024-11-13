const express = require('express');
const path = require('path');
const compression = require('compression');
const zlib = require('zlib');
const fs = require("fs");

const PORT = 8000;



const app = express();
app.use(require('express-status-monitor')());
app.use(compression({
    level: 6,
    // threshold: 100 * 1000, // if file exceeds 100kB then only compression will apply
    // filter: (req, res) => {
    //     if (req.headers['x-no-compression']) {
    //         return false;
    //     }

    //     return compression.filter(req, res);
    // }

}))

app.use(express.static(path.resolve(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get("/", (req, res) => {
    const load = "Welcome to JS";
    res.send(`
        <h1>Welcome</h1>
        ${load.repeat(1000)}
        <img src="https://images.pexels.com/photos/26690031/pexels-photo-26690031/free-photo-of-back-view-of-atlantic-puffin-on-rock.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" >
    `)
    res.rep
})

app.get("/new", (req, res) => {
    res.render("new")
})

app.get("/compress", (req, res) => {
    // fs.readFile('./tests/testing.txt', (err, data) => {
    //     res.end(data)
    // }) // this will utilise a lot of memory

    // const stream = fs.createReadStream('./tests/testing.txt', 'utf-8');
    // stream.on("data", (chunk) => res.write(chunk));
    // stream.on('end', () => res.end());


    // the purpose of this actually worked by reducing bandwidth size but the zip file is not able to open
    fs.createReadStream('./tests/testing.txt')
        .pipe(zlib.createGzip().pipe(fs.createWriteStream('./tests/testing.zip')))
        .on("finish", () => {
            res.end();
        });

})


app.listen(PORT, () => {
    console.log("SERVER RUNNING");

})
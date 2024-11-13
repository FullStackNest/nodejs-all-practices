const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const IndexController = require("./controller/IndexController");
const DownloadController = require("./controller/DownloadController");
const { routes, internalRoutes } = require("./utils/routes");


const PORT = 5000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// If want to pre-fix with /static on every file used in ejs
// app.use('/static', express.static(path.join(__dirname, 'public')));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "downloads")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

// const viewsPath = path.join(__dirname, "views")
// const layoutsPath = path.join(viewsPath, "layouts");
// const partialsPath = path.join(viewsPath, "partials");

// app.set("layouts", layoutsPath)
// app.set("partials", partialsPath)
// app.set('partials', { navigation: 'partials/navigation' });

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

// app.get("/", (req, res) => {
//      res.render('index', { title: 'Home Page' })
// })

app.get(routes.home, IndexController.IndexController);
app.get(routes.url, DownloadController.downloadController);
app.post(internalRoutes.extract, DownloadController.handleDownloadURL);



// app.get("/image", IndexController.HandleImageRoute)
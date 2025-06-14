const express = require("express")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const path = require("path")
require("dotenv").config();

const PORT = 5100;
const PASSWORD = "jay bajrangbali";


const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



app.get("/", async (req, res) => {
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare(PASSWORD, hashedPassword);
    console.log(isMatch);


    res.render("index");
})

app.listen(PORT, () => {
    console.log("Server started ", PORT, process.env.SECRET);
})
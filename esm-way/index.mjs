import express from 'express'
import dotenv from 'dotenv';
import nodemailer from "nodemailer";
import dotenvExpand from "dotenv-expand"
dotenvExpand.expand(dotenv.config());

const app = express();
const PORT = 5100;
const USER = "fullstacknest@gmail.com";
const PASS = "Amara$t@rtup#2023";
const RECEIVER = "student.fsn12@gmail.com";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: USER,
        pass: PASS,
    },
});

app.get("/mail", (req, res) => {
    // Send OTP via Email
    const mailOptions = {
        from: USER,
        to: RECEIVER,
        subject: "Your OTP Code",
        text: `Your OTP is: 500006. It is valid for 5 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Email sending failed" });

        } else {
            console.log(info);
            res.json({ message: "OTP sent successfully" });
        }

    });


})

app.get("/", (req, res) => {
    console.log(process.env.API_URL);
    console.log('BASE_URL', process.env.BASE_URL);

    res.send(`
        <h1>Hello Nodejs</h1>
    `)
})

app.get("/querries", (req, res) => {
    console.log(req.query);
    let html = ``;
    for (let key in req.query) {
        html += `<p>${key} = ${req.query[key]}</p>`
    }
    res.send(`
        <h1>Hello Nodejs Querries</h1>
        ${html}
    `)
})

app.listen(PORT, () => {
    console.log(`Server started ${PORT}`);
})
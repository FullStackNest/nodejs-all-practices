import express from 'express'

const app = express();
const PORT = 5100;

app.get("/", (req, res) => {
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
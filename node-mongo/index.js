const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const PORT = 5050;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://prakash:prakash7143@cluster0.orfbg.mongodb.net/demotutorial?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("Connected to Mongo DB");
    }).catch(err => {
        console.log(err);

    })

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
})


const userModel = mongoose.model("addedUsers", userSchema)

app.get("/", (req, res) => {
    res.send(`<h1>Nodejs Server</h1>`)
})





app.get("/users", (req, res) => {
    res.status(200).json([
        {
            id: 1,
            name: "Satya",
        },
        {
            id: 2,
            name: "Prakash"
        }
    ])
})

app.get("/get-user", async (req, res) => {
    const data = await userModel.find().exec()
    // console.log(data);

    res.status(200).json(data)
})


app.get("/add-user", (req, res) => {

    const user1 = new userModel({
        name: "rahul mehta",
        age: 35,
        email: "rahul.mamehta@gmail.com"
    })
    user1.save();
    res.end();

})

app.delete("/delete-user", async (req, res) => {
    console.log(req.body.id);

    try {
        await userModel.findByIdAndDelete({ _id: req.body.id }, {
            new: true
        })
        res.status(200).json({
            message: "Deleted"
        })

    } catch (error) {
        res.status(500).json({
            message: "Error from server"
        })
    }

})

// aws, gcp, azure: storage-buckets // 1TB

app.put("/edit-user", async (req, res) => {
    console.log(req.body.id);

    try {
        await userModel.findByIdAndUpdate({ _id: req.body.id }, {
            $set: req.body // Anything like $, is aggregate function
        }, {
            new: true
        })
        res.status(200).json({
            message: "Updated"
        })

    } catch (error) {
        res.status(500).json({
            message: "Error from server"
        })
    }

})

app.get("/get-user/:id", async (req, res) => {
    const data = await userModel.findById(req.params.id).exec()
    res.status(200).json(data)
})

app.post("/add-user", (req, res) => {
    const { name, age, email } = req.body;
    const user1 = new userModel({
        name,
        age,
        email,
    })
    user1.save();
    res.status(200).json({
        message: "success"
    });
})

app.listen(PORT, () => {
    console.log(`Server started..`);

});

// prakash7143, prakash
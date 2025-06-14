const express = require("express");
const cors = require("cors")
const { Server } = require("socket.io")
const http = require("http")


const PORT = 5100;


const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["POST", "GET"]
    }
})

let users = {}; // store connected users


io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    // User joins with username
    socket.on("join", (username) => {
        users[socket.id] = username;
        console.log(`${username} joined`);
    });


    // Personal chat
    socket.on("private-message", ({ receiverId, message }) => {
        io.to(receiverId).emit("private-message", {
            sender: users[socket.id],
            message: message
        })
    });

    // Group chat
    socket.on("join-room", (room) => {
        socket.join(room);
        console.log(`${users[socket.id]} joined room ${room}`);
    })

    socket.on("group-chat", ({ room, message }) => {
        io.to(room).emit("group-chat", {
            sender: users[socket.id],
            message: message
        })
    })

    // Handle user disconnect
    socket.on("disconnect", () => {
        console.log(`${users[socket.id]} disconnected`);
        delete users[socket.id];
    })


})



server.listen(PORT, () => {
    console.log(`Server running ${PORT}`);

})
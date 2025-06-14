const WebSocket = require("ws");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("New client connected");

    // Send a welcome message to the client
    ws.send(JSON.stringify({ message: "Welcome to WebSocket Server!" }));

    // Handle messages from client
    ws.on("message", (data) => {
        console.log("Received from client:", data.toString());

        // Broadcast message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Server received: ${data}`);
            }
        });
    });

    // Handle client disconnect
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

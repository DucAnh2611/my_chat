const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const { connectToDatabase } = require("./db");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const upload = multer({ dest: "uploads/" });

// connectToDatabase();

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("message", (data) => {
        console.log("Message received:", data);

        socket.emit("response", `Server received: ${data}`);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

server.listen(3001, () => {
    console.log("Server listening on port 3001");
});

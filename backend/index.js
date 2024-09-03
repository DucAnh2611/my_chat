const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const upload = multer({ dest: "uploads/" });

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("message", (msg) => {
        io.emit("message", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

app.post("/upload", upload.single("file"), async (req, res) => {
    if (req.file.mimetype.startsWith("image/")) {
        await sharp(req.file.path)
            .resize(500)
            .toFile(`uploads/${req.file.filename}-resized.jpg`);
    }
    res.send("File uploaded and processed");
});

server.listen(3001, () => {
    console.log("Server listening on port 3001");
});

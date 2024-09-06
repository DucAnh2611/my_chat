const initSocketConversation = require("./conversation.js");
const initSocketMessage = require("./message");

const initSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("A user connected");

        initSocketMessage(io, socket);

        initSocketConversation(io, socket);

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });
};

module.exports = initSocket;

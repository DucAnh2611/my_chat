const SOCKET_CONSTANT = require("../../constants/socket.constant");

const initSocketConversation = (io, socket) => {
    socket.on(SOCKET_CONSTANT.CONVERSATION.OPEN, ({ conversationId }) => {
        socket.join(conversationId);

        socket.emit(SOCKET_CONSTANT.CONVERSATION.OPEN, {
            success: true,
            conversationId,
        });
    });

    socket.on(SOCKET_CONSTANT.CONVERSATION.CLOSE, ({ conversationId }) => {
        socket.leave(conversationId);

        socket.emit(SOCKET_CONSTANT.CONVERSATION.CLOSE, {
            success: true,
            conversationId,
        });
    });
};

module.exports = initSocketConversation;

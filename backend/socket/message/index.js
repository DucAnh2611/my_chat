const EVENT_EMITTER_CONSTANT = require("../../constants/event-emitter.constant");
const SOCKET_CONSTANT = require("../../constants/socket.constant");
const eventEmitter = require("../../event-emiiter");

const initSocketMessage = (io, socket) => {
    socket.on(SOCKET_CONSTANT.MESSAGE.TYPING, () => {});

    eventEmitter.on(EVENT_EMITTER_CONSTANT.EVENT.MESSAGE.SEND, (data) => {
        const { message, member } = data;

        io.to(message.conversation.toString()).emit(
            SOCKET_CONSTANT.MESSAGE.SENT,
            {
                message,
                member,
            }
        );
    });
};

module.exports = initSocketMessage;

const { default: mongoose, Schema } = require("mongoose");
const MESSAGE_CONSTANT = require("../../../constants/message.constant");

const MessageSchema = new mongoose.Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: "member",
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref: "conversation",
    },
    text: { type: String, required: true },
    type: { type: String, enum: Object.values(MESSAGE_CONSTANT.TYPES) },
    reply: {
        type: Schema.Types.ObjectId,
        ref: "message",
        required: false,
        default: null,
    },
    isDelete: { type: Boolean, required: true, default: false },
    sentAt: { type: Date, required: true },
});

const MessageModel = mongoose.model("message", MessageSchema);

module.exports = MessageModel;

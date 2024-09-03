const { default: mongoose, Schema } = require("mongoose");
const MESSAGE_CONSTANT = require("../../../constants/message.constant");

const MessageSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    text: { type: String, required: true },
    type: { type: String, enum: Object.values(MESSAGE_CONSTANT.TYPES) },
});

module.exports = mongoose.model("message", MessageSchema);

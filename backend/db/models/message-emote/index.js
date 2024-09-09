const { default: mongoose, Schema } = require("mongoose");
const MESSAGE_CONSTANT = require("../../../constants/message.constant");

const MessageEmoteSchema = new mongoose.Schema({
    emote: { type: string, required: true },
    memberId: { type: Schema.Types.ObjectId, ref: "member", reqruired: true },
    sentAt: { type: Date, required: true },
});

const MessageEmoteModel = mongoose.model("message-emote", MessageEmoteSchema);

module.exports = MessageEmoteModel;

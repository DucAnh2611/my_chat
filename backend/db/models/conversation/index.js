const { default: mongoose, Schema } = require("mongoose");
const CONVERTSATION_CONSTANT = require("../../../constants/conversation.constant");

const ConversationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createAt: { type: Date, required: false },
    configs: {
        type: Object,
        required: true,
        default: CONVERTSATION_CONSTANT.DEFAULT_CONFIG,
    },
    themes: [{ type: Schema.Types.ObjectId, ref: "theme" }],
    type: {
        type: String,
        enum: Object.values(CONVERTSATION_CONSTANT.TYPE),
        required: true,
    },
    image: { type: String, required: false },
});

const ConversationModel = mongoose.model("conversation", ConversationSchema);

module.exports = ConversationModel;

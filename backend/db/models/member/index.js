const { default: mongoose, Schema } = require("mongoose");
const ROLE_CONSTANT = require("../../../constants/role.constant");

const MemberSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    role: { type: String, required: true, enum: Object.values(ROLE_CONSTANT) },
    nickname: { type: String, required: true },
    configs: {
        type: Object,
        required: false,
    },
    conversation: { type: Schema.Types.ObjectId, ref: "conversation" },
    isLeave: { type: Boolean, required: false, default: false },
    leaveAt: { type: Date, required: false, default: false },
    joinAt: { type: Date, required: true },
});

const MemberModel = mongoose.model("member", MemberSchema);

module.exports = MemberModel;

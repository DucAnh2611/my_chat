const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: false },
    avatar: { type: String, required: false },
    isMe: { type: String, required: true, default: false },
    description: { type: String, required: false },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;

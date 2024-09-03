const { default: mongoose, Schema } = require("mongoose");

const IconSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    char: { type: String, required: true },
    path: { type: String, required: true },
});

module.exports = mongoose.model("icon", IconSchema);

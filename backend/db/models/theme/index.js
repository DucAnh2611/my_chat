const { default: mongoose } = require("mongoose");

const ThemeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: [
        {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    details: {
        type: Object,
        required: true,
    },
    themes: [{ type: Schema.Types.ObjectId, ref: "theme" }],
    type: { type: String, enum: Object.values(THEME_CONSTANT.TYPE) },
    createAt: { type: Date, required: false },
});

const ThemeModel = mongoose.model("theme", ThemeSchema);

module.exports = ThemeModel;

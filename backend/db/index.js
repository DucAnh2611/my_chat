const { default: mongoose } = require("mongoose");
const appConfigs = require("../configs");

const dbName = appConfigs.db.name;
const url = appConfigs.db.url;

async function connectToDatabase() {
    mongoose.connect(`${url}/${dbName}`);
    const database = mongoose.connection;

    database.on("error", (error) => {
        console.log(error);
    });

    database.once("connected", () => {
        console.log("Database Connected");
    });
}

module.exports = { connectToDatabase };

const { default: mongoose } = require("mongoose");
const mongodb = require("mongodb");
const appConfigs = require("../configs");

const dbName = appConfigs.db.name;
const url = appConfigs.db.url;

async function initDbConnection() {
    try {
        const database = await mongoose.connect(`${url}/${dbName}`);
        console.log("Database initialized");

        return database.connection.db;
    } catch (error) {
        console.log(error);
        return;
    }
}

module.exports = { initDbConnection };

const { initDbConnection } = require("./connection");
const { initBucket } = require("./bukket");

async function initDatabase() {
    const db = await initDbConnection();

    const bucket = initBucket(db);
}

module.exports = { initDatabase };

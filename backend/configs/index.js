require("dotenv").config();

const appConfigs = {
    db: {
        url: process.env.DB_URL,
        name: process.env.DB_NAME,
    },
    encrypt: {
        algorithm: process.env.ENCRYPT_ALGORITHM,
        iv: process.env.ENCRYPT_IV,
        key: process.env.ENCRYPT_KEY,
    },
    token: {
        access: {
            name: process.env.TOKEN_ACCESS_KEY,
            expire: process.env.TOKEN_ACCESS_EXPIRE,
        },
        refresh: {
            name: process.env.TOKEN_REFRESH_KEY,
            expire: process.env.TOKEN_REFESH_EXPIRE,
        },
    },
    cookies: {
        name: process.env.COOKIES_NAME,
        options: {},
    },
    app: {
        port: 80,
        prefix: "api",
    },
};

module.exports = appConfigs;

require("dotenv").config();

const appConfigs = {
    frontend: {
        origin: process.env.FRONTEND_ORIGINS,
    },
    db: {
        url: process.env.DB_URL,
        name: process.env.DB_NAME,
    },
    encrypt: {
        algorithm: process.env.ENCRYPT_ALGORITHM,
        key: process.env.ENCRYPT_KEY,
    },
    token: {
        access: {
            key: process.env.TOKEN_ACCESS_KEY,
            expire: process.env.TOKEN_ACCESS_EXPIRE,
        },
        refresh: {
            key: process.env.TOKEN_REFRESH_KEY,
            expire: process.env.TOKEN_REFESH_EXPIRE,
        },
    },
    cookies: {
        name: process.env.COOKIES_NAME,
        options: {},
    },
    app: {
        port: process.env.PORT,
        prefix: "api",
    },
};

module.exports = appConfigs;

const crypto = require("crypto");
const { Module } = require("module");
const appConfigs = require("../configs");

const algorithm = appConfigs.encrypt.algorithm;
const key = crypto.randomBytes(appConfigs.encrypt.key);
const iv = crypto.randomBytes(appConfigs.encrypt.iv);

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
}

function decrypt(encrypted) {
    const decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(key),
        Buffer.from(iv, "hex")
    );

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}

module.exports = { encrypt, decrypt };

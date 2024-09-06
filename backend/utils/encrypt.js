const crypto = require("crypto");
const appConfigs = require("../configs");

const algorithm = appConfigs.encrypt.algorithm;
const key = appConfigs.encrypt.key;

function encrypt(text) {
    const cipher = crypto.createCipher(algorithm, key);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

function decrypt(encryptedData) {
    const decipher = crypto.createDecipher(algorithm, key);
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

module.exports = { encrypt, decrypt };

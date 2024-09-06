const jwt = require("jsonwebtoken");

function generateToken(payload, secret, options) {
    return jwt.sign(payload, secret, options);
}

function verifyToken(token, secret) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
        });
    });
}

module.exports = { generateToken, verifyToken };

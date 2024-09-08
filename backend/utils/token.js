const jwt = require("jsonwebtoken");
const {
    ERROR_CODE_CONSTANT,
    OBJECT_TYPE,
    RESPONSE_CODE_CONSTANT,
} = require("../constants/code.constant");
const { ResponseJson } = require("../constants/response.constant");

const errorFilter = (type) => ({
    TokenExpiredError: ERROR_CODE_CONSTANT.EXPIRE(
        OBJECT_TYPE.TOKEN[type] || "TOKEN"
    ),
    JsonWebTokenError: ERROR_CODE_CONSTANT.INVALID(
        OBJECT_TYPE.TOKEN[type] || "TOKEN"
    ),
});

function generateToken(payload, secret, options) {
    return jwt.sign(payload, secret, options);
}

async function verifyToken(token, secret, type = "") {
    try {
        const verify = await jwt.verify(token, secret);
        return { token, data: verify, error: null };
    } catch (err) {
        return {
            token,
            data: {},
            error: ResponseJson(
                false,
                RESPONSE_CODE_CONSTANT.FORBIDDEN,
                errorFilter(type)[err.name] || errorFilter(type).INVALID
            ),
        };
    }
}

module.exports = { generateToken, verifyToken };

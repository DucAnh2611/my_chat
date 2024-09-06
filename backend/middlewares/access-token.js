const appConfigs = require("../configs");
const {
    RESPONSE_CODE_CONSTANT,
    ERROR_CODE_CONSTANT,
    OBJECT_TYPE,
} = require("../constants/code.constant");
const { ResponseJson } = require("../constants/response.constant");
const TOKEN_CONSTANT = require("../constants/token.constant");
const { verifyToken } = require("../utils/token");

const accessTokenCheck = async (req, res, next) => {
    const authToken = req.headers[TOKEN_CONSTANT.HEADER.ACCESS.NAME];
    if (!authToken) {
        return res
            .status(403)
            .json(
                ResponseJson(
                    false,
                    RESPONSE_CODE_CONSTANT.FORBIDDEN,
                    ERROR_CODE_CONSTANT.INVALID(OBJECT_TYPE.TOKEN.ACCESS)
                )
            );
    }

    const [_bearer, token] = authToken.split(" ");

    const validToken = await verifyToken(token, appConfigs.token.access.key);
    if (!validToken) {
        return res
            .status(403)
            .json(
                ResponseJson(
                    false,
                    RESPONSE_CODE_CONSTANT.FORBIDDEN,
                    ERROR_CODE_CONSTANT.INVALID(OBJECT_TYPE.TOKEN.ACCESS)
                )
            );
    }

    req.accessPayload = validToken;

    return next();
};

module.exports = accessTokenCheck;

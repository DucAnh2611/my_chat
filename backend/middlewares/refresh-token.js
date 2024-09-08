const appConfigs = require("../configs");
const {
    RESPONSE_CODE_CONSTANT,
    ERROR_CODE_CONSTANT,
    OBJECT_TYPE,
} = require("../constants/code.constant");
const { ResponseJson } = require("../constants/response.constant");
const { verifyToken } = require("../utils/token");

const refreshTokenCheck = async (req, res, next) => {
    const authToken = req.cookies[appConfigs.cookies.name];
    if (!authToken) {
        return res
            .status(403)
            .json(
                ResponseJson(
                    false,
                    RESPONSE_CODE_CONSTANT.FORBIDDEN,
                    ERROR_CODE_CONSTANT.INVALID(OBJECT_TYPE.TOKEN.REFRESH)
                )
            );
    }

    const validToken = await verifyToken(
        authToken,
        appConfigs.token.refresh.key,
        "REFRESH"
    );
    if (validToken.error) {
        const { status } = validToken.error;
        return res.status(status).json(validToken.error);
    }

    req.refreshPayload = validToken.data;

    return next();
};

module.exports = refreshTokenCheck;

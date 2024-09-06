const {
    RESPONSE_CODE_CONSTANT,
    ERROR_CODE_CONSTANT,
} = require("./code.constant");

const Internal = () => ({
    success: true,
    status: RESPONSE_CODE_CONSTANT.INTERNAL,
    message: ERROR_CODE_CONSTANT.INTERNAL,
});

const Ok = (result) => ({
    success: true,
    status: RESPONSE_CODE_CONSTANT.SUCCESS,
    result,
});

const ResponseJson = (success, status, message) => ({
    success,
    status,
    message,
});
module.exports = { Internal, Ok, ResponseJson };

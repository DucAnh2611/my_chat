const ERROR_CODE_CONSTANT = {
    NOT_MATCH_PASSWORD: "NOT_MATCH_PASSWORD",
    INVALID: (type) => `INVALID_${type.toUpperCase()}`,
    NOT_EXIST: (type) => `NOT_EXIST_${type.toUpperCase()}`,
    EXIST: (type) => `EXIST_${type.toUpperCase()}`,
    INTERNAL: "INTERNAL",
};

const RESPONSE_CODE_CONSTANT = {
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    INTERNAL: 500,
    SUCCESS: 200,
};

const OBJECT_TYPE = {
    USER: {
        BASE: "USER",
        PASSWORD: "USER_PASSWORD",
        USERNAME: "USER_USERNAME",
    },
    CONVERSATION: {
        BASE: "CONVERSATION",
        TYPE: "CONVERSATION_TYPE",
        MEMBER: {
            BASE: "CONVERSATION_MEMBER",
            ROLE: "CONVERSATION_MEMBER_ROLE",
        },
    },
    TOKEN: {
        ACCESS: "TOKEN_ACCESS",
        REFRESH: "TOKEN_REFRESH",
    },
};

module.exports = { ERROR_CODE_CONSTANT, RESPONSE_CODE_CONSTANT, OBJECT_TYPE };

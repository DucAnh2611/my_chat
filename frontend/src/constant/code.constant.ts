export const ERROR_CODE_CONSTANT = {
    NOT_MATCH_PASSWORD: "NOT_MATCH_PASSWORD",
    INVALID: (type: string) => `INVALID_${type.toUpperCase()}`,
    NOT_EXIST: (type: string) => `NOT_EXIST_${type.toUpperCase()}`,
    EXIST: (type: string) => `EXIST_${type.toUpperCase()}`,
    EXPIRE: (type: string) => `EXPIRE_${type.toUpperCase()}`,
    INTERNAL: "INTERNAL",
};

export const RESPONSE_CODE_CONSTANT = {
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    INTERNAL: 500,
    SUCCESS: 200,
};

export const OBJECT_TYPE = {
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

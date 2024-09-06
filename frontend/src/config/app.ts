export const AppConfigs = {
    api: {
        url: process.env.REACT_APP_API_URL || "",
        header: {
            auth: process.env.REACT_APP_API_HEADER_AUTH || "",
        },
    },
    storage: {
        local: process.env.REACT_APP_LOCAL_STORAGE_NAME || "",
        session: {
            name: process.env.REACT_APP_SESSION_STORAGE_NAME || "",
            expire: process.env.REACT_APP_SESSION_STORAGE_EXPIRE || 0,
        },
    },
};

import { AppConfigs } from "@/config/app";
import { getLocalStorage } from "@/lib/str";

export const joinApiUrl = (...path: string[]) => {
    return [AppConfigs.api.url, ...path].join("/");
};

export const API_HEADERS = {
    ContentType: {
        "Content-Type": "application/json",
    },
    Auth: () => {
        const token = getLocalStorage();
        return {
            [AppConfigs.api.header.auth]: `Bearer ${token}`,
        };
    },
};

export const API_URLS = {
    AUTH: {
        login: () => ({
            path: joinApiUrl("auth/login"),
            method: "POST",
            headers: API_HEADERS["ContentType"],
        }),
        refresh: () => ({
            path: joinApiUrl("auth/refresh"),
            method: "GET",
        }),
    },
    USER: {
        me: () => ({
            path: joinApiUrl("user/me"),
            method: "GET",
            headers: API_HEADERS.Auth(),
        }),
        list: (username: string, skip: number) => ({
            path: joinApiUrl("user", `find?skip=${skip}&username=${username}`),
            method: "GET",
            headers: API_HEADERS.Auth(),
        }),
    },
    CONVERSATION: {
        CREATE: () => ({
            path: joinApiUrl("conversation"),
            method: "POST",
            headers: { ...API_HEADERS["ContentType"], ...API_HEADERS.Auth() },
        }),
        LIST: (page: number) => ({
            path: joinApiUrl("conversation", `list?page=${page}`),
            method: "GET",
            headers: { ...API_HEADERS["ContentType"], ...API_HEADERS.Auth() },
        }),
        DETAIL: (id: string) => ({
            path: joinApiUrl("conversation", id),
            method: "GET",
            headers: { ...API_HEADERS["ContentType"], ...API_HEADERS.Auth() },
        }),
    },
    MESSAGE: {
        SEND: () => ({
            path: joinApiUrl("message", "send"),
            method: "POST",
            headers: { ...API_HEADERS["ContentType"], ...API_HEADERS.Auth() },
        }),
        CONVERSATION: (id: string, page: number) => ({
            path: joinApiUrl("message", `conversation`, `${id}?skip=${page}`),
            method: "GET",
            headers: { ...API_HEADERS["ContentType"], ...API_HEADERS.Auth() },
        }),
    },
};

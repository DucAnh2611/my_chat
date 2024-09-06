import { API_URLS } from "@/constant/api";
import { IUser } from "@/interface/user";
import { apiCall } from "@/lib/apiCall";

/** @ME */
export const getMe = async () => {
    const api = API_URLS.USER.me();

    const call = await apiCall<IUser>({
        ...api,
    });

    return call;
};

/** @LIST */
export const listUser = async (username: string, skip: number) => {
    const api = API_URLS.USER.list(username, skip);

    const call = await apiCall<IUser[]>({
        ...api,
    });

    return call;
};

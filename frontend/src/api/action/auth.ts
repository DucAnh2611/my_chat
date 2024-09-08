import { API_URLS } from "@/constant/api";
import { IApiResponse } from "@/interface/api";
import { ILogin, ILoginResponse, IRefreshResponse } from "@/interface/auth";
import { apiCall } from "@/lib/apiCall";
import { clearLocalStorage } from "@/lib/str";

/** @LOGIN */
export const login = async (body: ILogin) => {
    const api = API_URLS.AUTH.login();

    const call = await apiCall<ILoginResponse>({
        ...api,
        body: JSON.stringify(body),
        credentials: "include",
    });

    return call;
};

/** @REFRESH */
export const refreshToken = async () => {
    const api = API_URLS.AUTH.refresh();

    const call = await apiCall<IRefreshResponse>({
        ...api,
        credentials: "include",
    });

    return call;
};

/** @LOGOUT */
export const logout = async () => {
    clearLocalStorage();

    return {
        success: true,
        status: 200,
    } as IApiResponse<any>;
};

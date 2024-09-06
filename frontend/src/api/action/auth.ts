import { API_URLS } from "@/constant/api";
import { ILogin, ILoginResponse } from "@/interface/auth";
import { apiCall } from "@/lib/apiCall";

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

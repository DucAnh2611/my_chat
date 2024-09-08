import { refreshToken } from "@/api/action/auth";
import { ERROR_CODE_CONSTANT, OBJECT_TYPE } from "@/constant/code.constant";
import { IApiResponse } from "@/interface/api";

interface IApiCall extends RequestInit {
    path: string;
}

export const apiCall = async <T>({ path, ...options }: IApiCall) => {
    const call = await fetch(path, options);
    const results: IApiResponse<T> = await call.json();

    if (
        !results.success &&
        results.message &&
        results.message === ERROR_CODE_CONSTANT.EXPIRE(OBJECT_TYPE.TOKEN.ACCESS)
    ) {
        const tryRefresh = await refreshToken();

        if (!tryRefresh.success) {
            // logout();
        } else {
            const reCall = await fetch(path, options);
            const reResults: IApiResponse<T> = await reCall.json();

            return reResults;
        }
    }
    return results;
};

import { IApiResponse } from "@/interface/api";

interface IApiCall extends RequestInit {
    path: string;
}

export const apiCall = async <T>({ path, ...options }: IApiCall) => {
    const call = await fetch(path, options);
    const results: IApiResponse<T> = await call.json();

    return results;
};

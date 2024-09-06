export interface IApiResponse<T> {
    success: boolean;
    status: number;
    message?: string;
    result?: T;
}

export interface ILogin {
    username: string;
    password: string;
}

export interface ILoginResponse {
    accessToken: string;
}

export interface IRefreshResponse {
    accessToken: string;
}

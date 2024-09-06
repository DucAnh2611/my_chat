import { IUser } from "./user";

export interface IMember {
    _id: string;
    nickname: string;
    user: IUser;
    role: string;
}

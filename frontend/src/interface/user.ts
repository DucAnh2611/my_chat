export interface IUser {
    _id: string;
    name: string;
    username: string;
    avatar: string | null;
    description: string;
    status: string;
    isMe: boolean;
}

export interface IUserMember {
    _id: string;
    name: string;
    username: string;
    avatar: string | null;
    status: string;
    isMe: boolean;
}

export interface IConversation {
    _id: string;
    name: string;
    image: string;
}

export interface ILastestMessageConversation {
    _id: string;
    type: string;
    text: string;
    sentAt: Date;
    seens: ISeenLastestMessageConversation[];
    member: ILastestMessageConversationMember;
}

export interface ILastestMessageConversationMember {
    _id: string;
    nickname: string;
}

export interface ISeenLastestMessageConversation {
    _id: string;
    user: string;
    nickname: string;
    avatar: string;
}

export interface IConversationWithLastestMessage extends IConversation {
    lastestMessage: ILastestMessageConversation | null;
}

export interface IConversationDetail extends IConversation {
    configs: object;
}

export interface IConversationListResponse {
    items: IConversationWithLastestMessage[];
    count: number;
    page: number;
}

export interface IConversationCreate {
    name: string;
    memberIds: string;
    type: string;
}

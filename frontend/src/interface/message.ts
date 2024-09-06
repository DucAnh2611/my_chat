import { IMember } from "./member";

export interface ISendMessage {
    conversationId: string;
    text: string;
    type: string;
}

export interface IMessage {
    _id: string;
    member: IMember;
    text: string;
    type: string;
    sentAt: Date;
}

export interface IConversationMessageResponse {
    items: IMessage[];
    count: number;
    skip: number;
}

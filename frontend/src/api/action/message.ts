import { API_URLS } from "@/constant/api";
import {
    IConversationMessageResponse,
    ISendMessage,
} from "@/interface/message";
import { apiCall } from "@/lib/apiCall";

/** @SEND */
export const sendMessage = async (body: ISendMessage) => {
    const api = API_URLS.MESSAGE.SEND();

    const call = await apiCall({
        ...api,
        body: JSON.stringify(body),
    });

    return call;
};

/** @CONVERSATION_MESSAGE */
export const conversationMessage = async (id: string, skip: number) => {
    const api = API_URLS.MESSAGE.CONVERSATION(id, skip);

    const call = await apiCall<IConversationMessageResponse>({
        ...api,
    });

    return call;
};

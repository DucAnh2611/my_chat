import { API_URLS } from "@/constant/api";
import {
    IConversationDetail,
    IConversationListResponse,
} from "@/interface/conversation";
import { apiCall } from "@/lib/apiCall";

/** @CREATE */
export const createConversation = async (body: object) => {
    const api = API_URLS.CONVERSATION.CREATE();

    const createApi = await apiCall({ ...api, body: JSON.stringify(body) });

    return createApi;
};

/** @LIST */
export const listConversation = async (page: number) => {
    const api = API_URLS.CONVERSATION.LIST(page);

    const createApi = await apiCall<IConversationListResponse>({ ...api });

    return createApi;
};

/** @DETAIL  */
export const detailConversation = async (id: string) => {
    const api = API_URLS.CONVERSATION.DETAIL(id);

    const createApi = await apiCall<IConversationDetail>({ ...api });

    return createApi;
};

import { detailConversation } from "@/api/action/conversation";
import { IConversationDetail } from "@/interface/conversation";
import { IMessage } from "@/interface/message";
import { createContext, ReactNode, useEffect, useState } from "react";

interface IConversationContext {
    conversation: IConversationDetail | null;
    openSetting: boolean;
    setOpenSetting: (open: boolean) => void;
    setId: (id: string) => void;
    setReply: (message: IMessage | null) => void;
    reply: IMessage | null;
}

export const ConversationContext = createContext<IConversationContext>({
    conversation: null,
    openSetting: false,
    setOpenSetting: (open: boolean) => {},
    setId: (id: string) => {},
    setReply: (message: IMessage | null) => {},
    reply: null,
});

export default function ConversationProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [id, SetId] = useState<string>("");
    const [conversation, SetConversation] =
        useState<IConversationDetail | null>(null);
    const [openSetting, SetOpenSetting] = useState<boolean>(false);
    const [reply, SetReply] = useState<IMessage | null>(null);

    const getConversation = async (id: string) => {
        if (!id) return;
        const detail = await detailConversation(id);

        if (detail.success && detail.result) {
            SetConversation(detail.result);
        }
    };

    const setOpenSetting = (open: boolean) => {
        SetOpenSetting(open);
    };

    const setId = (id: string) => {
        SetId(id);
    };

    const setReply = (message: IMessage | null) => {
        SetReply(message);
    };

    const conversationValue: IConversationContext = {
        conversation,
        openSetting: openSetting,
        setOpenSetting: setOpenSetting,
        setId: setId,
        setReply: setReply,
        reply,
    };

    useEffect(() => {
        getConversation(id);
    }, [id]);

    return (
        <ConversationContext.Provider value={conversationValue}>
            {children}
        </ConversationContext.Provider>
    );
}

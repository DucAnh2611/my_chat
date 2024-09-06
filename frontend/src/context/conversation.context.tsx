import { detailConversation } from "@/api/action/conversation";
import { IConversationDetail } from "@/interface/conversation";
import { createContext, ReactNode, useEffect, useState } from "react";

interface IConversationContext {
    conversation: IConversationDetail | null;
    openSetting: boolean;
    setOpenSetting: (open: boolean) => void;
    setId: (id: string) => void;
}

export const ConversationContext = createContext<IConversationContext>({
    conversation: null,
    openSetting: false,
    setOpenSetting: (open: boolean) => {},
    setId: (id: string) => {},
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

    const conversationValue: IConversationContext = {
        conversation,
        openSetting: openSetting,
        setOpenSetting: setOpenSetting,
        setId: setId,
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

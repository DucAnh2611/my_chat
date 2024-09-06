import { ConversationContext } from "@/context/conversation.context";
import { useContext } from "react";

export default function useConversation() {
    return useContext(ConversationContext);
}

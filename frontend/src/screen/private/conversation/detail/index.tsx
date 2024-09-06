import ConversationMain from "@/components/conversation-main";
import useConversation from "@/hook/useConversation";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ConversationDetailScreen() {
    const params = useParams();
    const { setId, conversation } = useConversation();

    useEffect(() => {
        const { id } = params;
        if (!id) return;

        setId(id);
    }, [params, setId]);

    if (!conversation) return <></>;
    return (
        <div className="w-full h-full">
            <ConversationMain />
        </div>
    );
}

import useConversation from "@/hook/useConversation";
import ConversationDisplay from "./conversation-display";
import ConversationHeader from "./conversation-header";
import ConversationSetting from "./conversation-settings";

export default function ConversationMain() {
    const { conversation } = useConversation();

    if (!conversation) return <></>;
    return (
        <div className="flex w-full h-full">
            <div className="flex-1 flex flex-col">
                <div className="w-full h-fit">
                    <ConversationHeader />
                </div>
                <div className="flex-1 w-full overflow-hidden">
                    <ConversationDisplay />
                </div>
            </div>
            <ConversationSetting />
        </div>
    );
}

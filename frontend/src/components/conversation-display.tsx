import ConversationMessage from "./conversation-message";
import ConversationSend from "./conversation-send";

export default function ConversationDisplay() {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 w-full box-border overflow-hidden">
                <ConversationMessage />
            </div>
            <div className="w-full h-fit">
                <ConversationSend />
            </div>
        </div>
    );
}

import { sendMessage } from "@/api/action/message";
import useConversation from "@/hook/useConversation";
import { MouseDownEvent } from "emoji-picker-react/dist/config/config";
import { ImageIcon, MicIcon, SendHorizonal, SmileIcon } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import DialogSelectEmoji from "./dialog-emoji";
import DynamicTextarea from "./dynamic-textarea";
import { Button } from "./ui/button";

export default function ConversationSend() {
    const { conversation } = useConversation();

    const messageRef = useRef<HTMLTextAreaElement | null>(null);

    const [message, SetMessage] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        SetMessage(e.target.value);
    };

    const handleSelectEmoji: MouseDownEvent = (emoji, event) => {
        SetMessage((m) => `${m}${emoji.emoji}`);
    };

    const handleSend = async () => {
        await send(message, "TEXT");
    };

    const send = async (message: string, type: string) => {
        const trimMessage = message.trim();

        if (conversation && trimMessage) {
            const sent = await sendMessage({
                conversationId: conversation._id,
                text: trimMessage,
                type: type,
            });

            if (sent.success) {
                messageRef.current?.focus();
                SetMessage("");
            }
        }
    };

    const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            await send(message, "TEXT");
        }
    };

    useEffect(() => {
        SetMessage("");
    }, [conversation]);

    return (
        <div className="w-full h-fit border-t box-border p-3 flex gap-0.5 items-start bg-background backdrop-blur-sm">
            <div className="flex gap-0 items-start">
                <Button
                    size="sm"
                    variant="ghost"
                    className="text-primary rounded-full group/b-f gap-2 "
                >
                    <ImageIcon size={15} />
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                    className="text-primary rounded-full group/b-f gap-2 "
                >
                    <MicIcon size={15} />
                </Button>
            </div>
            <div className="flex-1 h-fit overflow-hidden">
                <DynamicTextarea
                    maxLines={8}
                    lineHeight={20}
                    rows={1}
                    ref={messageRef}
                    value={message}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập tin nhắn"
                    className="resize-none overflow-auto break-words whitespace-normal min-h-0 h-auto leading-5 focus-visible:ring-transparent"
                />
            </div>

            <DialogSelectEmoji
                onSelect={handleSelectEmoji}
                trigger={
                    <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full"
                    >
                        <SmileIcon size={15} />
                    </Button>
                }
            />
            <div>
                <Button size="icon" variant="ghost" onClick={handleSend}>
                    {message.length !== 0 ? (
                        <SendHorizonal size={15} />
                    ) : (
                        <SendHorizonal size={15} />
                    )}
                </Button>
            </div>
        </div>
    );
}

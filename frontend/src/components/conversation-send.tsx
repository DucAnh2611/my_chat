import { sendMessage } from "@/api/action/message";
import useConversation from "@/hook/useConversation";
import { ISendMessage } from "@/interface/message";
import { MouseDownEvent } from "emoji-picker-react/dist/config/config";
import { ImageIcon, MicIcon, SendHorizonal, SmileIcon, X } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import DialogSelectEmoji from "./dialog-emoji";
import DynamicTextarea from "./dynamic-textarea";
import { Button } from "./ui/button";

export default function ConversationSend() {
    const { conversation, reply, setReply } = useConversation();

    const messageRef = useRef<HTMLTextAreaElement | null>(null);

    const [message, SetMessage] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        SetMessage(e.target.value);
    };

    const handleCancelReply = () => {
        setReply(null);
    };

    const handleSelectEmoji: MouseDownEvent = (emoji, event) => {
        SetMessage((m) => `${m}${emoji.emoji}`);
    };

    const handleSend = async () => {
        if (conversation) {
            await send({
                text: message,
                type: "TEXT",
                conversationId: conversation._id,
                replyId: reply?._id || null,
            });
        }
    };

    const send = async (message: ISendMessage) => {
        const trimMessage = message.text.trim();

        if (conversation && trimMessage) {
            const sent = await sendMessage(message);

            if (sent.success) {
                SetMessage("");
                setReply(null);
            }
        }
    };

    const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            await handleSend();
        }
    };

    useEffect(() => {
        if (messageRef.current && reply) {
            messageRef.current.focus();
        }
    }, [reply]);

    useEffect(() => {
        SetMessage("");
    }, [conversation]);

    return (
        <div className="w-full h-fit border-t box-border p-3 flex flex-col gap-2 bg-background backdrop-blur-sm">
            {reply && (
                <div className="flex items-center bg-muted rounded-md p-2 box-border">
                    <div className="flex-1">
                        <p className="text-muted-foreground text-xs">
                            Trả lời {reply.member.nickname}:
                        </p>
                        <p className="text-primary text-sm line-clamp-2 whitespace-pre-wrap mt-2">
                            {reply.text}
                        </p>
                    </div>
                    <Button
                        className="rounded-full !p-2 w-fit h-fit"
                        size="icon"
                        variant="ghost"
                        onClick={handleCancelReply}
                    >
                        <X size={15} />
                    </Button>
                </div>
            )}
            <div className=" flex gap-0.5 items-start ">
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
        </div>
    );
}

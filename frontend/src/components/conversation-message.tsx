import { conversationMessage } from "@/api/action/message";
import { SOCKET_CONSTANT } from "@/constant/socket";
import useConversation from "@/hook/useConversation";
import useUser from "@/hook/userUser";
import useSocket from "@/hook/useSocket";
import { IConversationDetail } from "@/interface/conversation";
import { IMember } from "@/interface/member";
import { IMessage } from "@/interface/message";
import { LoaderIcon } from "lucide-react";
import { UIEvent, useEffect, useState } from "react";
import MemberMessage from "./member-message";

export default function ConversationMessage() {
    const { conversation } = useConversation();
    const { me } = useUser();
    const socket = useSocket();

    const [conv, SetConv] = useState<IConversationDetail>();
    const [messages, SetMessages] = useState<IMessage[]>([]);
    const [loading, SetLoading] = useState<boolean>(false);
    const [join, SetJoin] = useState<boolean>(false);
    const [skip, SetSkip] = useState<number>(0);
    const [canScroll, SetCanScroll] = useState<boolean>(true);

    const getConversationMessage = async (id: string, skip: number) => {
        if (!loading && canScroll) {
            SetLoading(true);
        }

        const call = await conversationMessage(id, skip);
        if (call.success && call.result) {
            const { items } = call.result;

            if (messages.length + items.length >= skip) {
                SetMessages((msg) => [...msg, ...items]);
                SetSkip(skip);
            } else {
                SetCanScroll(false);
            }
        }

        SetLoading(false);
    };
    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        if (
            -target.scrollTop + target.clientHeight >= target.scrollHeight &&
            !loading &&
            canScroll
        ) {
            SetSkip(messages.length);
        }
    };

    useEffect(() => {
        if (conversation) {
            SetConv(conversation);
            SetMessages([]);
            SetSkip(0);
            SetLoading(false);
            SetCanScroll(true);
        }
    }, [conversation]);

    useEffect(() => {
        if (!conv) return;

        getConversationMessage(conv._id, skip);
    }, [conv, skip]);

    useEffect(() => {
        if (!socket) return;
        if (conv) {
            if (conversation && conv._id !== conversation._id) {
                socket.emit(SOCKET_CONSTANT.CONVERSATION.CLOSE, {
                    conversationId: conv._id,
                });
            }
        }

        if (!join && conv) {
            socket.emit(SOCKET_CONSTANT.CONVERSATION.OPEN, {
                conversationId: conv._id,
            });
        }

        socket.on(
            SOCKET_CONSTANT.CONVERSATION.OPEN,
            ({ success, conversationId }) => {
                SetJoin(success);
            }
        );

        socket.on(SOCKET_CONSTANT.CONVERSATION.CLOSE, ({ success }) => {
            SetJoin(success);
        });

        socket.on(
            SOCKET_CONSTANT.MESSAGE.SENT,
            ({ message, member }: { message: IMessage; member: IMember }) => {
                SetMessages((m) => [
                    { ...message, member },
                    ...m.filter((ms) => ms._id !== message._id),
                ]);
            }
        );
    }, [socket, conversation, conv]);

    if (!conversation || !me) {
        return <></>;
    }

    return (
        <div
            className="w-full h-full box-border px-4 py-4 flex flex-col-reverse gap-1 overflow-auto"
            onScroll={handleScroll}
        >
            {messages.map((message, index) => (
                <MemberMessage
                    message={message}
                    meId={me._id}
                    isLink={
                        index < messages.length &&
                        messages[index + 1] &&
                        messages[index + 1].member._id === message.member._id
                    }
                    key={message._id}
                />
            ))}
            {loading && canScroll && (
                <div className="flex items-center justify-center w-full h-fit py-5">
                    <div className="flex gap-1 h-fit items-center">
                        <LoaderIcon className="animate-spin w-4 h-4" />
                        <p className="text-sm">Đang tải thêm</p>
                    </div>
                </div>
            )}
        </div>
    );
}

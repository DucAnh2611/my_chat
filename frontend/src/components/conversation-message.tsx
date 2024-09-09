import { conversationMessage } from "@/api/action/message";
import { SOCKET_CONSTANT } from "@/constant/socket";
import useConversation from "@/hook/useConversation";
import useSocket from "@/hook/useSocket";
import useUser from "@/hook/useUser";
import { IConversationDetail } from "@/interface/conversation";
import { IMember } from "@/interface/member";
import { IMessage } from "@/interface/message";
import { isTimeDifferenceMoreThanXMinutes } from "@/lib/time";
import dayjs from "dayjs";
import { ArrowDown, LoaderIcon } from "lucide-react";
import { Fragment, UIEvent, useEffect, useRef, useState } from "react";
import MemberMessage from "./member-message";
import { Button } from "./ui/button";

export default function ConversationMessage() {
    const { conversation } = useConversation();
    const { me } = useUser();
    const { socket, isConnected } = useSocket();
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const [conv, SetConv] = useState<IConversationDetail>();
    const [messages, SetMessages] = useState<IMessage[]>([]);
    const [loading, SetLoading] = useState<boolean>(false);
    const [join, SetJoin] = useState<boolean>(false);
    const [skip, SetSkip] = useState<number>(0);
    const [canScroll, SetCanScroll] = useState<boolean>(true);
    const [isScrollUp, SetIsScrollUp] = useState<boolean>(false);

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
                SetCanScroll(true);
            } else if (!items.length) {
                SetCanScroll(false);
            }
        }

        SetLoading(false);
    };

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;

        if (
            -target.scrollTop + target.clientHeight >=
                target.scrollHeight * 0.95 &&
            !loading &&
            canScroll
        ) {
            SetSkip(messages.length);
        }

        if (-target.scrollTop <= 200) {
            SetIsScrollUp(false);
        } else {
            SetIsScrollUp(true);
        }
    };

    const handleClickScrollBottom = () => {
        SetIsScrollUp(false);
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
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
        if (!isConnected || !socket) return;

        if (conv) {
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

        return () => {
            if (conversation && conv) {
                socket.emit(SOCKET_CONSTANT.CONVERSATION.CLOSE, {
                    conversationId: conv._id,
                });
            }
            socket.off(SOCKET_CONSTANT.CONVERSATION.OPEN);
            socket.off(SOCKET_CONSTANT.CONVERSATION.CLOSE);
            socket.off(SOCKET_CONSTANT.MESSAGE.SENT);
        };
    }, [isConnected, socket, conversation, conv]);

    if (!conversation || !me) {
        return <></>;
    }

    return (
        <>
            <div
                ref={scrollRef}
                className="w-full h-full box-border px-2 py-2 tablet:p-[4px_4px] flex flex-col-reverse gap-1 overflow-auto relative scroll-smooth"
                onScroll={handleScroll}
                onTouchMove={handleScroll}
            >
                {messages.map((message, index) => (
                    <Fragment key={message._id}>
                        <MemberMessage
                            message={message}
                            meId={me._id}
                            isLink={
                                messages[index + 1] &&
                                messages[index + 1].member._id ===
                                    message.member._id &&
                                !isTimeDifferenceMoreThanXMinutes(
                                    messages[index + 1].sentAt,
                                    message.sentAt,
                                    15
                                )
                            }
                            key={message._id}
                        />
                        {messages[index + 1] &&
                        isTimeDifferenceMoreThanXMinutes(
                            messages[index + 1].sentAt,
                            message.sentAt,
                            15
                        ) ? (
                            <p className="w-full text-xs text-muted-foreground text-center my-3">
                                {dayjs(message.sentAt).format(
                                    dayjs(message.sentAt).isSame(
                                        dayjs(new Date()),
                                        "date"
                                    )
                                        ? "HH:mm A"
                                        : "dddd, MMMM D, YYYY h:mm A"
                                )}
                            </p>
                        ) : (
                            <></>
                        )}
                    </Fragment>
                ))}
                {loading && (
                    <div className="flex items-center justify-center w-full h-fit py-5">
                        <div className="flex gap-1 h-fit items-center">
                            <LoaderIcon className="animate-spin w-4 h-4" />
                            <p className="text-sm">Đang tải</p>
                        </div>
                    </div>
                )}
            </div>
            {isScrollUp && (
                <div className="absolute right-5 bottom-5 z-10">
                    <Button
                        onClick={handleClickScrollBottom}
                        variant="default"
                        size="icon"
                        className="rounded-full shadow-xl"
                    >
                        <ArrowDown size={15} />
                    </Button>
                </div>
            )}
        </>
    );
}

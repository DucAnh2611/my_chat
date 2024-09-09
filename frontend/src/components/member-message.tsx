import { joinApiUrl } from "@/constant/api";
import useConversation from "@/hook/useConversation";
import { IMessage } from "@/interface/message";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { Reply, SmilePlus } from "lucide-react";
import { MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import WebpagePreview from "./webpage-preview";

interface IMemerMessageProps {
    message: IMessage;
    meId: string;
    isLink: boolean;
}

interface Position {
    x: number;
    y: number;
}

const URL_REGEX = /(https?:\/\/[^\s]*)/g;

export default function MemberMessage({
    message,
    meId,
    isLink,
}: IMemerMessageProps) {
    const { conversation, setReply } = useConversation();
    const dragRef = useRef<HTMLDivElement | null>(null);

    const [foundLinks, setFoundLinks] = useState<string[]>([]);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startPosition, setStartPosition] = useState<Position>({
        x: 0,
        y: 0,
    });

    const handleMouseDown = (
        e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
    ) => {
        setIsDragging(true);

        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        setStartPosition({ x: clientX, y: 0 });
    };

    const handleMouseMove =
        (side: "r" | "l") =>
        (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
            if (isDragging) {
                const clientX =
                    "touches" in e ? e.touches[0].clientX : e.clientX;
                const maxDrag = 100 * (side === "l" ? -1 : 1);
                const dx = clientX - startPosition.x;

                if (side === "l" && dx < 0) {
                    setPosition({ x: dx < maxDrag ? maxDrag : dx, y: 0 });
                } else if (side === "r" && dx > 0) {
                    setPosition({ x: dx > maxDrag ? maxDrag : dx, y: 0 });
                }
            }
        };

    const handleMouseUp = (message: IMessage) => () => {
        if (isDragging) {
            const dragDistance = Math.abs(position.x);

            if (dragDistance >= 30) {
                setReply(message);
            }

            setPosition({ x: 0, y: 0 });
            setIsDragging(false);
        }
    };

    const checkForLinks = (inputText: string) => {
        const links = inputText.match(URL_REGEX) || [];
        setFoundLinks(links);
    };

    const handleClickReply = (message: IMessage) => () => {
        setReply(message);
    };

    useEffect(() => {
        checkForLinks(message.text);
    }, [message]);

    const isMeSent = meId === message.member.user._id;

    if (!conversation) return <></>;

    const { theme } = conversation.configs;

    return (
        <div className={cn(isLink ? "" : "mt-2")}>
            {!isLink && !isMeSent && (
                <div className={cn("w-full flex gap-2")}>
                    <div className="w-8" />
                    <p className="text-[10px] text-muted-foreground">
                        {message.member.nickname}
                    </p>
                </div>
            )}
            <div
                className={cn(
                    "w-full flex gap-2 items-start group",
                    isMeSent ? "flex-row-reverse" : "flex-row"
                )}
            >
                {!isMeSent && (
                    <div
                        className={cn(
                            "relative h-auto flex items-end justify-end"
                        )}
                    >
                        <div className="w-8 h-8">
                            <Avatar
                                className={cn(
                                    "w-full h-full",
                                    isLink ? "invisible" : "visible"
                                )}
                            >
                                <AvatarImage
                                    src={joinApiUrl(
                                        "media",
                                        message.member.user.avatar || ""
                                    )}
                                />
                                <AvatarFallback>
                                    {message.member.nickname
                                        .charAt(0)
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                )}
                <div
                    ref={dragRef}
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px)`,
                    }}
                    className={cn(
                        "flex flex-col gap-0.5 w-fit max-w-[60%] max-tablet:max-w-[80%]",
                        isMeSent ? "items-end" : "items-start"
                    )}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove(isMeSent ? "l" : "r")}
                    onMouseUp={handleMouseUp(message)}
                    onMouseLeave={handleMouseUp(message)}
                    onTouchStart={handleMouseDown}
                    onTouchMove={handleMouseMove(isMeSent ? "l" : "r")}
                    onTouchEnd={handleMouseUp(message)}
                >
                    {!!message.reply && (
                        <div
                            className={cn(
                                "flex flex-col group/reply mt-1 max-w-[80%]",
                                isMeSent ? "items-end" : "items-start"
                            )}
                        >
                            <div className="flex gap-1 items-center mb-0.5">
                                <Reply size={10} />
                                <p className="text-[10px] text-muted-foreground">
                                    Đã trả lời{" "}
                                </p>
                            </div>
                            <div
                                style={{
                                    background: `${
                                        isMeSent
                                            ? theme.sender.primary
                                            : theme.receiver.primary
                                    }`,
                                }}
                                className={cn(
                                    "rounded-xl box-border p-2 opacity-60 flex flex-col items-center justify-start gap-1",
                                    isMeSent ? "rounded-br-sm" : "rounded-bl-sm"
                                )}
                            >
                                <div className="w-full flex gap-1 items-center  ">
                                    <div className="w-5 h-5">
                                        <Avatar className={cn("w-full h-full")}>
                                            <AvatarImage
                                                src={joinApiUrl(
                                                    "media",
                                                    message.reply.member.user
                                                        .avatar || ""
                                                )}
                                            />
                                            <AvatarFallback className="text-[10px]">
                                                {message.reply.member.nickname
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <p
                                        style={{
                                            color: `${
                                                isMeSent
                                                    ? theme.sender.text
                                                    : theme.receiver.text
                                            }`,
                                        }}
                                        className={cn("text-xs")}
                                    >
                                        {message.reply.member.nickname}
                                    </p>
                                </div>
                                <div
                                    className={cn(
                                        "w-full bg-muted box-border p-1 rounded-sm"
                                    )}
                                >
                                    <p className="text-xs line-clamp-3 whitespace-pre-wrap group-hover/reply:line-clamp-none ">
                                        {message.reply.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger asChild>
                                <div
                                    className={cn(
                                        "flex w-fit gap-2",
                                        !isMeSent
                                            ? "justify-end flex-row-reverse"
                                            : "justify-start flex-row"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "invisible gap-0 flex items-center laptop:group-hover:visible",
                                            isMeSent
                                                ? "justify-end flex-row-reverse"
                                                : "justify-start flex-row"
                                        )}
                                    >
                                        <Button
                                            className="rounded-full w-fit h-fit !p-1.5 text-muted-foreground hover:primary"
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <SmilePlus size={15} />
                                        </Button>
                                        <Button
                                            className="rounded-full w-fit h-fit !p-1.5 text-muted-foreground hover:primary"
                                            size="icon"
                                            variant="ghost"
                                            onClick={handleClickReply(message)}
                                        >
                                            <Reply size={15} />
                                        </Button>
                                    </div>
                                    <div
                                        className={cn(
                                            "flex flex-col gap-0.5 w-fit",
                                            isMeSent
                                                ? "items-end"
                                                : "items-start"
                                        )}
                                    >
                                        <p
                                            style={
                                                isMeSent
                                                    ? {
                                                          background:
                                                              theme.sender
                                                                  .primary,
                                                          borderColor:
                                                              theme.sender
                                                                  .border,
                                                          color: theme.sender
                                                              .text,
                                                      }
                                                    : {
                                                          background:
                                                              theme.receiver
                                                                  .primary,
                                                          borderColor:
                                                              theme.receiver
                                                                  .border,
                                                          color: theme.receiver
                                                              .text,
                                                      }
                                            }
                                            className={cn(
                                                "text-sm font-normal w-fit rounded-xl border px-2 py-1 whitespace-pre-wrap break-words overflow-hidden",
                                                isMeSent
                                                    ? "rounded-r-sm"
                                                    : "rounded-l-sm",
                                                message.reply
                                                    ? isMeSent
                                                        ? "rounded-l-md"
                                                        : "rounded-r-md"
                                                    : ""
                                            )}
                                        >
                                            {message.text}
                                        </p>
                                        {foundLinks.length !== 0 && (
                                            <div
                                                className={cn(
                                                    "w-fit h-fit flex flex-col gap-0.5 pb-2",
                                                    isMeSent
                                                        ? "items-end"
                                                        : "items-start"
                                                )}
                                            >
                                                {foundLinks.map(
                                                    (link: string) => (
                                                        <div
                                                            key={link}
                                                            className="w-fit h-auto max-w-[400px]"
                                                        >
                                                            <a
                                                                href={link}
                                                                className="text-xs text-muted-foreground hover:underline"
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                <WebpagePreview
                                                                    url={link}
                                                                />
                                                            </a>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="left" align="center">
                                <p className="w-fit whitespace-nowrap text-xs group-hover:block hidden duration-50">
                                    {dayjs(new Date(message.sentAt)).format(
                                        "HH:mm:ss A, MM/DD/YYYY"
                                    )}
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    );
}

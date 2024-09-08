import { joinApiUrl } from "@/constant/api";
import useConversation from "@/hook/useConversation";
import { IMessage } from "@/interface/message";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import WebpagePreview from "./webpage-preview";

interface IMemerMessageProps {
    message: IMessage;
    meId: string;
    isLink: boolean;
}
const URL_REGEX = /(https?:\/\/[^\s]*)/g;

export default function MemberMessage({
    message,
    meId,
    isLink,
}: IMemerMessageProps) {
    const [foundLinks, setFoundLinks] = useState<string[]>([]);
    const { conversation } = useConversation();

    const checkForLinks = (inputText: string) => {
        const links = inputText.match(URL_REGEX) || [];
        setFoundLinks(links);
    };

    useEffect(() => {
        checkForLinks(message.text);
    }, [message]);

    const isMeSent = meId === message.member.user._id;

    if (!conversation) return <></>;

    const { theme } = conversation.configs;

    return (
        <div
            className={cn(
                "w-full flex gap-2 items-start group",
                isMeSent ? "flex-row-reverse" : "flex-row",
                isLink ? "" : "mt-2"
            )}
        >
            {!isMeSent && (
                <div
                    className={cn(
                        "relative h-auto  flex items-end justify-end"
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
                className={cn(
                    "flex flex-col gap-0.5 w-fit max-w-[60%] max-tablet:max-w-[60%]",
                    isMeSent ? "items-end" : "items-start"
                )}
            >
                <p
                    style={
                        isMeSent
                            ? {
                                  background: theme.sender.primary,
                                  borderColor: theme.sender.border,
                                  color: theme.sender.text,
                              }
                            : {
                                  background: theme.receiver.primary,
                                  borderColor: theme.receiver.border,
                                  color: theme.receiver.text,
                              }
                    }
                    className={cn(
                        "text-sm font-normal w-fit rounded-md border px-2 py-1 whitespace-pre-wrap break-words overflow-hidden"
                    )}
                >
                    {message.text}
                </p>
                {foundLinks.length !== 0 && (
                    <div
                        className={cn(
                            "w-fit h-fit flex flex-col gap-0.5 pb-2",
                            isMeSent ? "items-end" : "items-start"
                        )}
                    >
                        {foundLinks.map((link: string) => (
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
                                    <WebpagePreview url={link} />
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex items-center text-muted-foreground h-full">
                <p className="w-fit whitespace-nowrap text-xs group-hover:block hidden duration-50">
                    {dayjs(new Date(message.sentAt)).format(
                        "HH:mm:ss A, MM/DD/YYYY"
                    )}
                </p>
            </div>
        </div>
    );
}

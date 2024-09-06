import { joinApiUrl } from "@/constant/api";
import { IMessage } from "@/interface/message";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface IMemerMessageProps {
    message: IMessage;
    meId: string;
    isLink: boolean;
}

export default function MemberMessage({
    message,
    meId,
    isLink,
}: IMemerMessageProps) {
    const isMeSent = meId === message.member.user._id;
    return (
        <div
            className={cn(
                "w-full flex gap-2 items-start group",
                isMeSent ? "flex-row-reverse" : "flex-row"
            )}
        >
            <div className={cn("relative h-auto  flex items-end justify-end")}>
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
                            {message.member.nickname.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div
                className={cn(
                    "flex flex-col gap-1 items-start w-fit max-w-[70%]",
                    isMeSent ? "justify-start" : "justify-end"
                )}
            >
                <p
                    className={cn(
                        "text-sm font-normal w-fit rounded-md border px-2 py-1 whitespace-pre-wrap break-words overflow-hidden",
                        isMeSent
                            ? "bg-primary border-transparent text-background"
                            : "bg-background border-muted text-foreground"
                    )}
                >
                    {message.text}
                </p>
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

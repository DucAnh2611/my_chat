import { listConversation } from "@/api/action/conversation";
import { joinApiUrl } from "@/constant/api";
import useConversation from "@/hook/useConversation";
import useNav from "@/hook/useNav";
import useUser from "@/hook/userUser";
import { IConversationWithLastestMessage } from "@/interface/conversation";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogCreateConversation from "./dialog-create-conversation";
import DialogLogout from "./dialog-logut";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import UserCard from "./user-card";

export default function ConversationList() {
    const navigate = useNavigate();

    const { me } = useUser();
    const { open: openNav, setOpen } = useNav();

    const { conversation } = useConversation();
    const [list, SetList] = useState<Array<IConversationWithLastestMessage>>(
        []
    );
    const [page, SetPage] = useState<number>(1);

    const onViewConversation =
        (conversationId: string, changeOpenNav: boolean = false) =>
        () => {
            if (openNav && changeOpenNav) setOpen(false);

            navigate(`/${conversationId}`);
        };

    const getList = async (page: number) => {
        const call = await listConversation(page);

        if (call.success && call.result) {
            SetList(call.result.items);
        }
    };

    //pagination for future scale
    const onScroll = () => {
        //update stuff: page, limit base on counts items
    };

    useEffect(() => {
        getList(page);
    }, [page]);

    if (!openNav) return <></>;

    return (
        <div
            className={cn(
                "w-full h-full bg-background tablet:bg-transparent flex flex-col gap-3 laptop-md:w-[400px] tablet:w-[250px] laptop:w-[330px] ",
                openNav ? "max-tablet" : ""
            )}
        >
            {me && (
                <div className="w-full h-fit flex gap-2">
                    <div className="flex-1 h-fit">
                        <UserCard user={me} />
                    </div>
                    <Card className="w-20 h-20 aspect-square flex flex-col gap-1 box-border p-1">
                        {me.isMe && <DialogCreateConversation />}
                        <DialogLogout />
                    </Card>
                </div>
            )}
            <Card
                className={cn(
                    "flex-1 w-full overflow-auto box-border p-2 flex-col gap-2 hidden tablet:flex"
                )}
            >
                {list.map((item) => (
                    <Button
                        key={item._id}
                        variant={"ghost"}
                        className={cn(
                            "w-full hover:bg rounded-sm p-3 box-border h-fit",
                            conversation && conversation._id === item._id
                                ? "bg-accent"
                                : ""
                        )}
                        onClick={onViewConversation(item._id)}
                    >
                        <div className="flex gap-3 items-start justify-start flex-1 overflow-hidden w-full">
                            <div>
                                <Avatar>
                                    <Avatar className="w-full aspect-square">
                                        <AvatarImage
                                            src={joinApiUrl(
                                                "media",
                                                item.image || ""
                                            )}
                                        />
                                        <AvatarFallback className="bg-primary text-background">
                                            {item.name.charAt(0) || "G"}
                                        </AvatarFallback>
                                    </Avatar>
                                </Avatar>
                            </div>
                            <div className="flex-1 overflow-hidden text-left flex flex-col justify-center">
                                <p className="w-full line-clamp-1 whitespace-nowrap text-sm font-medium">
                                    {item.name}
                                </p>

                                {item.lastestMessage ? (
                                    <div className="flex gap-2 w-full items-center">
                                        <p className="flex-1 overflow-hidden line-clamp-1 whitespace-nowrap text-xs font-light text-muted-foreground">
                                            {`${item.lastestMessage.member.nickname}: ${item.lastestMessage.text}`}
                                        </p>
                                        <p className="w-fit whitespace-nowrap text-xs text-foreground">
                                            {dayjs(
                                                new Date(
                                                    item.lastestMessage.sentAt
                                                )
                                            ).format(
                                                `HH:mm ${
                                                    dayjs(
                                                        new Date(
                                                            item.lastestMessage.sentAt
                                                        )
                                                    ).isSame(
                                                        dayjs(new Date()),
                                                        "date"
                                                    )
                                                        ? ""
                                                        : "MM/DD/YYYY"
                                                }`
                                            )}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="w-full whitespace-nowrap text-xs text-muted-foreground">
                                        Không có tin nhắn mới
                                    </p>
                                )}
                            </div>
                        </div>
                    </Button>
                ))}
            </Card>
            <Card
                className={cn(
                    "flex-1 w-full overflow-auto box-border p-2 flex flex-col gap-2 tablet:hidden "
                )}
            >
                {list.map((item) => (
                    <Button
                        key={item._id}
                        variant={"ghost"}
                        className={cn(
                            "w-full hover:bg rounded-sm p-3 box-border h-fit",
                            conversation && conversation._id === item._id
                                ? "bg-accent"
                                : ""
                        )}
                        onClick={onViewConversation(item._id, true)}
                    >
                        <div className="flex gap-3 items-start justify-start flex-1 overflow-hidden w-full">
                            <div>
                                <Avatar>
                                    <Avatar className="w-full aspect-square">
                                        <AvatarImage
                                            src={joinApiUrl(
                                                "media",
                                                item.image || ""
                                            )}
                                        />
                                        <AvatarFallback className="bg-primary text-background">
                                            {item.name.charAt(0) || "G"}
                                        </AvatarFallback>
                                    </Avatar>
                                </Avatar>
                            </div>
                            <div className="flex-1 overflow-hidden text-left flex flex-col justify-center">
                                <p className="w-full line-clamp-1 whitespace-nowrap text-sm font-medium">
                                    {item.name}
                                </p>

                                {item.lastestMessage ? (
                                    <div className="flex gap-2 w-full items-center">
                                        <p className="flex-1 overflow-hidden line-clamp-1 whitespace-nowrap text-xs font-light text-muted-foreground">
                                            {`${item.lastestMessage.member.nickname}: ${item.lastestMessage.text}`}
                                        </p>
                                        <p className="w-fit whitespace-nowrap text-xs text-foreground">
                                            {dayjs(
                                                new Date(
                                                    item.lastestMessage.sentAt
                                                )
                                            ).format(
                                                `HH:mm ${
                                                    dayjs(
                                                        new Date(
                                                            item.lastestMessage.sentAt
                                                        )
                                                    ).isSame(
                                                        dayjs(new Date()),
                                                        "date"
                                                    )
                                                        ? ""
                                                        : "MM/DD/YYYY"
                                                }`
                                            )}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="w-full whitespace-nowrap text-xs text-muted-foreground">
                                        Không có tin nhắn mới
                                    </p>
                                )}
                            </div>
                        </div>
                    </Button>
                ))}
            </Card>
        </div>
    );
}

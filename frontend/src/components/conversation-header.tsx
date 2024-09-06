import { joinApiUrl } from "@/constant/api";
import useConversation from "@/hook/useConversation";
import useNav from "@/hook/useNav";
import { CircleEllipsis, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function ConversationHeader() {
    const { open, setOpen } = useNav();
    const { conversation, setOpenSetting, openSetting } = useConversation();

    const toggleOpenSetting = () => {
        setOpenSetting(!openSetting);
    };

    const toggleOpen = () => {
        setOpen(!open);
    };

    if (!conversation) return <></>;

    return (
        <div className="border-b w-full h-[60px] box-border px-3 flex justify-between items-center">
            <div className="flex gap-3 items-center justify-start flex-1 overflow-hidden h-auto">
                <div>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full"
                        onClick={toggleOpen}
                    >
                        {!open ? (
                            <PanelLeftOpen size={18} />
                        ) : (
                            <PanelLeftClose size={18} />
                        )}
                    </Button>
                </div>
                <div>
                    <Avatar>
                        <Avatar className="w-full aspect-square">
                            <AvatarImage
                                src={joinApiUrl(
                                    "media",
                                    conversation.image || ""
                                )}
                            />
                            <AvatarFallback>
                                {conversation.name.charAt(0) || "G"}
                            </AvatarFallback>
                        </Avatar>
                    </Avatar>
                </div>
                <div className="w-full">
                    <p className="w-full whitespace-nowrap text-base font-medium">
                        {conversation.name}
                    </p>
                </div>
            </div>
            <div>
                <Button
                    size="icon"
                    variant="ghost"
                    className="text-primary rounded-full group/b-f gap-2 "
                    onClick={toggleOpenSetting}
                >
                    <CircleEllipsis size={15} />
                </Button>
            </div>
        </div>
    );
}

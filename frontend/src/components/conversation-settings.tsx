import useConversation from "@/hook/useConversation";
import { LoaderIcon, Settings, X } from "lucide-react";
import { Button } from "./ui/button";

export default function ConversationSetting() {
    const { openSetting, conversation, setOpenSetting } = useConversation();

    const onClose = () => {
        setOpenSetting(false);
    };

    if (!openSetting || !conversation) return <></>;

    return (
        <div className="w-[350px] h-full border-l flex flex-col">
            <div className="border-b w-full h-[60px] box-border px-5 flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <Settings size={18} />
                    <p className="font-medium text-base">Cài đặt</p>
                </div>
                <div>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="text-primary rounded-full group/b-f gap-2"
                        onClick={onClose}
                    >
                        <X size={15} />
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-center w-full flex-1">
                <div className="flex gap-1 h-fit">
                    <LoaderIcon className="animate-spin w-4 h-4" />
                    <p className="text-sm">Coming soon</p>
                </div>
            </div>
        </div>
    );
}

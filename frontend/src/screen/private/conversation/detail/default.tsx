import { Button } from "@/components/ui/button";
import useNav from "@/hook/useNav";
import useUser from "@/hook/userUser";

export default function ConversationDetailDefaultScreen() {
    const { me } = useUser();
    const { open, setOpen } = useNav();
    return (
        <div className="w-full h-full flex items-center justify-center flex-col gap-2">
            <p className="font-bold uppercase text-3xl">Hello!</p>
            <div>
                <Button
                    size="sm"
                    variant="default"
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    {!open
                        ? "Mở danh sách cuộc trò chuyện"
                        : "Tắt danh sách cuộc trò chuyện"}
                </Button>
            </div>
        </div>
    );
}

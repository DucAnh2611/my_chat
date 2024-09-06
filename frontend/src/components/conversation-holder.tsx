import ConversationProvider from "@/context/conversation.context";
import useNav from "@/hook/useNav";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import ConversationList from "./conversation-list";
import { Card } from "./ui/card";

interface IConversationHolder {
    children: ReactNode;
}

export default function ConversationHolder({ children }: IConversationHolder) {
    const { open } = useNav();
    return (
        <div className="w-full h-full">
            <ConversationProvider>
                <div className="flex overflow-hidden w-full h-full gap-3">
                    <ConversationList />
                    <Card
                        className={cn(
                            "flex-1 h-full overflow-hidden",
                            open ? "max-tablet:hidden" : ""
                        )}
                    >
                        {children}
                    </Card>
                </div>
            </ConversationProvider>
        </div>
    );
}

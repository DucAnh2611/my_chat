import ConversationHolder from "@/components/conversation-holder";
import NavProvider from "@/context/nav.context";
import withAuth from "@/HOC/withAuth";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="w-full h-full flex items-center justify-center box-border p-1 tablet:p-2 laptop-md:p-3">
            <div className="w-full h-full desktop:w-[1920px]">
                <NavProvider>
                    <ConversationHolder>
                        <Outlet />
                    </ConversationHolder>
                </NavProvider>
            </div>
        </div>
    );
}

const PrivateLayout = withAuth(Layout);
export default PrivateLayout;

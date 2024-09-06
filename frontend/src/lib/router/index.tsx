import AuthLayout from "@/screen/auth/layout";
import { LoginSceen } from "@/screen/auth/login";
import ConversationDetailScreen from "@/screen/private/conversation/detail";
import ConversationDetailDefaultScreen from "@/screen/private/conversation/detail/default";
import PrivateLayout from "@/screen/private/layout";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        element: <PrivateLayout />,
        children: [
            {
                path: "/",
                element: <ConversationDetailDefaultScreen />,
            },
            {
                path: "/:id",
                element: <ConversationDetailScreen />,
            },
        ],
    },
    {
        element: <AuthLayout />,
        children: [{ path: "/login", element: <LoginSceen /> }],
    },
]);

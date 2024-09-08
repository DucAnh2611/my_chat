import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import SocketProvider from "./context/socket.context";
import UserProvider from "./context/user.context";
import { router } from "./lib/router";

function App() {
    return (
        <SocketProvider>
            <UserProvider>
                <div className="w-[100dvw] h-[100dvh] font-sans">
                    <RouterProvider router={router} />
                </div>
                <Toaster />
            </UserProvider>
        </SocketProvider>
    );
}

export default App;

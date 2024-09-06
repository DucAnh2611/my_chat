import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import SocketProvider from "./context/socket.context";
import UserProvider from "./context/user.context";
import { router } from "./lib/router";

function App() {
    return (
        <SocketProvider>
            <UserProvider>
                <div className="w-screen h-screen font-sans">
                    <RouterProvider router={router} />
                    <Toaster />
                </div>
            </UserProvider>
        </SocketProvider>
    );
}

export default App;

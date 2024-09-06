import { AppConfigs } from "@/config/app";
import { createContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

export default function SocketProvider({ children }: { children: ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance = io(AppConfigs.api.url);
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

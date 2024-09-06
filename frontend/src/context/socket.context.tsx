import { AppConfigs } from "@/config/app";
import { createContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

export default function SocketProvider({ children }: { children: ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        let socketInstance: Socket | null = null;
        let reconnectInterval: NodeJS.Timeout | null = null;

        const connectSocket = () => {
            const socketInstance = io(AppConfigs.api.url, {
                reconnectionAttempts: 5,
                reconnectionDelay: 3000,
            });
            setSocket(socketInstance);

            socketInstance.on("connect", () => {
                console.log("Connected to the socket");
                if (reconnectInterval) {
                    clearInterval(reconnectInterval);
                    reconnectInterval = null;
                }
            });

            socketInstance.on("disconnect", () => {
                console.log("Disconnected from the socket");
                attemptReconnect();
            });

            socketInstance.on("connect_error", (err) => {
                console.log("Socket connection error:", err);
                attemptReconnect();
            });
        };

        const attemptReconnect = () => {
            if (!reconnectInterval) {
                reconnectInterval = setInterval(() => {
                    console.log("Attempting to reconnect...");
                    connectSocket(); // Try reconnecting
                }, 5000); // Retry every 5 seconds
            }
        };

        connectSocket();

        return () => {
            if (socketInstance) {
                socketInstance.disconnect();
            }
            if (reconnectInterval) {
                clearInterval(reconnectInterval);
            }
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

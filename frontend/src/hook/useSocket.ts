import { SocketContext } from "@/context/socket.context";
import { useContext } from "react";

const useSocket = () => {
    return useContext(SocketContext);
};

export default useSocket;

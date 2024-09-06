import { UserContext } from "@/context/user.context";
import { useContext } from "react";

export default function useUser() {
    return useContext(UserContext);
}

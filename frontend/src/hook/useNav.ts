import { NavContext } from "@/context/nav.context";
import { useContext } from "react";

export default function useNav() {
    return useContext(NavContext);
}

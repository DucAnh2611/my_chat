import { createContext, ReactNode, useState } from "react";

interface INavContextProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const NavContext = createContext<INavContextProps>({
    open: true,
    setOpen: (open: boolean) => {},
});

export default function NavProvider({ children }: { children: ReactNode }) {
    const [open, SetOpen] = useState<boolean>(true);

    const setOpen = (open: boolean) => {
        SetOpen(open);
    };

    const value: INavContextProps = {
        open,
        setOpen,
    };
    return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

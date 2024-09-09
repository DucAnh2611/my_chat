import { getMe } from "@/api/action/user";
import { IUser } from "@/interface/user";
import { getLocalStorage } from "@/lib/str";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface IUserContext {
    isAuth: boolean;
    token: string | undefined;
    me: IUser | undefined;
    setIsAuth: (auth: boolean) => void;
}

export const UserContext = createContext<IUserContext>({
    isAuth: false,
    token: undefined,
    me: undefined,
    setIsAuth: (auth: boolean) => {},
});

export default function UserProvider({ children }: { children: ReactNode }) {
    const [isAuth, SetIsAuth] = useState<boolean>(false);
    const [token, SetToken] = useState<string | undefined>();
    const [me, SetMe] = useState<IUser>();

    const getUserInfo = async () => {
        const localstorage = getLocalStorage();

        if (localstorage && !me) {
            const me = await getMe();

            if (me.success && me.result) {
                const m = me.result;
                SetMe({ ...m, isMe: Boolean(JSON.parse(`${m.isMe}`)) });
                SetToken(localstorage);
                SetIsAuth(true);
            }
        }
    };

    const setIsAuth = (auth: boolean) => {
        if (!auth) {
            SetToken(undefined);
            SetMe(undefined);
        }
        SetIsAuth(auth);
    };

    useEffect(() => {
        if (!isAuth || (isAuth && !me)) {
            getUserInfo();
        }
    }, [isAuth]);

    return (
        <UserContext.Provider value={{ isAuth, token, me, setIsAuth }}>
            {children}
        </UserContext.Provider>
    );
}

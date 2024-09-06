import { getMe } from "@/api/action/user";
import { IUser } from "@/interface/user";
import { getLocalStorage } from "@/lib/str";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface IUserContext {
    isAuth: boolean;
    token: string | undefined;
    me: IUser | undefined;
}

export const UserContext = createContext<IUserContext>({
    isAuth: false,
    token: undefined,
    me: undefined,
});

export default function UserProvider({ children }: { children: ReactNode }) {
    const [isAuth, SetIsAuth] = useState<boolean>(false);
    const [token, SetToken] = useState<string | undefined>();
    const [me, SetMe] = useState<IUser>();

    const getUserInfo = async () => {
        const localstorage = getLocalStorage();

        if (localstorage && !me) {
            SetIsAuth(true);

            const me = await getMe();

            if (me.success && me.result) {
                const m = me.result;
                SetMe({ ...m, isMe: Boolean(JSON.parse(`${m.isMe}`)) });
                SetToken(localstorage);
            }
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <UserContext.Provider value={{ isAuth, token, me }}>
            {children}
        </UserContext.Provider>
    );
}

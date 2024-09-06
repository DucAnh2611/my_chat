import { AppConfigs } from "@/config/app";

export const setLocalStorage = (data: any) => {
    localStorage.setItem(AppConfigs.storage.local, data);
};
export const clearLocalStorage = () => {
    localStorage.removeItem(AppConfigs.storage.local);
};

export const getLocalStorage = () => {
    const str = localStorage.getItem(AppConfigs.storage.local);
    if (!str) {
        return;
    }

    return str;
};

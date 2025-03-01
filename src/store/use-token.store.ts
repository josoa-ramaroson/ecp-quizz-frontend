import { ITokenState } from "@/interfaces";
import { create } from "zustand";

export const useTokenStore = create<ITokenState>((set, get) => ({
    accessToken: null,
    clearAccessToken: () =>{ 
        set({ accessToken: null });
    },
    setAccessToken: (token) => {
        set({ accessToken: token });
    },
    getAccessToken: () => get().accessToken,
}))
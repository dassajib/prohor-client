import { create } from "zustand"

import { UserAuthState } from "@/interface/userInterface"

export const useAuthStore = create<UserAuthState>((set) => ({
    token: localStorage.getItem("access_token"),
    setToken: (token: string) => {
        localStorage.setItem("access_token", token)
        set({ token })
    },
    logOut: () => {
        localStorage.removeItem("access_token")
        set({ token: null })
    }
}))
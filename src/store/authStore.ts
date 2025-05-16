// src/store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set, get) => ({
            token: null,
            setToken: (token: any) => set({ token }),
            clearToken: () => set({ token: null }),
            // getter derivado
            get isAuthenticated() {
                return !!(get() as { token: string | null }).token;
            },
        }),
        {
            name: "auth-storage", // la key en localStorage/sessionStorage
            storage: {
                getItem: (name: string) => {
                    const str = localStorage.getItem(name);
                    return str ? JSON.parse(str) : null;
                },
                setItem: (name: string, value: any) => {
                    localStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name: string) => localStorage.removeItem(name)
            },
            partialize: (state: { token: string | null }) => ({ token: state.token }),
        }
    )
);

export default useAuthStore;

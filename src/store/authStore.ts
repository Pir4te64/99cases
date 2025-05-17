// src/store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { API } from "@/utils/Api";
const useAuthStore = create(
    persist(
        (set, get) => ({
            token: null,

            setToken: (token: any) => set({ token }),

            // logout ahora limpia el token en el store y borra TODO localStorage
            clearToken: () => {
                set({ token: null });
                localStorage.clear();
            },

            get isAuthenticated() {
                return !!get().token;
            },

            getMe: async () => {
                let { token } = get();

                // Hidratamos token si aún no existe en el store
                if (!token) {
                    const raw = localStorage.getItem("auth-storage");
                    if (raw) {
                        try {
                            const parsed = JSON.parse(raw);
                            token = parsed.state?.token ?? parsed.token;
                            if (token) set({ token });
                        } catch { }
                    }
                }

                if (!token) {
                    console.warn("getMe: no hay token almacenado");
                    return null;
                }

                try {
                    const response = await axios.get(API.getMe, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    // Guardamos el email en localStorage
                    const email = response.data.email;
                    if (email) {
                        localStorage.setItem("userEmail", email);
                    }

                    return response.data;
                } catch (error) {
                    if (error.response) {
                        console.error(
                            `getMe error: status ${error.response.status}`,
                            error.response.data
                        );
                    } else {
                        console.error("getMe error:", error.message);
                    }
                    return null;
                }
            },
        }),
        {
            name: "auth-storage",
            storage: {
                getItem: (name) => {
                    const str = localStorage.getItem(name);
                    return str ? JSON.parse(str) : null;
                },
                setItem: (name, value) =>
                    localStorage.setItem(name, JSON.stringify(value)),
                removeItem: (name) => localStorage.removeItem(name),
            },
            partialize: (state: {
                [x: string]: any; token?: string
            }) => ({ token: state.token }),
        }
    )
);

export default useAuthStore;

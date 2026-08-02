import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/api/axios";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: ({ user, token }) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      refreshUser: async () => {
        const token = get().token;

        if (!token) return;

        try {
          const res = await api.get("/auth/me");

          set({
            user: res.data.user,
            isAuthenticated: true,
          });
        } catch (err) {
          console.error(err);

          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);

export default useAuthStore;
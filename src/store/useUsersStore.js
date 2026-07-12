import { create } from "zustand";
import { fetchUsersApi, promoteUserApi , demoteUserApi } from "@/api/admin/users";
const useUsersStore = create((set, get) => ({
  users: [],
  isLoading: false,
  isUpdatingId: null,
  error: null,
  searchQuery: "",
  roleFilter: "all",

  setSearchQuery: (q) => set({ searchQuery: q }),
  setRoleFilter: (r) => set({ roleFilter: r }),

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchUsersApi();
      set({ users: data.data ?? [], isLoading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || "Failed to load users",
        isLoading: false,
      });
    }
  },

  promoteUser: async (userId) => {
    const prevUsers = get().users;
    set({
      isUpdatingId: userId,
      users: prevUsers.map((u) =>
        u._id === userId ? { ...u, role: "project_manager" } : u
      ),
    });
    try {
      await promoteUserApi(userId);
      set({ isUpdatingId: null });
    } catch (err) {
      set({
        users: prevUsers,
        isUpdatingId: null,
        error: err?.response?.data?.message || "Failed to promote user",
      });
    }
  },

  demoteUser: async (userId) => {
  const prevUsers = get().users;

  set({
    isUpdatingId: userId,
    users: prevUsers.map((u) =>
      u._id === userId
        ? { ...u, role: "member" }
        : u
    ),
  });

  try {
    await demoteUserApi(userId);

    set({
      isUpdatingId: null,
    });
  } catch (err) {
    set({
      users: prevUsers,
      isUpdatingId: null,
      error:
        err?.response?.data?.message ||
        "Failed to demote user",
    });
  }
},
}));

export default useUsersStore;
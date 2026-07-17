"use client";

import { create } from "zustand";
import api from "@/api/axios";
import { getUsers } from "@/api/userApi";

const useUserStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,

  // Fetch all users
  fetchUsers: async () => {
    try {
      set({ loading: true });

      const res = await getUsers();

      set({
        users: res.data, // <-- IMPORTANT
        loading: false,
        error: null,
      });
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message,
      });
    }
  },

  // Fetch single user
  fetchUserById: async (id) => {
    try {
      set({ loading: true, error: null });

      const res = await api.get(`/users/${id}`);

      set({
        user: res.data.data,
        loading: false,
      });

      return res.data.data;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to fetch user",
      });

      return null;
    }
  },

  updateUser: async (id, data) => {
    try {
      set({ loading: true });

      const res = await api.put(`/users/${id}`, data);

      const updatedUser = res.data.data;

      set({
        users: get().users.map((user) =>
          user._id === id ? updatedUser : user,
        ),
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to update user",
      });

      return false;
    }
  },

  promoteUser: async (id) => {
    try {
      set({ loading: true });

      const res = await api.put(`/users/${id}/promote`);

      const updatedUser = res.data.data;

      set({
        users: get().users.map((user) =>
          user._id === id ? { ...user, role: updatedUser.role } : user,
        ),
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Promotion failed",
      });

      return false;
    }
  },

  demoteUser: async (id) => {
    try {
      set({ loading: true });

      const res = await api.put(`/users/${id}/demote`);

      const updatedUser = res.data.data;

      set({
        users: get().users.map((user) =>
          user._id === id ? { ...user, role: updatedUser.role } : user,
        ),
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Demotion failed",
      });

      return false;
    }
  },

  deleteUser: async (id) => {
    try {
      set({ loading: true });

      await api.delete(`/users/${id}`);

      set({
        users: get().users.filter((user) => user._id !== id),
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Delete failed",
      });

      return false;
    }
  },

  clearUser: () => {
    set({ user: null });
  },
}));

export default useUserStore;

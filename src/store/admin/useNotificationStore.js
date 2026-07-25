import { create } from "zustand";
import {
  fetchNotificationsApi,
  fetchUnreadCountApi,
  markAsReadApi,
  markAllAsReadApi,
  deleteNotificationApi,
} from "@/api/admin/notification";

const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  isNotificationOpen: false,
  setIsNotificationOpen: (isOpen) => set({ isNotificationOpen: isOpen }),

  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchNotificationsApi();
      set({
        notifications: data.data ?? [],
        unreadCount: data.unreadCount ?? 0,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err?.response?.data?.message || "Failed to load notifications",
        isLoading: false,
      });
    }
  },

  fetchUnreadCount: async () => {
    try {
      const data = await fetchUnreadCountApi();
      set({ unreadCount: data.unreadCount ?? 0 });
    } catch (err) {
      // silent fail for unread count
    }
  },

  markAsRead: async (id) => {
    const prevNotifications = get().notifications;
    const prevUnreadCount = get().unreadCount;

    // Optimistic update
    set({
      notifications: prevNotifications.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: Math.max(0, prevUnreadCount - 1),
    });

    try {
      await markAsReadApi(id);
    } catch (err) {
      // Revert on failure
      set({
        notifications: prevNotifications,
        unreadCount: prevUnreadCount,
        error: err?.response?.data?.message || "Failed to mark as read",
      });
    }
  },

  markAllAsRead: async () => {
    const prevNotifications = get().notifications;
    const prevUnreadCount = get().unreadCount;

    // Optimistic update
    set({
      notifications: prevNotifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    });

    try {
      await markAllAsReadApi();
    } catch (err) {
      set({
        notifications: prevNotifications,
        unreadCount: prevUnreadCount,
        error: err?.response?.data?.message || "Failed to mark all as read",
      });
    }
  },

  deleteNotification: async (id) => {
    const prevNotifications = get().notifications;
    const prevUnreadCount = get().unreadCount;
    const notification = prevNotifications.find((n) => n._id === id);

    // Optimistic update
    set({
      notifications: prevNotifications.filter((n) => n._id !== id),
      unreadCount:
        notification && !notification.isRead
          ? Math.max(0, prevUnreadCount - 1)
          : prevUnreadCount,
    });

    try {
      await deleteNotificationApi(id);
    } catch (err) {
      set({
        notifications: prevNotifications,
        unreadCount: prevUnreadCount,
        error: err?.response?.data?.message || "Failed to delete notification",
      });
    }
  },
}));

export default useNotificationStore;

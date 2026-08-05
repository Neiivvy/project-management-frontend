"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCheckDouble, FaTrash, FaFilter, FaBellSlash } from "react-icons/fa";

import useNotificationStore from "@/store/admin/useNotificationStore";
import NotificationItem from "@/components/dashboard/NotificationItem";

export default function AdminNotificationsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("all"); // 'all' | 'unread'

  const {
    notifications,
    unreadCount,
    isLoading,
    fetchNotifications,
    markAllAsRead,
    deleteNotification,
  } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  const handleNavigate = (notification) => {
    if (notification.relatedEntityType === "project") {
      router.push(`/admin/projects/${notification.relatedEntityId}`);
    } else if (notification.relatedEntityType === "task") {
      router.push(`/project-manager/tasks/${notification.relatedEntityId}`);
    } else if (notification.relatedEntityType === "user") {
      router.push(`/admin/users/${notification.relatedEntityId}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#181d19]">
            Notifications
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
              : "You're all caught up!"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Filter */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === "all"
                  ? "bg-[#1a7a4c] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === "unread"
                  ? "bg-[#c9a000] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Unread
            </button>
          </div>

          {/* Mark all as read */}
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[#1a7a4c] hover:bg-[#1a7a4c]/5 transition"
            >
              <FaCheckDouble className="text-sm" />
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#0f5238] border-t-transparent" />
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-400 mb-3">
              <FaBellSlash className="text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-slate-700">
              {filter === "unread" ? "No unread notifications" : "No notifications"}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {filter === "unread"
                ? "You've read all your notifications"
                : "You don't have any notifications yet"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredNotifications.map((notification) => (
              <div
                key={notification._id}
                className="p-3 sm:p-4 hover:bg-slate-50 transition"
              >
                <NotificationItem
                  notification={notification}
                  onNavigate={handleNavigate}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

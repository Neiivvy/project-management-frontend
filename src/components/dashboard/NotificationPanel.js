"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaCheckDouble, FaExternalLinkAlt, FaBellSlash } from "react-icons/fa";

import useNotificationStore from "@/store/admin/useNotificationStore";
import NotificationItem from "./NotificationItem";

export default function NotificationPanel() {
  const router = useRouter();
  const panelRef = useRef(null);

  const {
    notifications,
    unreadCount,
    isLoading,
    isNotificationOpen,
    setIsNotificationOpen,
    fetchNotifications,
    markAllAsRead,
  } = useNotificationStore();

  useEffect(() => {
    if (isNotificationOpen) {
      fetchNotifications();
    }
  }, [isNotificationOpen, fetchNotifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen, setIsNotificationOpen]);

  const handleViewAll = () => {
    setIsNotificationOpen(false);
    router.push("/admin/notifications");
  };

  const handleNavigate = (notification) => {
    setIsNotificationOpen(false);

    if (notification.relatedEntityType === "project") {
      router.push(`/admin/projects/${notification.relatedEntityId}`);
    } else if (notification.relatedEntityType === "task") {
      router.push(`/project-manager/tasks/${notification.relatedEntityId}`);
    } else if (notification.relatedEntityType === "user") {
      router.push(`/admin/users/${notification.relatedEntityId}`);
    }
  };

  if (!isNotificationOpen) return null;

  const recentNotifications = notifications.slice(0, 5);

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-3 w-96 max-h-112 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 p-4">
        <div>
          <h3 className="text-sm font-semibold text-[#181d19]">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <p className="text-xs text-slate-500">
              {unreadCount} unread
            </p>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 text-xs font-medium text-[#0f5238] hover:text-[#0a3d2a] transition"
          >
            <FaCheckDouble className="text-sm" />
            Mark all read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="overflow-y-auto max-h-80 p-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#0f5238] border-t-transparent" />
          </div>
        ) : recentNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 mb-2">
              <FaBellSlash className="text-xl" />
            </div>
            <p className="text-sm text-slate-500">No notifications yet</p>
            <p className="text-xs text-slate-400 mt-1">
              {"You're all caught up!"}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentNotifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                onNavigate={handleNavigate}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="border-t border-slate-100 p-3">
          <button
            onClick={handleViewAll}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-[#0f5238] hover:bg-[#0f5238]/5 transition"
          >
            View all notifications
            <FaExternalLinkAlt className="text-xs" />
          </button>
        </div>
      )}
    </div>
  );
}

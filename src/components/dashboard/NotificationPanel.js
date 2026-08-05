"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FaCheckDouble,
  FaExternalLinkAlt,
  FaBellSlash,
} from "react-icons/fa";

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
    <>
      {/* Mobile backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 sm:hidden"
        onClick={() => setIsNotificationOpen(false)}
      />

      {/* Notification Panel */}
      <div
        ref={panelRef}
        className="
          fixed left-0 right-0 bottom-0 top-20 z-50
          flex flex-col
          rounded-t-3xl
          bg-white
          shadow-2xl
          overflow-hidden

          sm:absolute
          sm:left-auto
          sm:right-0
          sm:top-[calc(100%+12px)]
          sm:bottom-auto
          sm:w-95
          sm:max-h-130
          sm:rounded-2xl
          sm:border
          sm:border-slate-200
          sm:shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        "
      >
        {/* Desktop Arrow */}
        <div className="hidden sm:block absolute -top-2 right-6 h-4 w-4 rotate-45 border-l border-t border-slate-200 bg-white" />

        {/* Mobile Handle */}
        <div className="flex justify-center py-3 sm:hidden">
          <div className="h-1.5 w-12 rounded-full bg-slate-300" />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-100 bg-white p-4">
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
              <span className="hidden sm:inline">
                Mark all read
              </span>
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="flex-1 overflow-y-auto p-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#0f5238] border-t-transparent" />
            </div>
          ) : recentNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                <FaBellSlash className="text-xl" />
              </div>

              <p className="text-sm text-slate-500">
                No notifications yet
              </p>

              <p className="mt-1 text-xs text-slate-400">
                You&apos;re all caught up!
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
          <div className="border-t border-slate-100 bg-white p-3">
            <button
              onClick={handleViewAll}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-[#0f5238] transition hover:bg-[#0f5238]/5"
            >
              View all notifications
              <FaExternalLinkAlt className="text-xs" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
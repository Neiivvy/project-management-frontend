"use client";

import {
  FaTrash,
  FaCheckCircle,
  FaClipboardList,
  FaComment,
  FaUserPlus,
  FaFolder,
  FaCheck,
  FaArrowUp,
  FaBell,
} from "react-icons/fa";
import useNotificationStore from "@/store/admin/useNotificationStore";

const TYPE_CONFIG = {
  task_assigned: {
    icon: FaClipboardList,
    label: "Task Assigned",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    iconColor: "text-blue-500",
  },
  task_commented: {
    icon: FaComment,
    label: "Task Comment",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    text: "text-cyan-700",
    iconColor: "text-cyan-500",
  },
  project_member_added: {
    icon: FaUserPlus,
    label: "Member Added",
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    iconColor: "text-purple-500",
  },
  project_created: {
    icon: FaFolder,
    label: "Project Created",
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    iconColor: "text-green-500",
  },
  task_status_updated: {
    icon: FaCheck,
    label: "Task Updated",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    iconColor: "text-amber-500",
  },
  user_promoted: {
    icon: FaArrowUp,
    label: "Role Updated",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-700",
    iconColor: "text-indigo-500",
  },
};

const DEFAULT_CONFIG = {
  icon: FaBell,
  label: "Notification",
  bg: "bg-slate-50",
  border: "border-slate-200",
  text: "text-slate-700",
  iconColor: "text-slate-500",
};

export default function NotificationItem({ notification, onNavigate }) {
  const { markAsRead, deleteNotification } = useNotificationStore();
  const config = TYPE_CONFIG[notification.type] || DEFAULT_CONFIG;

  const Icon = config.icon;

  const handleClick = async () => {
    if (!notification.isRead) {
      await markAsRead(notification._id);
    }
    if (onNavigate && notification.relatedEntityType && notification.relatedEntityId) {
      onNavigate(notification);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    await deleteNotification(notification._id);
  };

  const timeAgo = (date) => {
    const now = new Date();
    const then = new Date(date);
    const diff = Math.floor((now - then) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return then.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative flex gap-2 sm:gap-3 rounded-xl border p-2 sm:p-3 transition-all cursor-pointer ${
        notification.isRead
          ? "bg-white border-slate-100 hover:border-slate-200"
          : `${config.bg} ${config.border}`
      }`}
    >
      {/* Icon */}
      <div
        className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg ${
          notification.isRead ? "bg-slate-100" : config.bg
        }`}
      >
        <Icon
          className={`text-base sm:text-lg ${notification.isRead ? "text-slate-400" : config.iconColor}`}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p
              className={`text-xs sm:text-sm font-medium truncate ${
                notification.isRead ? "text-slate-600" : config.text
              }`}
            >
              {notification.title}
            </p>

            {notification.message && (
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 hidden sm:block">
                {notification.message}
              </p>
            )}

            <p className="text-xs text-slate-400 mt-0.5 sm:mt-1">
              {timeAgo(notification.createdAt)}
            </p>
          </div>

          {/* Unread indicator */}
          {!notification.isRead && (
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#0f5238]" />
          )}
        </div>
      </div>

      {/* Actions - hover on desktop, hidden on mobile to keep layout clean */}
      <div className="hidden sm:flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!notification.isRead && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              markAsRead(notification._id);
            }}
            className="p-1.5 rounded-lg hover:bg-green-100 text-green-600 transition"
            title="Mark as read"
          >
            <FaCheckCircle className="text-sm" />
          </button>
        )}

        <button
          onClick={handleDelete}
          className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition"
          title="Delete"
        >
          <FaTrash className="text-sm" />
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from "@/api/notifications";

import {
  FaBell,
  FaTasks,
  FaClock,
  FaComment,
  FaProjectDiagram,
  FaCheck,
  FaTrash,
} from "react-icons/fa";

const notificationIcons = {
  task_assigned: FaTasks,
  deadline_updated: FaClock,
  comment_added: FaComment,
  project_updated: FaProjectDiagram,
};

const notificationColors = {
  task_assigned: {
    bg: "bg-blue-50",
    icon: "bg-blue-100 text-blue-600",
  },

  deadline_updated: {
    bg: "bg-orange-50",
    icon: "bg-orange-100 text-orange-600",
  },

  comment_added: {
    bg: "bg-purple-50",
    icon: "bg-purple-100 text-purple-600",
  },

  project_updated: {
    bg: "bg-green-50",
    icon: "bg-green-100 text-green-600",
  },
};

export default function MemberNotificationsPage() {
  const router = useRouter();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getNotifications();

      setNotifications(res.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load notifications"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleRead = async (notification) => {
    if (!notification.read) {
      try {
        await markNotificationRead(notification._id);

        setNotifications((current) =>
          current.map((item) =>
            item._id === notification._id
              ? { ...item, read: true }
              : item
          )
        );
      } catch (err) {
        console.error(err);
      }
    }

    if (
      notification.relatedEntityType === "task" &&
      notification.relatedEntityId
    ) {
      router.push(
        `/member/tasks/${notification.relatedEntityId}`
      );
    }
  };

  const handleReadAll = async () => {
    try {
      await markAllNotificationsRead();

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to mark notifications as read"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);

      setNotifications((current) =>
        current.filter(
          (notification) =>
            notification._id !== id
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to delete notification"
      );
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <main className="min-h-screen bg-[#eef5f0] p-6 md:p-8">

      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div
          className="
            mb-7
            flex
            flex-col
            gap-4
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#dff0e5]
                  text-[#2d6a4f]
                "
              >
                <FaBell size={19} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-[#18251e]">
                  Notifications
                </h1>

                <p className="mt-1 text-sm text-[#718078]">
                  Stay updated with your projects and tasks
                </p>
              </div>

            </div>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleReadAll}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#2d6a4f]
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-[#24583f]
                hover:shadow-md
              "
            >
              <FaCheck size={12} />
              Mark all as read
            </button>
          )}
        </div>

        {/* Unread count */}
        {!loading && !error && (
          <div
            className="
              mb-5
              rounded-2xl
              border
              border-[#d6e5db]
              bg-white
              px-5
              py-4
              shadow-sm
            "
          >
            <p className="text-sm text-[#5f7067]">
              You have{" "}
              <span className="font-bold text-[#2d6a4f]">
                {unreadCount}
              </span>{" "}
              unread notification
              {unreadCount !== 1 ? "s" : ""}.
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div
            className="
              rounded-2xl
              border
              border-[#dce8df]
              bg-white
              p-10
              text-center
              shadow-sm
            "
          >
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#dce8df] border-t-[#2d6a4f]" />

            <p className="mt-4 text-sm text-[#718078]">
              Loading notifications...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className="
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-5
              py-4
            "
          >
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          notifications.length === 0 && (
            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-[#cbdacf]
                bg-white
                px-6
                py-14
                text-center
                shadow-sm
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-[#eaf5ee]
                  text-[#2d6a4f]
                "
              >
                <FaBell size={21} />
              </div>

              <h2 className="mt-4 font-semibold text-[#24352c]">
                No notifications yet
              </h2>

              <p className="mt-1 text-sm text-[#78867e]">
                New task, deadline, comment and project
                updates will appear here.
              </p>
            </div>
          )}

        {/* Notifications */}
        {!loading &&
          !error &&
          notifications.length > 0 && (
            <div className="space-y-3">

              {notifications.map((notification) => {
                const Icon =
                  notificationIcons[
                    notification.type
                  ] || FaBell;

                const colors =
                  notificationColors[
                    notification.type
                  ] || {
                    bg: "bg-gray-50",
                    icon: "bg-gray-100 text-gray-600",
                  };

                return (
                  <div
                    key={notification._id}
                    className={`
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-[#dce8df]
                      p-5
                      shadow-sm
                      transition-all
                      duration-200
                      hover:-translate-y-[1px]
                      hover:shadow-md
                      ${
                        notification.read
                          ? "bg-white"
                          : `${colors.bg}`
                      }
                    `}
                  >
                    {!notification.read && (
                      <span
                        className="
                          absolute
                          left-0
                          top-0
                          h-full
                          w-1
                          bg-[#2d6a4f]
                        "
                      />
                    )}

                    <div className="flex gap-4">

                      {/* Icon */}
                      <div
                        className={`
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          ${colors.icon}
                        `}
                      >
                        <Icon size={16} />
                      </div>

                      {/* Content */}
                      <button
                        onClick={() =>
                          handleRead(
                            notification
                          )
                        }
                        className="
                          min-w-0
                          flex-1
                          text-left
                        "
                      >
                        <div className="flex items-start justify-between gap-4">

                          <div>
                            <h3
                              className={`
                                text-sm
                                ${
                                  notification.read
                                    ? "font-semibold"
                                    : "font-bold"
                                }
                                text-[#18251e]
                              `}
                            >
                              {notification.title}
                            </h3>

                            <p className="mt-1 text-sm leading-5 text-[#617068]">
                              {notification.message}
                            </p>
                          </div>

                          {!notification.read && (
                            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#2d6a4f]" />
                          )}

                        </div>

                        <p className="mt-3 text-[11px] text-[#89958e]">
                          {new Date(
                            notification.createdAt
                          ).toLocaleString()}
                        </p>
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          handleDelete(
                            notification._id
                          )
                        }
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          text-[#9aa59f]
                          transition
                          hover:bg-red-50
                          hover:text-red-500
                        "
                        title="Delete notification"
                      >
                        <FaTrash size={12} />
                      </button>

                    </div>
                  </div>
                );
              })}

            </div>
          )}

      </div>
    </main>
  );
}
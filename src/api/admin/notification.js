import axiosInstance from "@/api/axios";

// GET all notifications for current user
export const fetchNotificationsApi = async ({ unreadOnly = false } = {}) => {
  const { data } = await axiosInstance.get("/notifications", {
    params: { unreadOnly: unreadOnly ? "true" : "false" },
  });
  return data;
};

// GET unread count
export const fetchUnreadCountApi = async () => {
  const { data } = await axiosInstance.get("/notifications/unread-count");
  return data;
};

// MARK single notification as read
export const markAsReadApi = async (id) => {
  const { data } = await axiosInstance.put(`/notifications/${id}/read`);
  return data;
};

// MARK all as read
export const markAllAsReadApi = async () => {
  const { data } = await axiosInstance.put("/notifications/read-all");
  return data;
};

// DELETE a notification
export const deleteNotificationApi = async (id) => {
  const { data } = await axiosInstance.delete(`/notifications/${id}`);
  return data;
};

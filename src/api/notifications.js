import api from "./axios";

export const getNotifications = () => {
  return api.get("/notifications");
};

export const markNotificationRead = (id) => {
  return api.put(`/notifications/${id}/read`);
};

export const markAllNotificationsRead = () => {
  return api.put("/notifications/read-all");
};

export const deleteNotification = (id) => {
  return api.delete(`/notifications/${id}`);
};
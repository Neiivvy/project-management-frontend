import { useEffect, useRef, useState, useCallback } from "react";

const POLL_INTERVAL = 20000; // 20s fallback poll; socket (if present) supersedes this

export function useNotifications({ apiBase = "/api/notifications", token, socket } = {}) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const pollRef = useRef(null);

  const authHeaders = useCallback(
    () => ({ Authorization: token ? `Bearer ${token}` : undefined }),
    [token]
  );

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch(`${apiBase}?limit=20`, { headers: authHeaders() });
      const data = await res.json();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      // fail quietly — the bell just won't update this cycle
      console.error("Failed to load notifications", err);
    } finally {
      setLoading(false);
    }
  }, [apiBase, authHeaders]);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await fetch(`${apiBase}/unread-count`, { headers: authHeaders() });
      const data = await res.json();
      setUnreadCount(data.count || 0);
    } catch (err) {
      console.error("Failed to poll unread count", err);
    }
  }, [apiBase, authHeaders]);

  const markRead = useCallback(
    async (id) => {
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
      try {
        await fetch(`${apiBase}/${id}/read`, { method: "PATCH", headers: authHeaders() });
      } catch (err) {
        console.error("Failed to mark notification read", err);
      }
    },
    [apiBase, authHeaders]
  );

  const markAllRead = useCallback(async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
    try {
      await fetch(`${apiBase}/read-all`, { method: "PATCH", headers: authHeaders() });
    } catch (err) {
      console.error("Failed to mark all notifications read", err);
    }
  }, [apiBase, authHeaders]);

  // initial load
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // live push via socket.io if a connected socket instance is passed in
  useEffect(() => {
    if (!socket) return;
    const onNew = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((c) => c + 1);
    };
    socket.on("notification:new", onNew);
    return () => socket.off("notification:new", onNew);
  }, [socket]);

  // fallback polling when there's no socket — keeps the badge honest either way
  useEffect(() => {
    if (socket) return;
    pollRef.current = setInterval(fetchUnreadCount, POLL_INTERVAL);
    return () => clearInterval(pollRef.current);
  }, [socket, fetchUnreadCount]);

  return { notifications, unreadCount, loading, markRead, markAllRead, refresh: fetchNotifications };
}
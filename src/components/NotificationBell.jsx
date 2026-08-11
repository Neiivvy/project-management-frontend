"use client";

import { useEffect, useRef, useState } from "react";
import { useNotifications } from "../hooks/useNotifications";

// One line per type: the spine color, the ticket-style tag, and the icon.
// Adding a 5th notification type later only means adding one row here.
const TYPE_META = {
  TASK_ASSIGNED: { tag: "TASK", spine: "#6366F1", bg: "#EEF0FE" },
  DEADLINE_UPDATED: { tag: "DEADLINE", spine: "#F59E0B", bg: "#FEF6E7" },
  COMMENT_ADDED: { tag: "COMMENT", spine: "#14B8A6", bg: "#E9FBF7" },
  PROJECT_UPDATED: { tag: "PROJECT", spine: "#8B5CF6", bg: "#F4EEFE" },
};

function relativeTime(dateString) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateString).toLocaleDateString();
}

function BellIcon({ ringing }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className={ringing ? "notif-bell-ring" : ""}
    >
      <path
        d="M12 3a5 5 0 0 0-5 5v2.7c0 .6-.2 1.2-.6 1.7L5 14.5c-.7.8-.1 2 1 2h12c1.1 0 1.7-1.2 1-2l-1.4-2.1a2.8 2.8 0 0 1-.6-1.7V8a5 5 0 0 0-5-5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 19a2.5 2.5 0 0 0 5 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NotificationRow({ notification, onRead }) {
  const meta = TYPE_META[notification.type] || TYPE_META.PROJECT_UPDATED;
  const content = (
    <div
      className="notif-row"
      style={{ "--spine": meta.spine, "--bg": meta.bg }}
      onClick={() => !notification.read && onRead(notification._id)}
    >
      <span className="notif-spine" />
      <div className="notif-row-body">
        <div className="notif-row-top">
          <span className="notif-tag" style={{ color: meta.spine, background: meta.bg }}>
            {meta.tag}
          </span>
          <span className="notif-time">{relativeTime(notification.createdAt)}</span>
        </div>
        <p className="notif-message">{notification.message}</p>
      </div>
      {!notification.read && <span className="notif-dot" aria-hidden="true" />}
    </div>
  );

  return notification.link ? (
    <a href={notification.link} className="notif-row-link">
      {content}
    </a>
  ) : (
    content
  );
}

export default function NotificationBell({ apiBase, token, socket }) {
  const { notifications, unreadCount, loading, markRead, markAllRead } = useNotifications({
    apiBase,
    token,
    socket,
  });
  const [open, setOpen] = useState(false);
  const [ringing, setRinging] = useState(false);
  const panelRef = useRef(null);
  const prevCount = useRef(unreadCount);

  // brief ring animation whenever unread count goes up
  useEffect(() => {
    if (unreadCount > prevCount.current) {
      setRinging(true);
      const t = setTimeout(() => setRinging(false), 700);
      return () => clearTimeout(t);
    }
    prevCount.current = unreadCount;
  }, [unreadCount]);

  // close on outside click
  useEffect(() => {
    function onClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const unread = notifications.filter((n) => !n.read);
  const earlier = notifications.filter((n) => n.read);

  return (
    <div className="notif-wrap" ref={panelRef}>
      <style>{STYLES}</style>

      <button
        type="button"
        className="notif-trigger"
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <BellIcon ringing={ringing} />
        {unreadCount > 0 && (
          <span className="notif-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>
        )}
      </button>

      {open && (
        <div className="notif-panel" role="menu">
          <div className="notif-panel-header">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <button type="button" className="notif-mark-all" onClick={markAllRead}>
                Mark all read
              </button>
            )}
          </div>

          <div className="notif-panel-list">
            {loading && <div className="notif-empty">Loading…</div>}

            {!loading && notifications.length === 0 && (
              <div className="notif-empty">
                <p className="notif-empty-title">All caught up</p>
                <p className="notif-empty-sub">New task, deadline, and comment updates will show up here.</p>
              </div>
            )}

            {unread.length > 0 && (
              <>
                <div className="notif-section-label">New</div>
                {unread.map((n) => (
                  <NotificationRow key={n._id} notification={n} onRead={markRead} />
                ))}
              </>
            )}

            {earlier.length > 0 && (
              <>
                <div className="notif-section-label">Earlier</div>
                {earlier.map((n) => (
                  <NotificationRow key={n._id} notification={n} onRead={markRead} />
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const STYLES = `
.notif-wrap { position: relative; display: inline-block; }

.notif-trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid #E5E7EB;
  background: #fff;
  color: #374151;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.notif-trigger:hover { background: #F9FAFB; border-color: #D1D5DB; }
.notif-trigger:focus-visible { outline: 2px solid #6366F1; outline-offset: 2px; }

.notif-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 999px;
  background: #EF4444;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  line-height: 18px;
  text-align: center;
  border: 2px solid #fff;
}

@keyframes notif-ring {
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(-14deg); }
  40% { transform: rotate(11deg); }
  60% { transform: rotate(-7deg); }
  80% { transform: rotate(4deg); }
}
.notif-bell-ring { animation: notif-ring 0.7s ease; transform-origin: top center; }

.notif-panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 360px;
  max-height: 480px;
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 14px;
  box-shadow: 0 12px 32px rgba(17, 24, 39, 0.12);
  overflow: hidden;
  z-index: 50;
}

.notif-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px 10px;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  border-bottom: 1px solid #F3F4F6;
}
.notif-mark-all {
  font-size: 12.5px;
  font-weight: 500;
  color: #6366F1;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.notif-mark-all:hover { text-decoration: underline; }

.notif-panel-list { overflow-y: auto; padding: 6px 0 10px; }

.notif-section-label {
  padding: 10px 16px 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #9CA3AF;
}

.notif-row-link { text-decoration: none; color: inherit; display: block; }

.notif-row {
  position: relative;
  display: flex;
  gap: 10px;
  padding: 10px 16px 10px 14px;
  cursor: pointer;
  transition: background 0.12s ease;
}
.notif-row:hover { background: #FAFAFA; }

.notif-spine {
  width: 3px;
  border-radius: 3px;
  background: var(--spine);
  flex-shrink: 0;
}

.notif-row-body { flex: 1; min-width: 0; }

.notif-row-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.notif-tag {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 2px 6px;
  border-radius: 5px;
}

.notif-time { font-size: 11.5px; color: #9CA3AF; flex-shrink: 0; }

.notif-message {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.4;
  color: #1F2937;
}

.notif-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #6366F1;
  flex-shrink: 0;
  margin-top: 5px;
}

.notif-empty {
  padding: 32px 20px;
  text-align: center;
}
.notif-empty-title { font-size: 13.5px; font-weight: 600; color: #374151; margin: 0 0 4px; }
.notif-empty-sub { font-size: 12.5px; color: #9CA3AF; margin: 0; }
`;
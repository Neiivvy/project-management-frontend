"use client";

import {
  FiFolder,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiMessageSquare,
} from "react-icons/fi";

const ACTIVITY_MAP = {
  project_created: {
    icon: FiFolder,
    color: "#0f5238",
    label: "Project Created",
  },
  project_updated: {
    icon: FiEdit2,
    color: "#2d6a4f",
    label: "Project Updated",
  },
  project_deleted: {
    icon: FiTrash2,
    color: "#dc2626",
    label: "Project Deleted",
  },
  task_created: {
    icon: FiCheckCircle,
    color: "#15803d",
    label: "Task Created",
  },
  task_updated: {
    icon: FiEdit2,
    color: "#2563eb",
    label: "Task Updated",
  },
  task_completed: {
    icon: FiCheckCircle,
    color: "#16a34a",
    label: "Task Completed",
  },
  member_added_to_project: {
    icon: FiUsers,
    color: "#0f766e",
    label: "Member Added",
  },
  member_removed_from_project: {
    icon: FiUserX,
    color: "#ea580c",
    label: "Member Removed",
  },
  user_promoted: {
    icon: FiUserCheck,
    color: "#b08900",
    label: "User Promoted",
  },
  user_demoted: {
    icon: FiUserX,
    color: "#b45309",
    label: "User Demoted",
  },
  comment_added: {
    icon: FiMessageSquare,
    color: "#7c3aed",
    label: "Comment Added",
  },
};

function formatTime(date) {
  const now = new Date();
  const created = new Date(date);

  const diff = Math.floor((now - created) / 1000);

  if (diff < 60) return "Just now";

  if (diff < 3600)
    return `${Math.floor(diff / 60)} min ago`;

  if (diff < 86400)
    return `${Math.floor(diff / 3600)} hr ago`;

  if (diff < 604800)
    return `${Math.floor(diff / 86400)} day${
      Math.floor(diff / 86400) > 1 ? "s" : ""
    } ago`;

  return created.toLocaleDateString();
}

export default function ActivityItem({ activity }) {
  const config =
    ACTIVITY_MAP[activity.action] || {
      icon: FiFolder,
      color: "#64748b",
      label: activity.action,
    };

  const Icon = config.icon;

  return (
    <div className="flex gap-4 px-5 py-4 hover:bg-[#fafcfb] transition-colors">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{
          backgroundColor: `${config.color}1a`,
          color: config.color,
        }}
      >
        <Icon size={18} />
      </div>

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-[#181d19]">
            {activity.userId?.name}
          </span>

          <span className="rounded-full bg-[#edf5ef] px-2 py-0.5 text-xs text-[#0f5238]">
            {activity.userId?.role?.replace("_", " ")}
          </span>
        </div>

        <p className="mt-1 text-sm font-medium text-[#181d19]">
          {config.label}
        </p>

        <p className="mt-1 text-sm text-[#697268]">
          {activity.description}
        </p>

        <p className="mt-2 text-xs text-[#98a19a]">
          {formatTime(activity.createdAt)}
        </p>
      </div>
    </div>
  );
}
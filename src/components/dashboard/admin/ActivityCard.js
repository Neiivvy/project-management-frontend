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
  FiClock,
} from "react-icons/fi";

const ACTIVITY_MAP = {
  project_created: {
    icon: FiFolder,
    color: "#0f5238",
    bgColor: "bg-[#0f5238]/10",
    label: "Project Created",
    tagColor: "bg-[#0f5238]/10 text-[#0f5238]",
  },
  project_updated: {
    icon: FiEdit2,
    color: "#2d6a4f",
    bgColor: "bg-[#2d6a4f]/10",
    label: "Project Updated",
    tagColor: "bg-[#2d6a4f]/10 text-[#2d6a4f]",
  },
  project_deleted: {
    icon: FiTrash2,
    color: "#dc2626",
    bgColor: "bg-red-50",
    label: "Project Deleted",
    tagColor: "bg-red-50 text-red-600",
  },
  task_created: {
    icon: FiCheckCircle,
    color: "#15803d",
    bgColor: "bg-[#15803d]/10",
    label: "Task Created",
    tagColor: "bg-[#15803d]/10 text-[#15803d]",
  },
  task_updated: {
    icon: FiEdit2,
    color: "#2563eb",
    bgColor: "bg-blue-50",
    label: "Task Updated",
    tagColor: "bg-blue-50 text-blue-600",
  },
  task_completed: {
    icon: FiCheckCircle,
    color: "#16a34a",
    bgColor: "bg-green-50",
    label: "Task Completed",
    tagColor: "bg-green-50 text-green-600",
  },
  member_added_to_project: {
    icon: FiUsers,
    color: "#0f766e",
    bgColor: "bg-teal-50",
    label: "Member Added",
    tagColor: "bg-teal-50 text-teal-600",
  },
  member_removed_from_project: {
    icon: FiUserX,
    color: "#ea580c",
    bgColor: "bg-orange-50",
    label: "Member Removed",
    tagColor: "bg-orange-50 text-orange-600",
  },
  user_promoted: {
    icon: FiUserCheck,
    color: "#b08900",
    bgColor: "bg-amber-50",
    label: "User Promoted",
    tagColor: "bg-amber-50 text-amber-600",
  },
  user_demoted: {
    icon: FiUserX,
    color: "#b45309",
    bgColor: "bg-orange-50",
    label: "User Demoted",
    tagColor: "bg-orange-50 text-orange-700",
  },
  comment_added: {
    icon: FiMessageSquare,
    color: "#7c3aed",
    bgColor: "bg-violet-50",
    label: "Comment Added",
    tagColor: "bg-violet-50 text-violet-600",
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

  return created.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: created.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_COLORS = [
  "bg-[#1a7a4c]", // Green
  "bg-[#c9a000]", // Yellow
  "bg-[#2563eb]", // Blue
  "bg-[#c2410c]", // Orange
  "bg-[#7c3aed]", // Purple
  "bg-[#800000]", // Maroon
  "bg-[#0d7377]", // Teal
];

function getAvatarColor(index = 0) {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

export default function ActivityCard({
  activity,
  isFirst,
  isLast,
  paletteIndex = 0,
}) {
  const config =
    ACTIVITY_MAP[activity.action] || {
      icon: FiFolder,
      color: "#64748b",
      bgColor: "bg-slate-50",
      label: activity.action,
      tagColor: "bg-slate-100 text-slate-600",
    };

  const Icon = config.icon;
 const avatarColor = getAvatarColor(paletteIndex);

  return (
    <div className="relative flex gap-4 group">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-4.75 top-10 bottom-0 w-px bg-linear-to-b from-[#e3e8e4] to-transparent" />
      )}

      {/* Timeline Dot */}
      <div className="relative z-10 shrink-0">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${config.bgColor} ring-4 ring-white group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon size={18} style={{ color: config.color }} />
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 min-w-0 pb-6">
        <div className="bg-white rounded-2xl border border-[#e3e8e4] shadow-sm p-5 hover:shadow-md hover:border-[#0f5238]/20 transition-all duration-300 group-hover:-translate-y-0.5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full ${avatarColor} text-white text-xs font-semibold`}
              >
                {getInitials(activity.userId?.name)}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-[#181d19] truncate">
                    {activity.userId?.name}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.tagColor}`}
                  >
                    {activity.userId?.role?.replace("_", " ")}
                  </span>
                </div>
                <p className="text-sm font-medium text-[#181d19] mt-1">
                  {config.label}
                </p>
              </div>
            </div>

            {/* Time Badge */}
            <div className="flex items-center gap-1 text-xs text-[#8a938c] shrink-0">
              <FiClock size={12} />
              <span>{formatTime(activity.createdAt)}</span>
            </div>
          </div>

          {/* Description */}
          {activity.description && (
            <p className="mt-3 text-sm text-[#697268] leading-relaxed">
              {activity.description}
            </p>
          )}

          {/* Action Tag */}
          <div className="mt-4 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${config.tagColor}`}
            >
              <Icon size={12} />
              {config.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

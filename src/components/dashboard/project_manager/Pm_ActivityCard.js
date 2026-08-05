"use client";

import {
  FiFolder,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiUsers,
  FiUserPlus,
  FiUserMinus,
  FiMessageSquare,
  FiClock,
  FiUserCheck,
  FiClipboard,
} from "react-icons/fi";

const ACTIVITY_MAP = {
  // Projects
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

  project_manager_changed: {
    icon: FiUserCheck,
    color: "#2563eb",
    bgColor: "bg-blue-50",
    label: "Project Manager Changed",
    tagColor: "bg-blue-50 text-blue-600",
  },

  // Tasks
  task_created: {
    icon: FiClipboard,
    color: "#15803d",
    bgColor: "bg-green-50",
    label: "Task Created",
    tagColor: "bg-green-50 text-green-700",
  },

  task_assigned: {
    icon: FiUserPlus,
    color: "#0d7377",
    bgColor: "bg-teal-50",
    label: "Task Assigned",
    tagColor: "bg-teal-50 text-teal-700",
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

  task_deleted: {
    icon: FiTrash2,
    color: "#dc2626",
    bgColor: "bg-red-50",
    label: "Task Deleted",
    tagColor: "bg-red-50 text-red-600",
  },

  // Members
  member_added_to_project: {
    icon: FiUsers,
    color: "#0f766e",
    bgColor: "bg-teal-50",
    label: "Member Added",
    tagColor: "bg-teal-50 text-teal-700",
  },

  member_removed_from_project: {
    icon: FiUserMinus,
    color: "#ea580c",
    bgColor: "bg-orange-50",
    label: "Member Removed",
    tagColor: "bg-orange-50 text-orange-600",
  },

  // Comments
  comment_added: {
    icon: FiMessageSquare,
    color: "#7c3aed",
    bgColor: "bg-violet-50",
    label: "Comment Added",
    tagColor: "bg-violet-50 text-violet-600",
  },

  comment_deleted: {
    icon: FiTrash2,
    color: "#dc2626",
    bgColor: "bg-red-50",
    label: "Comment Deleted",
    tagColor: "bg-red-50 text-red-600",
  },
};

function formatTime(date) {
  const now = new Date();
  const created = new Date(date);

  const seconds = Math.floor((now - created) / 1000);

  if (seconds < 60) {
    return "Just now";
  }

  if (seconds < 3600) {
    return `${Math.floor(seconds / 60)} min ago`;
  }

  if (seconds < 86400) {
    return `${Math.floor(seconds / 3600)} hr ago`;
  }

  if (seconds < 604800) {
    return `${Math.floor(seconds / 86400)} day ago`;
  }

  return created.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getInitials(name) {
  if (!name) return "?";

  return name
    .split(" ")
    .map((item) => item[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_COLORS = [
  "bg-[#1a7a4c]",
  "bg-[#c9a000]",
  "bg-[#2563eb]",
  "bg-[#c2410c]",
  "bg-[#7c3aed]",
  "bg-[#800000]",
  "bg-[#0d7377]",
];

function getAvatarColor(index = 0) {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

export default function ActivityCard({ activity, isLast, paletteIndex = 0 }) {
  const config = ACTIVITY_MAP[activity.action] || {
    icon: FiFolder,
    color: "#64748b",
    bgColor: "bg-slate-50",
    label: activity.action,
    tagColor: "bg-slate-100 text-slate-600",
  };

  const Icon = config.icon;

  return (
    <div className="relative flex gap-3 sm:gap-4 group">
      {/* Timeline */}
      {!isLast && (
        <div
          className="
            absolute left-3.5 sm:left-5 top-8 sm:top-10 bottom-0
            w-px
            bg-linear-to-b
            from-[#e3e8e4]
            to-transparent
          "
        />
      )}

      {/* Activity Icon */}
      <div className="relative z-10">
        <div
          className={`
            flex h-8 w-8 sm:h-10 sm:w-10
            items-center justify-center
            rounded-full
            ${config.bgColor}
            ring-2 sm:ring-4 ring-white
            transition
            group-hover:scale-110
          `}
        >
          <Icon
            size={16}
            style={{
              color: config.color,
            }}
          />
        </div>
      </div>

      {/* Activity Card */}
      <div className="flex-1 pb-4 sm:pb-5">
        <div
          className="
            rounded-2xl
            border
            border-[#e3e8e4]
            bg-white
            p-2 sm:p-3
            shadow-sm
            transition
            hover:shadow-md
          "
        >
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-3">
            {/* User Info */}
            <div className="flex gap-2 sm:gap-3">
              <div
                className={`
                  flex h-8 w-8 sm:h-9 sm:w-9
                  items-center justify-center
                  rounded-full
                  text-[10px] sm:text-xs
                  font-semibold
                  text-white
                  ${getAvatarColor(paletteIndex)}
                `}
              >
                {getInitials(activity.userId?.name)}
              </div>

              <div>
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="font-semibold text-[#181d19] text-sm sm:text-base">
                    {activity.userId?.name || "User"}
                  </span>

                  {activity.userId?.role && (
                    <span
                      className={`
                        rounded-full
                        px-1.5 py-0.5
                        text-[10px] sm:text-xs
                        ${config.tagColor}
                      `}
                    >
                      {activity.userId.role.replace("_", " ")}
                    </span>
                  )}
                </div>

                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-medium">{config.label}</p>
              </div>
            </div>

            {/* Time */}
            <div
              className="
                flex items-center gap-1
                text-[10px] sm:text-xs text-slate-400
                sm:shrink-0
              "
            >
              <FiClock size={12} />

              {formatTime(activity.createdAt)}
            </div>
          </div>

          {/* Description */}
          {activity.description && (
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
              {activity.description}
            </p>
          )}

          {/* Activity Tag */}
          <div className="mt-3 sm:mt-4">
            <span
              className={`
                inline-flex
                items-center
                gap-1.5 sm:gap-2
                rounded-lg
                px-2 sm:px-3
                py-1 sm:py-1.5
                text-[10px] sm:text-xs
                ${config.tagColor}
              `}
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

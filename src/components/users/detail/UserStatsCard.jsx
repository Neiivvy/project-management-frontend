"use client";

import { FolderOpen, ClipboardList, CheckCircle2, Clock } from "lucide-react";

const STATS = [
  { label: "Total Projects", icon: FolderOpen, color: "#0f5238", bgColor: "#e7f5ee" },
  { label: "Total Tasks", icon: ClipboardList, color: "#146c48", bgColor: "#e3f3ea" },
  { label: "Completed", icon: CheckCircle2, color: "#1d6d45", bgColor: "#e7f5ee" },
  { label: "Pending", icon: Clock, color: "#b3720b", bgColor: "#fdf3e4" },
];

export default function UserStatsCard({ stats, role }) {
  const { totalProjects = 0, totalTasks = 0, completedTasks = 0, pendingTasks = 0 } = stats || {};

  const displayStats =
    role === "project_manager"
      ? [
          { ...STATS[0], value: totalProjects },
          { ...STATS[2], value: completedTasks },
          { ...STATS[3], value: pendingTasks },
        ]
      : [
          { ...STATS[0], value: totalProjects },
          { ...STATS[1], value: totalTasks },
          { ...STATS[2], value: completedTasks },
          { ...STATS[3], value: pendingTasks },
        ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {displayStats.map((stat) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-2xl border border-[#d0e8dc] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8fbda7] hover:shadow-md"
        >
          <div
            className="absolute left-0 top-0 h-0.5 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ backgroundColor: stat.color }}
          />
          <div
            className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ backgroundColor: `${stat.color}15`, filter: "blur(20px)" }}
          />

          <div className="relative flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: stat.bgColor, color: stat.color }}
            >
              <stat.icon size={18} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-xl font-bold text-[#2f3a36]">{stat.value}</p>
              <p className="text-xs text-[#66756e]">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
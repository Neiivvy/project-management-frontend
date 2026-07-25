"use client";

import Link from "next/link";
import { Calendar, Flag, CheckCircle2 } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import TeamAvatarStack from "@/components/projects/TeamAvatarStack";

const PRIORITY_STYLES = {
  high: "text-red-600 bg-red-50",
  medium: "text-amber-600 bg-amber-50",
  low: "text-emerald-600 bg-emerald-50",
};

function formatDueDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function ProjectCard({ project, index = 0 }) {
  return (
    <Link
      href={`/admin/projects/${project.id}`}
      style={{ animationDelay: `${index * 45}ms` }}
      className="
        group
        relative
        flex
        animate-[fadeSlide_0.45s_ease-out_backwards]
        flex-col
        gap-4
        overflow-hidden
        rounded-2xl
        border border-[#dbe6e1]
        bg-[#f7fbf9]
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#8fbda7]
        hover:shadow-md
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-32
          w-32
          rounded-full
          bg-[#0f5238]/5
          blur-3xl
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-slate-400">
            {project.id}
          </p>

          <h3 className="truncate text-sm font-semibold text-[#181d19] transition-colors group-hover:text-[#0f5238]">
            {project.name}
          </h3>
        </div>

        {/* Progress percentage text instead of ring */}
        <span className="text-lg font-bold text-[#0f5238]">
          {project.progress}%
        </span>
      </div>

      <p className="relative line-clamp-2 text-xs leading-relaxed text-slate-500">
        {project.description}
      </p>

      <div className="relative flex items-center justify-between">
        <StatusBadge status={project.status} size="sm" />

        <span
          className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${PRIORITY_STYLES[project.priority] || "text-slate-500 bg-slate-50"}`}
        >
          <Flag size={11} />
        {project.priority
  ? project.priority[0].toUpperCase() + project.priority.slice(1)
  : "N/A"}
        </span>
      </div>

      <div className="relative flex items-center justify-between border-t border-slate-100 pt-3">
        <TeamAvatarStack team={project.team} />

        <div className="flex flex-col items-end gap-1">
          <span className="flex items-center gap-1 text-[11px] text-slate-500">
            <Calendar size={11} />
            {formatDueDate(project.dueDate)}
          </span>

          <span className="flex items-center gap-1 text-[11px] text-slate-500">
            <CheckCircle2 size={11} />
            {project.tasksDone}/{project.tasksTotal}
          </span>
        </div>
      </div>
    </Link>
  );
}

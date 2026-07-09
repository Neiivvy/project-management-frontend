"use client";

import Link from "next/link";
import { Calendar, Flag, CheckCircle2 } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import ProgressRing from "@/components/projects/ProgressRing";
import TeamAvatarStack from "@/components/projects/TeamAvatarStack";

const PRIORITY_STYLES = {
  high: "text-[#d95d39]",
  medium: "text-[#d4a017]",
  low: "text-[#40916c]",
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
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#8fbda7]
        hover:shadow-lg
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
          bg-[#8fbda7]/20
          blur-3xl
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-[#8a9892]">
            {project.id}
          </p>

          <h3 className="truncate text-sm font-semibold text-[#2f3a36] transition-colors group-hover:text-[#0f5238]">
            {project.name}
          </h3>
        </div>

        <ProgressRing progress={project.progress} />
      </div>

      <p className="relative line-clamp-2 text-xs leading-relaxed text-[#66756e]">
        {project.description}
      </p>

      <div className="relative flex items-center justify-between">
        <StatusBadge status={project.status} size="sm" />

        <span
          className={`flex items-center gap-1 text-[11px] font-medium ${PRIORITY_STYLES[project.priority]}`}
        >
          <Flag size={11} />
          {project.priority[0].toUpperCase() + project.priority.slice(1)}
        </span>
      </div>

      <div className="relative flex items-center justify-between border-t border-[#e6efeb] pt-3">
        <TeamAvatarStack team={project.team} />

        <div className="flex flex-col items-end gap-1">
          <span className="flex items-center gap-1 text-[11px] text-[#66756e]">
            <Calendar size={11} />
            {formatDueDate(project.dueDate)}
          </span>

          <span className="flex items-center gap-1 text-[11px] text-[#66756e]">
            <CheckCircle2 size={11} />
            {project.tasksDone}/{project.tasksTotal}
          </span>
        </div>
      </div>
    </Link>
  );
}
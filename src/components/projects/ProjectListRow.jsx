"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import ProgressRing from "@/components/projects/ProgressRing";
import TeamAvatarStack from "@/components/projects/TeamAvatarStack";

function formatDueDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function ProjectListRow({ project, index = 0 }) {
  return (
    <Link
      href={`/admin/projects/${project.id}`}
      style={{ animationDelay: `${index * 35}ms` }}
      className="
        group
        flex
        animate-[fadeSlide_0.4s_ease-out_backwards]
        items-center
        gap-4
        rounded-xl
        border border-slate-100
        bg-white
        p-3.5
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-slate-200
        hover:shadow-md
        sm:p-4
      "
    >
      <ProgressRing
        progress={project.progress}
        size={38}
        strokeWidth={3.5}
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-[#181d19] transition-colors group-hover:text-[#0f5238]">
          {project.name}
        </p>

        <p className="truncate text-xs text-slate-500">
          {project.manager}
        </p>
      </div>

      <div className="hidden sm:block">
        <TeamAvatarStack team={project.team} max={3} />
      </div>

      <span className="hidden items-center gap-1 whitespace-nowrap text-xs text-slate-500 md:flex">
        <Calendar size={12} />
        {formatDueDate(project.dueDate)}
      </span>

      <StatusBadge status={project.status} size="sm" />
    </Link>
  );
}

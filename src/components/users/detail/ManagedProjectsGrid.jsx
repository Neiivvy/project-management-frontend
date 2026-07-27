"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Avatar from "@/components/shared/Avatar";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const STATUS_STYLES = {
  planning: "bg-[#eef2f0] text-[#5b6b64]",
  active: "bg-[#eaf3fb] text-[#2563a8]",
  completed: "bg-[#e7f5ee] text-[#1d6d45]",
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "planning", label: "Planning" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

function ProjectCard({ project }) {
  return (
    <Link
      href={`/admin/projects/${project._id}`}
      className="group flex flex-col gap-3 rounded-2xl border border-[#e3ece8] bg-[#f5faf7] p-4
                 transition-all duration-300 ease-out
                 hover:-translate-y-1                  hover:border-[#b8d9c0] hover:bg-[#eef8f2] hover:shadow-[0_8px_24px_-8px_rgba(26,122,76,0.25)]
                 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-semibold text-[#2f3a36] transition-colors duration-300 group-hover:text-[#1d6d45]">
            {project.title}
          </h3>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[project.status] || STATUS_STYLES.planning}`}>
            {project.status}
          </span>
        </div>
        <p className="text-xs text-[#66756e]">Deadline: {formatDate(project.deadline)}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
       <div className="flex -space-x-2">
  {(project.teamMembers || []).slice(0, 4).map((member, index) => (
    <div
      key={member._id}
      className="rounded-full ring-2 ring-white transition-transform duration-300 group-hover:scale-105"
    >
      <Avatar
        name={member.name}
        size="sm"
        variant="dark"
        paletteIndex={index}
      />
    </div>
  ))}
</div>
        {project.teamMembers?.length > 4 && (
          <span className="text-xs text-[#6b7b74]">+{project.teamMembers.length - 4}</span>
        )}
        {(!project.teamMembers || project.teamMembers.length === 0) && (
          <span className="text-xs text-[#6b7b74]">No members yet</span>
        )}
      </div>
    </Link>
  );
}

export default function ManagedProjectsGrid({ projects }) {
  const [filter, setFilter] = useState("all");

  const counts = useMemo(() => {
    const c = { all: projects?.length || 0, planning: 0, active: 0, completed: 0 };
    (projects || []).forEach((p) => {
      if (c[p.status] !== undefined) c[p.status] += 1;
    });
    return c;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (filter === "all") return projects || [];
    return (projects || []).filter((p) => p.status === filter);
  }, [projects, filter]);

  if (!projects || projects.length === 0) {
    return (
      <div className="rounded-2xl border border-white/6 bg-white/1.5 p-8 text-center backdrop-blur-xl">
        <p className="text-sm text-[#6b7b74]">Not managing any project yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const isActive = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium
                          transition-colors duration-200
                          ${
                            isActive
                              ? "bg-[#1d6d45] text-white"
                              : "bg-[#eef2f0] text-[#5b6b64] hover:bg-[#e3ece8]"
                          }`}
            >
              {f.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                  isActive ? "bg-white/20 text-white" : "bg-white text-[#6b7b74]"
                }`}
              >
                {counts[f.key]}
              </span>
            </button>
          );
        })}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#e3ece8] p-6 text-center">
          <p className="text-xs text-[#8a9791]">No projects in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Avatar from "@/components/shared/Avatar";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const STATUS_STYLES = {
  planning: "bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1]/50",
  active: "bg-[#dbeafe] text-[#1e40af] border border-[#93c5fd]/40",
  completed: "bg-[#e7f5ee] text-[#166534] border border-[#86efac]/40",
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "planning", label: "Planning" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

// Distinct active-state color per filter: green, yellow, blue, parrot green
const FILTER_ACTIVE_STYLES = {
  all: "bg-gradient-to-r from-[#0f5238] to-[#1a7a4c] text-white shadow-sm shadow-[#0f5238]/30",
  planning: "bg-gradient-to-r from-[#ca8a04] to-[#eab308] text-white shadow-sm shadow-[#ca8a04]/30",
  active: "bg-gradient-to-r from-[#0369a1] to-[#0ea5e9] text-white shadow-sm shadow-[#0369a1]/30",
  completed: "bg-gradient-to-r from-[#65a30d] to-[#84cc16] text-white shadow-sm shadow-[#65a30d]/30",
};

function ProjectCard({ project }) {
  return (
    <Link
      href={`/admin/projects/${project._id}`}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-[#e3f1e9] bg-white p-4
                 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:border-[#40916c]/40 hover:shadow-[0_8px_24px_-8px_rgba(15,82,56,0.2)]
                 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="absolute left-0 top-0 h-full w-0 bg-linear-to-b from-[#0f5238] to-[#40916c] transition-all duration-300 group-hover:w-1" />

      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-semibold text-[#2f3a36] transition-colors duration-300 group-hover:text-[#0f5238]">
            {project.title}
          </h3>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[project.status] || STATUS_STYLES.planning}`}>
            {project.status}
          </span>
        </div>
        <p className="text-xs text-[#66756e]">Deadline: {formatDate(project.deadline)}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <div className="flex -space-x-2">
          {(project.teamMembers || []).slice(0, 4).map((member, idx) => (
            <div
              key={member._id}
              className="rounded-full ring-2 ring-white transition-transform duration-300 group-hover:scale-105"
            >
              <Avatar name={member.name} size="sm" variant="dark" paletteIndex={idx} />
            </div>
          ))}
        </div>
        {project.teamMembers?.length > 4 && (
          <span className="text-xs font-medium text-[#6b7b74]">+{project.teamMembers.length - 4}</span>
        )}
        {(!project.teamMembers || project.teamMembers.length === 0) && (
          <span className="text-xs text-[#6b7b74]">No members</span>
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
      <div className="rounded-2xl border border-dashed border-[#e3f1e9] bg-white/60 p-8 text-center">
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
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold
                          transition-all duration-200
                          ${
                            isActive
                              ? FILTER_ACTIVE_STYLES[f.key]
                              : "bg-white text-[#475569] hover:bg-[#eaf5ef]"
                          }`}
            >
              {f.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-[#f1f5f9] text-[#64748b]"
                }`}
              >
                {counts[f.key]}
              </span>
            </button>
          );
        })}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#e3f1e9] bg-[#fafcfb] p-8 text-center">
          <p className="text-sm text-[#6b7b74]">No projects in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
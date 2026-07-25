"use client";

import { FiFolder } from "react-icons/fi";

export default function ProjectSelector({
  projects = [],
  selectedProject,
  onSelect,
}) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#8b5cf6]/10 text-[#8b5cf6]">
          <FiFolder className="text-sm" />
        </div>
        <label className="text-sm font-semibold text-[#181d19]">
          Select Project Report
        </label>
      </div>

      <div className="relative">
        <select
          value={selectedProject || ""}
          onChange={(e) => onSelect(e.target.value)}
          className="
            w-full
            appearance-none
            rounded-xl
            border border-slate-200
            bg-slate-50/50
            px-4
            py-3
            pr-10
            text-sm
            text-[#181d19]
            font-medium
            cursor-pointer
            transition-all duration-200
            hover:border-slate-300
            hover:bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-[#8b5cf6]/20
            focus:border-[#8b5cf6]
          "
        >
          <option value="">
            Select a project...
          </option>

          {projects.map((project) => (
            <option
              key={project._id || project.id}
              value={project._id || project.id}
            >
              {project.title || project.name}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

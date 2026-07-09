"use client";

import { Plus } from "lucide-react";
import SearchInput from "@/components/shared/SearchInput";
import ViewToggle from "@/components/projects/ViewToggle";

const STATUS_OPTIONS = ["all", "active", "at-risk", "on-hold", "completed"];

export default function ProjectFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  view,
  onViewChange,
  onNewProject,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search projects..."
          className="sm:max-w-xs"
        />

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="
            rounded-xl
            border border-[#c2d0ca]
            bg-white
            px-3 py-2.5
            text-sm
            font-medium
            text-[#2f3a36]
            outline-none
            transition-colors
            focus:border-[#40916c]
            focus:ring-2
            focus:ring-[#40916c]/15
            hover:border-[#b8cdc3]
          "
        >
          {STATUS_OPTIONS.map((s) => (
            <option
              key={s}
              value={s}
              className="bg-white text-[#2f3a36]"
            >
              {s === "all"
                ? "All Statuses"
                : s
                    .split("-")
                    .map((w) => w[0].toUpperCase() + w.slice(1))
                    .join(" ")}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <ViewToggle view={view} onChange={onViewChange} />

        <button
          onClick={onNewProject}
          className="
            group
            flex items-center justify-center gap-1.5
            rounded-xl
            bg-[#0f5238]
            px-4 py-2.5
            text-sm font-medium
            text-white
            ring-1 ring-[#40916c]/30
            transition-all duration-200
            hover:bg-[#12664a]
            hover:ring-[#40916c]/50
            active:scale-[0.98]
          "
        >
          <Plus
            size={16}
            className="transition-transform duration-200 group-hover:rotate-90"
          />
          <span className="hidden sm:inline">
            New Project
          </span>
        </button>
      </div>
    </div>
  );
}
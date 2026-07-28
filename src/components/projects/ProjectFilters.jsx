"use client";

import SearchInput from "@/components/shared/SearchInput";
import ViewToggle from "@/components/projects/ViewToggle";

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "planning", label: "Planning" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export default function ProjectFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  view,
  onViewChange,
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

        <div className="relative">
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="
              appearance-none
              rounded-xl
              border border-slate-200
              bg-slate-50/50
              px-4
              py-2.5
              pr-10
              text-sm
              font-medium
              text-[#181d19]
              cursor-pointer
              transition-all duration-200
              hover:border-slate-300
              hover:bg-white
              focus:outline-none
              focus:ring-2
              focus:ring-[#0f5238]/20
              focus:border-[#0f5238]
            "
          >
            {STATUS_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-white text-[#181d19]"
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom dropdown arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-slate-400"
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

      <div className="flex items-center gap-2">
        <ViewToggle view={view} onChange={onViewChange} />
      </div>
    </div>
  );
}

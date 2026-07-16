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
          {STATUS_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-white text-[#2f3a36]"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <ViewToggle view={view} onChange={onViewChange} />
      </div>
    </div>
  );
}
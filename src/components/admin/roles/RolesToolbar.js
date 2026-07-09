import React from "react";
import { ROLE } from "@/constants/roles";

const FILTERS = [
  { value: "all", label: "All" },
  { value: ROLE.MEMBER, label: "Team Member" },
  { value: ROLE.PROJECT_MANAGER, label: "Project Manager" },
];

const RolesToolbar = ({ searchQuery, onSearchChange, roleFilter, onRoleFilterChange }) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
      <input
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name or email"
        className="w-full sm:max-w-xs rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#40916c]/40"
      />

      <div className="flex gap-2">
        {FILTERS.map(({ value, label }) => {
          const active = roleFilter === value;
          return (
            <button
              key={value}
              onClick={() => onRoleFilterChange(value)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                active ? "bg-[#0f5238] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RolesToolbar;
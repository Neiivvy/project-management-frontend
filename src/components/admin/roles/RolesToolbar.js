import React from "react";
import { ROLE } from "@/constants/roles";

const FILTERS = [
  { value: "all", label: "All" },
  { value: ROLE.MEMBER, label: "Team Member" },
  { value: ROLE.PROJECT_MANAGER, label: "Project Manager" },
];

const RolesToolbar = ({ searchQuery, onSearchChange, roleFilter, onRoleFilterChange }) => {
  return (
    <div className="mb-5 animate-fade-in-up">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or email"
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:border-[#40916c]/50 focus:outline-none focus:ring-2 focus:ring-[#40916c]/20 focus:shadow-md"
          />
        </div>

        <div className="flex gap-2">
          {FILTERS.map(({ value, label }) => {
            const active = roleFilter === value;
            return (
              <button
                key={value}
                onClick={() => onRoleFilterChange(value)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-linear-to-r from-[#0f5238] to-[#1a6b4a] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RolesToolbar;
"use client";

import { Plus, SlidersHorizontal } from "lucide-react";
import SearchInput from "@/components/shared/SearchInput";
import { ROLE } from "@/constants/roles";

const ROLES = [
  ROLE.ADMIN,
  ROLE.PROJECT_MANAGER,
  ROLE.MEMBER,
];

export default function UserFilters({
  search,
  onSearchChange,
  role,
  onRoleChange,
  onAddUser,
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search by name or email..."
          className="w-full sm:max-w-xs"
        />

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <SlidersHorizontal
            size={14}
            className="hidden shrink-0 text-[#5d6d66] sm:block"
          />

          <select
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-[#d9e4df]
              bg-white
              px-3
              py-2.5
              text-xs
              font-medium
              text-[#3f4b46]
              outline-none
              transition-colors
              hover:border-[#8eb8a3]
              focus:border-[#40916c]
              sm:w-auto
              sm:min-w-42.5
            "
          >
            <option value="all">All Roles</option>

            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role
                  .replace("_", " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right */}
      <button
        onClick={onAddUser}
        className="
          group
          flex
          w-full
          items-center
          justify-center
          gap-1.5
          rounded-xl
          bg-[#257d5c]
          px-4
          py-2.5
          text-sm
          font-medium
          text-white
          transition-all
          duration-200
          hover:bg-[#339973]
          active:scale-[0.98]
          sm:w-auto
        "
      >
        <Plus
          size={16}
          className="transition-transform duration-200 group-hover:rotate-90"
        />

        Add User
      </button>
    </div>
  );
}
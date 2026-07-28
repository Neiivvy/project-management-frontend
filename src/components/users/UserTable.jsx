"use client";

import { UsersRound } from "lucide-react";
import UserTableRow from "@/components/users/UserTableRow";
import EmptyState from "@/components/shared/EmptyState";

const COLUMNS = [
  { key: "name", label: "User", cellClass: "" },

  {
    key: "role",
    label: "Role",
    cellClass: "hidden md:table-cell",
  },

  {
    key: "projects",
    label: "Projects",
    cellClass: "hidden lg:table-cell text-center",
  },

  {
    key: "joinedDate",
    label: "Joined Date",
    cellClass: "hidden xl:table-cell",
  },

  {
    key: "actions",
    label: "Actions",
    cellClass: "text-right",
  },
];
export default function UserTable({
  users,
  onEdit,
  onDelete,
}) {
  if (users.length === 0) {
    return (
      <EmptyState
        icon={UsersRound}
        title="No users found"
        message="Try adjusting your search or filters."
      />
    );
  }

  return (
<div className="overflow-x-auto">
  <div className="overflow-visible">
    <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#dbe6e1] bg-[#f7fbf9]">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em]
                  text-[#4d5b56]
                  first:pl-4
                  last:pr-4
                  sm:first:pl-5
                  sm:last:pr-5
                  ${col.cellClass}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.map((user, i) => (
           <UserTableRow
  key={user._id}
  user={user}
  index={i}
  onEdit={onEdit}
  onDelete={onDelete}
/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
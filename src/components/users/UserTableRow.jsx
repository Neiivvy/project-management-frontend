"use client";

import Link from "next/link";
import Avatar from "@/components/shared/Avatar";
import RoleBadge from "@/components/users/RoleBadge";
import UserActionsMenu from "@/components/users/UserActionsMenu";

function formatRelative(iso) {
  if (!iso) return "—";

  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);

  if (mins < 60) return `${mins}m ago`;

  const hours = Math.floor(mins / 60);

  if (hours < 24) return `${hours}h ago`;

  return `${Math.floor(hours / 24)}d ago`;
}

export default function UserTableRow({
  user,
  index,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <tr
      style={{ animationDelay: `${index * 35}ms` }}
      className="group animate-[fadeSlide_0.4s_ease-out_backwards]
                 border-b border-[#e3ece8]
                 transition-colors duration-200
                 last:border-b-0
                 hover:bg-[#f5faf7]"
    >
      {/* User */}
      <td className="py-3 pl-4 pr-3 sm:pl-5">
        <Link
          href={`/admin/users/${user._id}`}
          className="flex min-w-0 items-center gap-3"
        >
          <Avatar name={user.name} />

          <div className="min-w-0 flex-1">
            <p
              className="truncate text-sm font-semibold
                         text-[#2f3a36]
                         transition-colors duration-200
                         group-hover:text-[#1d6d45]"
            >
              {user.name}
            </p>

            <p
              className="truncate text-xs text-[#6b7b74]"
            >
              {user.email}
            </p>
          </div>
        </Link>
      </td>

      {/* Role */}
      <td className="hidden whitespace-nowrap px-3 py-3 md:table-cell">
        <RoleBadge role={user.role} />
      </td>

      {/* Projects */}
      <td
        className="hidden whitespace-nowrap
                   px-3 py-3
                   text-center
                   text-sm
                   font-medium
                   text-[#394640]
                   lg:table-cell"
      >
        {user.projects || "—"}
      </td>

      {/* Last Active */}
      <td
        className="hidden whitespace-nowrap
                   px-3 py-3
                   text-sm
                   text-[#66756e]
                   xl:table-cell"
      >
        {formatRelative(user.lastActive)}
      </td>

      {/* Actions */}
      <td className="py-3 pl-3 pr-4 text-right sm:pr-5">
        <UserActionsMenu
          onView={() => onView?.(user)}
          onEdit={() => onEdit?.(user)}
          onDelete={() => onDelete?.(user)}
        />
      </td>
    </tr>
  );
}
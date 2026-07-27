"use client";

import Link from "next/link";
import Avatar from "@/components/shared/Avatar";
import RoleBadge from "@/components/users/RoleBadge";
import UserActionsMenu from "@/components/users/UserActionsMenu";

export default function UserTableRow({
  user,
  index,
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
                            <Avatar
           name={user.name}
           size="sm"
           variant="dark"
           paletteIndex={index}
         />

          <div className="min-w-0 flex-1">
            <p
              className="truncate text-sm font-semibold
                         text-[#2f3a36]
                          transition-colors duration-200
                          group-hover:text-[#1a7a4c]"
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
  {user.projectCount ?? "—"}
</td>

    {/* Availability */}
<td
  className="hidden whitespace-nowrap
             px-3 py-3
             xl:table-cell"
>
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
               user.availability === "available"
                 ? "bg-[#e7f5ee] text-[#1a7a4c]"
                 : "bg-[#fdf0f0] text-[#c03d3d]"
    }`}
  >
    {user.availability === "available"
      ? "Available"
      : "Unavailable"}
  </span>
</td>

      {/* Actions */}
      <td className="py-3 pl-3 pr-4 text-right sm:pr-5">
        <UserActionsMenu
          onEdit={() => onEdit?.(user)}
          onDelete={() => onDelete?.(user)}
        />
      </td>
    </tr>
  );
}
"use client";

import React from "react";
import RoleBadge from "./RoleBadge";
import RoleActionMenu from "./RoleActionMenu";

const UsersRolesTable = ({
  users,
  onRequestAction,
  isUpdatingId,
}) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50 text-gray-500">
            <th className="px-5 py-3 font-medium">Name</th>
            <th className="px-5 py-3 font-medium">Email</th>
            <th className="px-5 py-3 font-medium">Current Role</th>
            <th className="px-5 py-3 text-right font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-b border-gray-50 last:border-0"
            >
              <td className="px-5 py-3 font-medium text-gray-900">
                {user.name}
              </td>

              <td className="px-5 py-3 text-gray-500">
                {user.email}
              </td>

              <td className="px-5 py-3">
                <RoleBadge role={user.role} />
              </td>

              <td className="px-5 py-3 text-right">
                <RoleActionMenu
                  user={user}
                  disabled={isUpdatingId === user._id}
                  onAction={onRequestAction}
                />
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-5 py-10 text-center text-gray-400"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersRolesTable;
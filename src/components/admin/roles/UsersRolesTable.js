"use client";

import React from "react";
import RoleBadge from "./RoleBadge";
import RoleActionMenu from "./RoleActionMenu";

const UsersRolesTable = ({
  users,
  onRequestAction,
  isUpdatingId,
}) => {
  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white py-10 text-center text-gray-400">
        No users found.
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}

      <div className="hidden rounded-xl border border-gray-200 bg-white md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-gray-500">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Current Role</th>
              <th className="px-5 py-3 text-right font-medium">
                Action
              </th>
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
          </tbody>
        </table>
      </div>


      {/* Mobile Cards */}

      <div className="space-y-4 md:hidden">
        {users.map((user) => (
          <div
            key={user._id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-gray-900">
                  {user.name}
                </h3>

                <p className="mt-1 break-all text-sm text-gray-500">
                  {user.email}
                </p>

                <div className="mt-3">
                  <RoleBadge role={user.role} />
                </div>
              </div>

              <RoleActionMenu
                user={user}
                disabled={isUpdatingId === user._id}
                onAction={onRequestAction}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersRolesTable;
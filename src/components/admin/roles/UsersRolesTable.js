"use client";

import React from "react";
import Avatar from "@/components/shared/Avatar";
import RoleBadge from "./RoleBadge";
import RoleActionMenu from "./RoleActionMenu";

const UsersRolesTable = ({ users, onRequestAction, isUpdatingId }) => {
  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center text-gray-400 shadow-sm">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-500">No users found</p>
        <p className="mt-1 text-xs text-gray-400">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}

     <div className="hidden overflow-hidden rounded-2xl border border-[#e3e8e5] bg-white shadow-sm transition-all duration-300 md:block animate-fade-in-up">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#e8eeea] bg-[#f8faf9] text-[#3f4d45]">
              <th className="px-5 py-3.5 font-medium">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4 text-[#7b867f]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                  User
                </div>
              </th>
              <th className="px-5 py-3.5 font-medium">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                  Email
                </div>
              </th>
              <th className="px-5 py-3.5 font-medium">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  Role
                </div>
              </th>
              <th className="px-5 py-3.5 text-right font-medium">
                <div className="flex items-center justify-end gap-2">
                  Action
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {users.map((user, index) => (
              <tr
                key={user._id}
               className="
group
cursor-default
transition-all
duration-300
hover:bg-[#fafdfb]
hover:shadow-sm
hover:-translate-y-px
"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar
  name={user.name}
  size="sm"
  variant="dark"
  paletteIndex={index}
/>
                    <span className="font-medium text-gray-900 transition-colors group-hover:text-[#1a7a4c]">
                      {user.name}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-3.5 text-gray-500 transition-colors group-hover:text-gray-700">
                  {user.email}
                </td>

                <td className="px-5 py-3.5">
                  <RoleBadge role={user.role} />
                </td>

                <td className="px-5 py-3.5 text-right">
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

      <div className="space-y-3 md:hidden">
        {users.map((user, index) => (
          <div
            key={user._id}
            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-[#40916c]/20 animate-fade-in-up"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <Avatar
                  name={user.name}
                  size="sm"
                  variant="dark"
                  paletteIndex={index}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-gray-900 transition-colors">
                    {user.name}
                  </h3>

                  <p className="mt-0.5 break-all text-sm text-gray-500">
                    {user.email}
                  </p>

                  <div className="mt-2.5 flex items-center gap-2">
                    <RoleBadge role={user.role} />
                  </div>
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

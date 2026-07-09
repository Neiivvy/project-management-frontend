import React from "react";
import RoleBadge from "./RoleBadge";
import { ROLE } from "@/constants/roles";

const UsersRolesTable = ({ users, onRequestPromote, isUpdatingId }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50 text-gray-500">
            <th className="px-5 py-3 font-medium">Name</th>
            <th className="px-5 py-3 font-medium">Email</th>
            <th className="px-5 py-3 font-medium">Current role</th>
            <th className="px-5 py-3 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const canPromote = user.role === ROLE.MEMBER;
            return (
              <tr key={user._id} className="border-b border-gray-50 last:border-0">
                <td className="px-5 py-3 text-gray-900 font-medium">{user.name}</td>
                <td className="px-5 py-3 text-gray-500">{user.email}</td>
                <td className="px-5 py-3">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-5 py-3 text-right">
                  {canPromote ? (
                    <button
                      onClick={() => onRequestPromote(user)}
                      disabled={isUpdatingId === user._id}
                      className="rounded-lg bg-[#0f5238] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0c4230] disabled:opacity-50"
                    >
                      {isUpdatingId === user._id ? "Promoting..." : "Promote to PM"}
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400">No action available</span>
                  )}
                </td>
              </tr>
            );
          })}

          {users.length === 0 && (
            <tr>
              <td colSpan={4} className="px-5 py-10 text-center text-gray-400">
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
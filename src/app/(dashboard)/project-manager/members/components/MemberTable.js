"use client";

import { FaUserPlus, FaTrash, FaUsers } from "react-icons/fa";

const ROLE_STYLES = {
  admin: "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
  manager: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  member: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  default: "bg-gray-100 text-gray-700 ring-1 ring-gray-200",
};

const AVATAR_COLORS = [
  "bg-[#0f5238]/10 text-[#0f5238]",
  "bg-indigo-100 text-indigo-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-sky-100 text-sky-700",
];

export default function MemberTable({ members = [], onAssign, onDelete }) {
  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  const getAvatarColor = (name = "") => {
    const sum = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return AVATAR_COLORS[sum % AVATAR_COLORS.length];
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-160">
          <thead className="border-b border-gray-200 bg-gray-50/80">
            <tr className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-6 py-4 text-left">Member</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {members.length > 0 ? (
              members.map((member) => (
                <tr
                  key={member._id}
                  className="group transition-colors duration-150 hover:bg-gray-50/70"
                >
                  {/* Member */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ring-2 ring-white ${getAvatarColor(
                          member.name,
                        )}`}
                      >
                        {getInitials(member.name)}
                      </div>
                      <p className="font-semibold text-gray-800">
                        {member.name}
                      </p>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-gray-500">{member.email}</td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize ${
                        ROLE_STYLES[member.role] || ROLE_STYLES.default
                      }`}
                    >
                      {member.role.replace("_", " ")}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2 opacity-80 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => onAssign?.(member)}
                        title="Assign to Project"
                        aria-label={`Assign ${member.name} to project`}
                        className="rounded-lg border border-green-200 bg-green-50 p-2.5 text-green-600 transition hover:scale-105 hover:bg-green-600 hover:text-white active:scale-95"
                      >
                        <FaUserPlus size={14} />
                      </button>

                      <button
                        onClick={() => onDelete?.(member)}
                        title="Remove Member"
                        aria-label={`Remove ${member.name}`}
                        className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-red-600 transition hover:scale-105 hover:bg-red-600 hover:text-white active:scale-95"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <FaUsers size={28} />
                    <p className="text-sm font-medium text-gray-500">
                      No members found
                    </p>
                    <p className="text-xs text-gray-400">
                      Members you add will show up here.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

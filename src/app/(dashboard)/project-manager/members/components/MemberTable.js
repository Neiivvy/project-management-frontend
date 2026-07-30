"use client";

import { FaUserPlus, FaUsers } from "react-icons/fa";

const AVATAR_COLORS = [
  "bg-[#0f5238]/10 text-[#0f5238]",
  "bg-indigo-100 text-indigo-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-sky-100 text-sky-700",
];

export default function MemberTable({ members = [], onAssign }) {
  const getInitials = (name = "") => name.trim().substring(0, 2).toUpperCase();

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

              <th className="px-6 py-4 text-left">Availability</th>

              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {members.length > 0 ? (
              members.map((member) => (
                <tr key={member._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-11 w-11 flex items-center justify-center rounded-full font-semibold ${getAvatarColor(member.name)}`}
                      >
                        {getInitials(member.name)}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">
                          {member.name}
                        </p>

                        <p className="text-xs text-gray-400">Team Member</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-500">{member.email}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`flex items-center w-fit gap-2 rounded-full border px-3 py-1 text-xs font-medium
                    ${
                      member.availability === "available"
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-red-50 border-red-200 text-red-700"
                    }
                    `}
                    >
                      <span
                        className={`h-2 w-2 rounded-full
                      ${
                        member.availability === "available"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }
                      `}
                      />

                      {member.availability}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => onAssign?.(member)}
                        className="
                      flex h-10 w-10 items-center justify-center
                      rounded-xl border
                      text-green-600
                      hover:bg-[#0f5238]
                      hover:text-white
                      transition
                      "
                      >
                        <FaUserPlus size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <FaUsers size={28} />

                    <p>No members found</p>
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

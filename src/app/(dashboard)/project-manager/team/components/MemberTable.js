"use client";

import { FaUserPlus, FaTrash } from "react-icons/fa";

export default function MemberTable({ members }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Team</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-semibold">{member.name}</td>

              <td>{member.email}</td>

              <td>{member.role}</td>

              <td>
                {member.team || (
                  <span className="text-red-500">Not Assigned</span>
                )}
              </td>

              <td>
                <div className="flex justify-center gap-4">
                  <button className="text-green-600 hover:text-green-800">
                    <FaUserPlus />
                  </button>

                  <button className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

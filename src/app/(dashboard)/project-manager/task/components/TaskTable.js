"use client";

import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function TaskTable({ tasks }) {
  const priorityColor = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  const statusColor = {
    Todo: "bg-gray-200 text-gray-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Task</th>
            <th>Project</th>
            <th>Assigned</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-semibold">{task.title}</td>

              <td>{task.project}</td>

              <td>{task.assigned}</td>

              <td>{task.due}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${priorityColor[task.priority]}`}
                >
                  {task.priority}
                </span>
              </td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${statusColor[task.status]}`}
                >
                  {task.status}
                </span>
              </td>

              <td>
                <div className="flex justify-center gap-3">
                  <button className="text-blue-600">
                    <FaEye />
                  </button>

                  <button className="text-green-600">
                    <FaEdit />
                  </button>

                  <button className="text-red-600">
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

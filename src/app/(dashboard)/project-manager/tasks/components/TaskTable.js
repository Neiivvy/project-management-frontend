"use client";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaTasks,
  FaFolderOpen,
  FaCalendarAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function TaskTable({
  tasks = [],
  currentPage = 1,
  tasksPerPage = 5,
  onEdit,
  onDelete,
}) {
  const router = useRouter();
  const priorityColor = {
    High: "bg-red-100 text-red-700 ring-red-200",
    Medium: "bg-amber-100 text-amber-700 ring-amber-200",
    Low: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  };

  const statusColor = {
    "To Do": "bg-orange-100 text-orange-700 ring-orange-200",
    "In Progress": "bg-blue-100 text-blue-700 ring-blue-200",
    Review: "bg-purple-100 text-purple-700 ring-purple-200",
    Completed: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  const currentTasks = tasks;

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 transition-all duration-300">
      <div className="flex items-center py-2 px-4 justify-between border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Task List</h2>

          <p className="mt-1 text-sm text-slate-500">
            {tasks.length} {tasks.length === 1 ? "Task" : "Tasks"} available
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f5238]/10 text-[#0f5238]">
          <FaTasks size={20} />
        </div>
      </div>

      <div className="max-h-150 overflow-auto">
        <table className="min-w-full">
          <thead className="sticky top-0 z-10 border-b border-slate-200 bg-linear-to-r from-slate-50 via-white to-slate-50 backdrop-blur-sm">
            <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-2 py-3 text-center">SN</th>
              <th className="px-2 py-3">Task</th>
              <th className="px-2 py-3">Project</th>
              <th className="px-2 py-3">Assigned To</th>
              <th className="px-2 py-3">Deadline</th>
              <th className="px-2 py-3">Priority</th>
              <th className="px-2 py-3">Status</th>
              <th className="px-2 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentTasks.length > 0 ? (
              currentTasks.map((task, index) => (
                <tr
                  key={index}
                  className="group border-b border-slate-100 last:border-0 transition-all duration-300 hover:bg-emerald-50/60 hover:shadow-inner"
                >
                  <td className="px-3 py-2 text-center">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                      {(currentPage - 1) * tasksPerPage + index + 1}
                    </span>
                  </td>

                  <td className="px-2 py-2">
                    <div className="flex items-start gap-4 max-w-50">
                      <div className="flex h-8 sm:min-w-8 mt-3 items-center justify-center rounded-2xl bg-linear-to-br from-[#0f5238] to-emerald-500 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                        <FaTasks className="text-lg" />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-800 transition group-hover:text-[#0f5238]">
                          {task.title}
                        </h3>

                        <p className="mt-1 max-w-xs text-xs text-slate-500 wrap-break-word">
                          {task.description
                            ? task.description.length > 40
                              ? task.description.slice(0, 15) + "..."
                              : task.description
                            : "No description"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-2 py-2">
                    <div className="inline-flex items-center gap-1 rounded-full  bg-emerald-100 px-3 py-2 text-emerald-700">
                      <FaFolderOpen className="text-[#0f5238]" />

                      <span className="text-[13.5px] font-semibold">
                        {task.projectId?.title || "-"}
                      </span>
                    </div>
                  </td>

                  <td className="px-2 py-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] font-medium text-slate-700">
                        {task.assignedTo?.name || "Unassigned"}
                      </span>
                    </div>
                  </td>

                  <td className="px-2 py-2">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-emerald-700">
                      <FaCalendarAlt className="text-[#0f5238]" />
                      <span className="text-sm">
                        {task.deadline
                          ? new Date(task.deadline).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "-"}
                      </span>
                    </div>
                  </td>

                  <td className="px-2 py-2">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ring-1 ${
                        priorityColor[task.priority] ||
                        "bg-slate-100 text-slate-700"
                      }`}
                    >
                      <div className="h-2 w-2 rounded-full bg-current opacity-80"></div>
                      {task.priority}
                    </span>
                  </td>

                  <td className="px-2 py-2">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ring-1 ${
                        statusColor[task.status] ||
                        "bg-slate-100 text-slate-700 ring-slate-200"
                      }`}
                    >
                      <div className="h-2 w-2 rounded-full bg-current opacity-80"></div>

                      {task.status}
                    </span>
                  </td>

                  <td className="px-2 py-2">
                    <div className="flex justify-center gap-2 opacity-90 transition-all group-hover:opacity-100">
                      <button
                        title="View"
                        onClick={() =>
                          router.push(`/project-manager/tasks/${task._id}`)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-green-600 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#0f5238] hover:bg-green-700 hover:text-white"
                      >
                        <FaEye />
                      </button>

                      <button
                        title="Edit"
                        onClick={() => onEdit(task)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-600 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#0f5238] hover:bg-blue-700 hover:text-white"
                      >
                        <FaEdit />
                      </button>

                      <button
                        title="Delete"
                        onClick={() => onDelete?.(task)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-red-600 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#0f5238] hover:bg-red-600 hover:text-white"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-24 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50">
                    <FaTasks className="text-5xl text-[#0f5238]" />
                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-slate-800">
                    No Tasks Yet
                  </h2>

                  <p className="mx-auto mt-2 max-w-sm text-slate-500">
                    Your tasks will appear here once you create them.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React from "react";
import { FiAlertTriangle, FiCheckCircle, FiTrash2 } from "react-icons/fi";

const OverdueTasks = ({ tasks = [], onDelete }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Overdue Tasks
          </h2>
        </div>

        <span className="rounded-full bg-rose-50 px-3 py-1 text-xs text-rose-600">
          {tasks.length} need attention
        </span>
      </div>

      {/* Tasks */}
      <div className="divide-y divide-slate-100">
        {tasks.length > 0 ? (
          tasks.map((task) => {
            const days = Math.floor(
              (new Date() - new Date(task.deadline)) / (1000 * 60 * 60 * 24),
            );

            return (
              <div
                key={task._id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                {/* Task information */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {task.title}
                  </p>

                  <p className="truncate text-xs text-slate-400">
                    {task.projectId?.title || "No Project"}
                    {" · Assigned to "}

                    {Array.isArray(task.assignedTo)
                      ? task.assignedTo.map((member) => member.name).join(", ")
                      : task.assignedTo?.name || "Unassigned"}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2">
                  <span className="flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
                    <FiAlertTriangle className="h-3 w-3" />
                    {days} day{days !== 1 ? "s" : ""} overdue
                  </span>

                  <button
                    type="button"
                    onClick={() => onDelete?.(task._id)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                    title="Delete task"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center gap-2 px-5 py-8 text-sm text-slate-400">
            <FiCheckCircle className="text-emerald-500" />
            Nothing overdue — great work.
          </div>
        )}
      </div>
    </div>
  );
};

export default OverdueTasks;

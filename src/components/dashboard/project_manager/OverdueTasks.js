import React from "react";
import { FiAlertTriangle, FiCheckCircle, FiFlag } from "react-icons/fi";

const OverdueTasks = ({ tasks = [] }) => {
  return (
    <div className="mt-6 rounded-xl border border-rose-100 bg-white">
      <div className="flex items-center justify-between border-b border-rose-50 px-5 py-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <FiFlag className="h-4 w-4 text-rose-500" />
          Overdue Tasks
        </h2>

        <span className="rounded-full bg-rose-50 px-3 py-1 text-xs text-rose-600">
          {tasks.length} need attention
        </span>
      </div>

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
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {task.title}
                  </p>

                  <p className="text-xs text-slate-400">
                    {task.projectId?.title || "No Project"}
                    {" · Assigned to "}

                    {Array.isArray(task.assignedTo)
                      ? task.assignedTo.map((member) => member.name).join(", ")
                      : task.assignedTo?.name || "Unassigned"}
                  </p>
                </div>

                <span className="flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
                  <FiAlertTriangle className="h-3 w-3" />
                  {days} day{days !== 1 ? "s" : ""} overdue
                </span>
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

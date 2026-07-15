"use client";

// ---- Column definitions: each status carries its own accent color ----
const COLUMN_STYLES = {
  "To Do": {
    dot: "bg-slate-400",
    bar: "bg-slate-400",
    chip: "bg-slate-100 text-slate-600",
  },
  Review: {
    dot: "bg-amber-500",
    bar: "bg-amber-500",
    chip: "bg-amber-50 text-amber-700",
  },
  "In Progress": {
    dot: "bg-blue-500",
    bar: "bg-blue-500",
    chip: "bg-blue-50 text-blue-700",
  },
  Completed: {
    dot: "bg-emerald-500",
    bar: "bg-emerald-500",
    chip: "bg-emerald-50 text-emerald-700",
  },
};

function initials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function isOverdue(deadline) {
  if (!deadline) return false;
  return new Date(deadline) < new Date(new Date().setHours(0, 0, 0, 0));
}

export default function TaskBoard({ tasks = [] }) {
  const columns = ["To Do", "Review", "In Progress", "Completed"];

  return (
    <div className="grid lg:grid-cols-4 gap-2 items-start rounded-3xl">
      {columns.map((column) => {
        const style = COLUMN_STYLES[column];
        const columnTasks = tasks.filter((task) => task.status === column);

        return (
          <div
            key={column}
            className="flex max-h-[80vh] flex-col rounded-2xl border border-slate-200 bg-white shadow-sm self-start"
          >
            {/* Header */}
            <div className=" sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b bg-white px-5 py-4">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <span className={`h-3 w-3 rounded-full shadow ${style.dot}`} />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                  {column}
                </h2>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${style.chip}`}
              >
                {columnTasks.length}
              </span>
            </div>

            {/* Tasks */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {columnTasks.length === 0 ? (
                <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-sm text-slate-400">
                  No tasks
                </div>
              ) : (
                columnTasks.map((task) => {
                  const overdue = isOverdue(task.deadline);

                  return (
                    <div
                      key={task._id}
                      className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0f5238]/40 hover:shadow-xl"
                    >
                      {/* Project */}
                      <div className="mb-2 flex items-center justify-between">
                        <span className="rounded-full bg-[#0f5238]/10 px-2 py-1 text-[11px] font-semibold text-[#0f5238]">
                          {task.projectId?.title || "No Project"}
                        </span>

                        <span
                          className={`h-2.5 w-2.5 rounded-full ${style.dot}`}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="line-clamp-2 text-[15px] font-semibold text-slate-800">
                        {task.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
                        {task.description || "No description available"}
                      </p>

                      {/* Priority */}
                      <div className="mt-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            task.priority === "High"
                              ? "bg-red-100 text-red-600"
                              : task.priority === "Medium"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {task.priority} Priority
                        </span>
                      </div>

                      {/* Footer */}
                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0f5238]/10 text-xs font-bold text-[#0f5238]">
                            {task.assignedTo?.name
                              ? initials(task.assignedTo.name)
                              : "--"}
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-slate-700">
                              {task.assignedTo?.name || "Unassigned"}
                            </p>

                            <p className="text-[11px] text-slate-400">Member</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p
                            className={`text-xs font-semibold ${
                              overdue ? "text-red-500" : "text-slate-500"
                            }`}
                          >
                            {task.deadline
                              ? new Date(task.deadline).toLocaleDateString()
                              : "-"}
                          </p>

                          {overdue && (
                            <p className="text-[10px] font-semibold text-red-500">
                              Overdue
                            </p>
                          )}
                        </div>
                      </div>

                      {column === "Completed" && (
                        <button className="mt-5 w-full rounded-xl bg-[#0f5238] py-2.5 text-sm font-semibold text-white transition hover:bg-[#156046]">
                          Approve Task
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

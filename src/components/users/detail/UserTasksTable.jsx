import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function UserTasksTable({ tasks }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#d9eefb] bg-white/60 p-8 text-center">
        <p className="text-sm text-[#6b7b74]">No tasks assigned yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#d9eefb] bg-white shadow-[0_1px_3px_rgba(16,24,20,0.06)]">
      {/* Mobile card view */}
      <div className="sm:hidden">
        {tasks.map((task) => (
          <div key={task._id} className="border-b border-[#eef2f0] p-4 last:border-b-0 hover:bg-[#fafcfb]">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-[#2f3a36]">{task.title}</p>
              <PriorityBadge priority={task.priority} />
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <StatusBadge status={task.status} />
              <span className="text-xs text-[#66756e]">{task.projectId?.title || "No project"}</span>
              <span className="text-xs text-[#66756e]">Due: {formatDate(task.deadline)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table view */}
      <table className="hidden w-full text-left sm:table">
        <thead>
          <tr className="border-b border-[#e3ece8] bg-linear-to-r from-[#f0faf4] to-[#f7faf8] text-xs uppercase tracking-wide text-[#375948]">
            <th className="py-3 pl-4 pr-3 font-semibold sm:pl-5">Task</th>
            <th className="hidden px-3 py-3 font-semibold sm:table-cell">Project</th>
            <th className="px-3 py-3 font-semibold">Priority</th>
            <th className="px-3 py-3 font-semibold">Status</th>
            <th className="hidden px-3 py-3 pr-4 font-semibold sm:table-cell sm:pr-5">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr
              key={task._id}
              className={`border-b border-[#eef2f0] transition-colors duration-200 last:border-b-0
                          hover:bg-[#f0faf4]
                          ${index % 2 === 1 ? "bg-[#fbfdfc]" : "bg-white"}`}
            >
              <td className="py-3 pl-4 pr-3 sm:pl-5">
                <p className="text-sm font-medium text-[#2f3a36]">{task.title}</p>
              </td>
              <td className="hidden px-3 py-3 text-sm text-[#66756e] sm:table-cell">{task.projectId?.title || "—"}</td>
              <td className="px-3 py-3"><PriorityBadge priority={task.priority} /></td>
              <td className="px-3 py-3"><StatusBadge status={task.status} /></td>
              <td className="hidden px-3 py-3 pr-4 text-sm text-[#66756e] sm:table-cell sm:pr-5">{formatDate(task.deadline)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyTasks, updateTaskStatus } from "@/api/tasks";

const statusColor = {
  "To Do": "bg-gray-200 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Review": "bg-purple-100 text-purple-700",
  "Completed": "bg-green-100 text-green-700",
};

const priorityColor = { Low: "text-green-600", Medium: "text-yellow-600", High: "text-red-600" };

export default function MemberTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    setLoading(true);
    const res = await getMyTasks();
    setTasks(res.data.data);
    setLoading(false);
  };

 useEffect(() => {
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await getMyTasks();
      setTasks(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  fetchTasks();
}, []);

  const changeStatus = async (task, newStatus) => {
    setBusyId(task._id);
    const prev = tasks;
    setTasks((cur) => cur.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t)));
    try {
      await updateTaskStatus(task._id, newStatus);
    } catch (err) {
      setTasks(prev);
      alert(err.response?.data?.message || "Failed to update task");
    } finally {
      setBusyId(null);
    }
  };

  return (

        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-[#181d19] mb-6">My Tasks</h1>

          {loading && <p className="text-[#404943]">Loading tasks...</p>}

          {!loading && (
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-[#404943]">
                    <th className="py-3 px-4">Task</th>
                    <th className="py-3 px-4">Priority</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.length === 0 && (
                    <tr><td colSpan={5} className="py-6 px-4 text-center text-[#404943]">No tasks assigned to you yet.</td></tr>
                  )}
                  {tasks.map((task) => (
                    <tr key={task._id} className="border-b last:border-b-0">
                      <td className="py-3 px-4 font-medium text-[#181d19]">{task.title}</td>
                      <td className={`py-3 px-4 font-medium ${priorityColor[task.priority] || ""}`}>{task.priority}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-medium rounded-full px-3 py-1 ${statusColor[task.status] || "bg-gray-100"}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {task.deadline ? new Date(task.deadline).toLocaleDateString() : "—"}
                      </td>
                      <td className="py-3 px-4 space-x-2">
                        <Link href={`/member/tasks/${task._id}`} className="text-xs font-medium text-[#2d6a4f] underline">
                          View
                        </Link>
                        {task.status === "To Do" && (
                          <button
                            disabled={busyId === task._id}
                            onClick={() => changeStatus(task, "In Progress")}
                            className="text-xs font-medium text-blue-600 underline disabled:opacity-50"
                          >
                            Start
                          </button>
                        )}
                        {task.status !== "Completed" && (
                          <button
                            disabled={busyId === task._id}
                            onClick={() => changeStatus(task, "Completed")}
                            className="text-xs font-medium text-green-700 underline disabled:opacity-50"
                          >
                            Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
  );
}
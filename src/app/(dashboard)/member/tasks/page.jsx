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

const priorityColor = {
  Low: "text-green-600",
  Medium: "text-yellow-600",
  High: "text-red-600",
};

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

    setTasks((cur) =>
      cur.map((t) =>
        t._id === task._id
          ? { ...t, status: newStatus }
          : t
      )
    );

    try {
      await updateTaskStatus(task._id, newStatus);
    } catch (err) {
      setTasks(prev);
      alert(
        err.response?.data?.message ||
          "Failed to update task"
      );
    } finally {
      setBusyId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#eaf7ef] p-8">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#123524]">
          My Tasks
        </h1>

        <p className="text-sm text-[#527565] mt-2">
          View and manage your assigned tasks
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-[#f4fbf6] border border-[#c7e3d1] rounded-2xl p-8 shadow-sm">
          <p className="text-[#527565]">
            Loading tasks...
          </p>
        </div>
      )}

      {!loading && (
        <div
          className="
            bg-[#f4fbf6]
            rounded-3xl
            border
            border-[#c7e3d1]
            shadow-[0_4px_15px_rgba(30,90,55,0.08)]
            overflow-hidden
          "
        >

          {/* Table Header Area */}
          <div className="px-6 py-5 border-b border-[#d5e9dc] bg-[#edf8f1]">
            <h2 className="text-lg font-semibold text-[#123524]">
              Assigned Tasks
            </h2>

            <p className="text-sm text-[#668273] mt-1">
              Track your current tasks and update their status.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead>
                <tr className="border-b border-[#d5e9dc] text-left bg-[#f0faf3]">
                  <th className="py-4 px-5 font-semibold text-[#527565]">
                    Task
                  </th>

                  <th className="py-4 px-5 font-semibold text-[#527565]">
                    Priority
                  </th>

                  <th className="py-4 px-5 font-semibold text-[#527565]">
                    Status
                  </th>

                  <th className="py-4 px-5 font-semibold text-[#527565]">
                    Due Date
                  </th>

                  <th className="py-4 px-5 font-semibold text-[#527565]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>

                {/* Empty State */}
                {tasks.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-10 px-4 text-center text-[#527565]"
                    >
                      No tasks assigned to you yet.
                    </td>
                  </tr>
                )}

                {tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="
                      border-b
                      border-[#dcebe1]
                      last:border-b-0
                      hover:bg-[#edf8f1]
                      transition-colors
                    "
                  >

                    {/* Task */}
                    <td className="py-5 px-5">
                      <div className="font-semibold text-[#123524]">
                        {task.title}
                      </div>
                    </td>

                    {/* Priority */}
                    <td
                      className={`py-5 px-5 font-semibold ${
                        priorityColor[task.priority] || ""
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            task.priority === "High"
                              ? "bg-red-500"
                              : task.priority === "Medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        />

                        {task.priority}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-5 px-5">
                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-2
                          text-xs
                          font-semibold
                          rounded-full
                          px-3
                          py-1.5
                          ${
                            statusColor[task.status] ||
                            "bg-gray-100"
                          }
                        `}
                      >
                        <span
                          className={`
                            w-2
                            h-2
                            rounded-full
                            ${
                              task.status === "Completed"
                                ? "bg-green-600"
                                : task.status === "In Progress"
                                ? "bg-blue-600"
                                : task.status === "Review"
                                ? "bg-purple-600"
                                : "bg-gray-500"
                            }
                          `}
                        />

                        {task.status}
                      </span>
                    </td>

                    {/* Due Date */}
                    <td className="py-5 px-5 text-[#527565]">
                      {task.deadline
                        ? new Date(
                            task.deadline
                          ).toLocaleDateString()
                        : "—"}
                    </td>

                    {/* Actions */}
                    <td className="py-5 px-5">

                      <div className="flex items-center gap-3">

                        {/* View */}
                        <Link
                          href={`/member/tasks/${task._id}`}
                          className="
                            text-xs
                            font-semibold
                            text-[#087443]
                            bg-[#dff5e7]
                            px-3
                            py-1.5
                            rounded-lg
                            no-underline
                            hover:bg-[#c9eed6]
                            transition
                          "
                        >
                          View
                        </Link>

                        {/* Start */}
                        {task.status === "To Do" && (
                          <button
                            disabled={busyId === task._id}
                            onClick={() =>
                              changeStatus(
                                task,
                                "In Progress"
                              )
                            }
                            className="
                              text-xs
                              font-semibold
                              text-blue-700
                              bg-blue-50
                              px-3
                              py-1.5
                              rounded-lg
                              hover:bg-blue-100
                              transition
                              disabled:opacity-50
                            "
                          >
                            Start
                          </button>
                        )}

                        {/* Complete */}
                        {task.status !== "Completed" && (
                          <button
                            disabled={busyId === task._id}
                            onClick={() =>
                              changeStatus(
                                task,
                                "Completed"
                              )
                            }
                            className="
                              text-xs
                              font-semibold
                              text-green-700
                              bg-green-50
                              px-3
                              py-1.5
                              rounded-lg
                              hover:bg-green-100
                              transition
                              disabled:opacity-50
                            "
                          >
                            Complete
                          </button>
                        )}

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
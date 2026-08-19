"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyTasks, updateTaskStatus } from "@/api/tasks";

const statusColor = {
  "To Do": "bg-gray-100 text-gray-700 border border-gray-200",
  "In Progress": "bg-blue-50 text-blue-700 border border-blue-200",
  Review: "bg-purple-50 text-purple-700 border border-purple-200",
  Completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

const priorityColor = {
  Low: "text-emerald-600",
  Medium: "text-amber-600",
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
    <main className="min-h-screen rounded-3xl bg-gradient-to-br from-[#effaf3] via-[#f7fcf8] to-[#e4f5eb] p-6 md:p-8">

      {/* Header */}
      <div className="mb-8 flex items-center gap-4">

        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2d6a4f] to-[#40916c] shadow-md shadow-[#2d6a4f]/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a3 3 0 006 0M9 5h6m-6 7h6m-6 4h4"
            />
          </svg>
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#173c2b] md:text-3xl">
            My Tasks
          </h1>

          <p className="mt-1 text-sm text-[#64766b]">
            View, manage and update your assigned tasks
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-[#d4e9dc] bg-white/80 shadow-sm backdrop-blur">
          <div className="flex flex-col items-center gap-4">

            <div className="h-11 w-11 animate-spin rounded-full border-4 border-[#dcefe3] border-t-[#2d6a4f]" />

            <p className="text-sm font-medium text-[#506158]">
              Loading tasks...
            </p>
          </div>
        </div>
      )}

      {/* Tasks */}
      {!loading && (
        <div className="relative overflow-hidden rounded-3xl border border-[#b9dcc7] bg-white/80 shadow-[0_10px_35px_rgba(45,106,79,0.10)] backdrop-blur">

          {/* Top green accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#2d6a4f] via-[#52a675] to-[#a1d8b3]" />

          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#b7dec5]/20 blur-3xl" />

          {/* Table */}
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[800px] text-sm">

              {/* Header */}
              <thead>
                <tr className="border-b border-[#dcebe1] bg-[#eef8f2]/80 text-left">

                  <th className="px-6 py-4 font-semibold text-[#365f49]">
                    Task
                  </th>

                  <th className="px-6 py-4 font-semibold text-[#365f49]">
                    Priority
                  </th>

                  <th className="px-6 py-4 font-semibold text-[#365f49]">
                    Status
                  </th>

                  <th className="px-6 py-4 font-semibold text-[#365f49]">
                    Due Date
                  </th>

                  <th className="px-6 py-4 font-semibold text-[#365f49]">
                    Actions
                  </th>

                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {tasks.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-16 text-center"
                    >
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e4f3e9]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-[#2d6a4f]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a3 3 0 006 0M9 5h6"
                          />
                        </svg>
                      </div>

                      <p className="mt-4 font-semibold text-[#365f49]">
                        No tasks assigned
                      </p>

                      <p className="mt-1 text-sm text-[#718077]">
                        You don&apos;t have any tasks assigned to you yet.
                      </p>
                    </td>
                  </tr>
                )}

                {tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="group border-b border-[#edf3ee] last:border-b-0 transition-colors duration-200 hover:bg-[#f2faf5]"
                  >

                    {/* Task */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e4f3e9] text-[#287a50] transition-colors group-hover:bg-[#d6ecde]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a3 3 0 006 0M9 5h6"
                            />
                          </svg>
                        </div>

                        <span className="font-semibold text-[#183c2a]">
                          {task.title}
                        </span>

                      </div>
                    </td>

                    {/* Priority */}
                    <td className="px-6 py-5">
                      <span
                        className={`font-semibold ${
                          priorityColor[task.priority] || ""
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                          statusColor[task.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    {/* Due Date */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-[#53645a]">

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-[#40916c]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>

                        <span>
                          {task.deadline
                            ? new Date(
                                task.deadline
                              ).toLocaleDateString()
                            : "—"}
                        </span>

                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">

                        {/* View */}
                        <Link
                          href={`/member/tasks/${task._id}`}
                          className="rounded-lg border border-[#b9dcc7] bg-[#f0f8f3] px-3 py-1.5 text-xs font-semibold text-[#287a50] transition-all hover:bg-[#dff1e5] hover:text-[#17633f]"
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
                            className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition-all hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {busyId === task._id
                              ? "Updating..."
                              : "Start"}
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
                            className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-all hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {busyId === task._id
                              ? "Updating..."
                              : "Complete"}
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
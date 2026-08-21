"use client";

import { useEffect, useState } from "react";

import { getMyTasks } from "@/api/tasks";
import useAuthStore from "@/store/useAuthStore";

import {
  FaTasks,
  FaCheckCircle,
  FaHourglassHalf,
  FaExclamationTriangle,
} from "react-icons/fa";

function useClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 60 * 1000);

    return () => clearInterval(id);
  }, []);

  return now;
}

const statusColor = {
  "To Do": "border-gray-300",
  "In Progress": "border-blue-400",
  Review: "border-purple-400",
  Completed: "border-green-500",
};

const statusBadge = {
  "To Do": "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-50 text-blue-700",
  Review: "bg-purple-50 text-purple-700",
  Completed: "bg-green-50 text-green-700",
};

export default function MemberDashboardPage() {
  const user = useAuthStore((s) => s.user);

  const now = useClock();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // LOAD TASKS
  // =========================

  useEffect(() => {
    getMyTasks()
      .then((res) => setTasks(res.data.data))
      .catch((err) =>
        setError(
          err.response?.data?.message ||
            "Failed to load tasks"
        )
      )
      .finally(() => setLoading(false));
  }, []);

  // =========================
  // TASK CALCULATIONS
  // =========================

  const total = tasks.length;

  const completed = tasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const overdue = tasks.filter(
    (t) =>
      t.status !== "Completed" &&
      t.deadline &&
      new Date(t.deadline) < now
  ).length;

  const pending = total - completed - overdue;

  const percent = total
    ? Math.round((completed / total) * 100)
    : 0;

  const upcoming = tasks
    .filter(
      (t) =>
        t.status !== "Completed" &&
        t.deadline
    )
    .sort(
      (a, b) =>
        new Date(a.deadline) -
        new Date(b.deadline)
    )[0];

  const chipText = upcoming
    ? `Next due: ${upcoming.title} · ${new Date(
        upcoming.deadline
      ).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })}`
    : total
    ? "Nothing overdue — you're clear"
    : "No tasks assigned yet";

  const recent = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.updatedAt) -
        new Date(a.updatedAt)
    )
    .slice(0, 5);

  // =========================
  // PROGRESS CIRCLE
  // =========================

  const circumference = 2 * Math.PI * 26;

  const offset =
    circumference -
    (percent / 100) * circumference;

  // =========================
  // STAT CARDS
  // =========================

  const cards = [
    {
      label: "Total Assigned",
      value: total,
      icon: FaTasks,
      tint: "#2d6a4f",
      bg: "#e8f5ed",
    },
    {
      label: "Completed",
      value: completed,
      icon: FaCheckCircle,
      tint: "#198754",
      bg: "#e7f6ed",
    },
    {
      label: "Pending",
      value: pending,
      icon: FaHourglassHalf,
      tint: "#c98a3e",
      bg: "#fbf1e4",
    },
    {
      label: "Overdue",
      value: overdue,
      icon: FaExclamationTriangle,
      tint: "#c0392b",
      bg: "#fbeae8",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#eef9f2] via-[#f7fcf8] to-[#e3f4e9] p-5 md:p-8">

      {/* =========================
          PAGE CONTAINER
      ========================= */}

      <div className="mx-auto max-w-[1400px]">

        {/* =========================
            HERO SECTION
        ========================= */}

        <div className="relative overflow-hidden rounded-3xl border border-[#1e4434] bg-gradient-to-br from-[#10291f] via-[#143a2b] to-[#1c4d38] px-6 py-7 text-white shadow-[0_12px_35px_rgba(45,106,79,0.15)] md:px-9 md:py-8">

          {/* Decorative background */}

          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#65b887]/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#8ac8a0]/10 blur-3xl" />

          {/* Graph */}

          <svg
            className="pointer-events-none absolute right-0 top-0 h-full w-2/5 opacity-[0.12]"
            viewBox="0 0 400 200"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0 150 L60 90 L120 130 L180 40 L240 95 L300 20 L400 60"
              stroke="#b8e0c7"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

            {/* LEFT SIDE */}

            <div>

              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#9fc2af]">
                {now.toLocaleDateString(
                  undefined,
                  {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  }
                )}

                {" · "}

                {now.toLocaleTimeString(
                  undefined,
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Welcome,{" "}
                {user?.name?.split(" ")[0] ||
                  "there"}{" "}
                
              </h1>

              <p className="mt-2 text-sm text-[#b7cec0]">
                Here's what's happening with
                your tasks today.
              </p>

              {/* Next task */}

              <div className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-[#dce8e1] backdrop-blur-sm">

                <span className="h-2 w-2 shrink-0 rounded-full bg-[#e9b872] shadow-[0_0_8px_rgba(233,184,114,0.7)]" />

                <span className="truncate">
                  {loading
                    ? "Checking your board..."
                    : chipText}
                </span>

              </div>

            </div>

            {/* RIGHT SIDE - PROGRESS */}

            <div className="flex items-center gap-4 self-start rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm md:self-center">

              <div className="relative">

                <svg
                  width="78"
                  height="78"
                  viewBox="0 0 64 64"
                  className="-rotate-90"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="rgba(255,255,255,0.13)"
                    strokeWidth="6"
                    fill="none"
                  />

                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="#e9b872"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={
                      circumference
                    }
                    strokeDashoffset={
                      loading
                        ? circumference
                        : offset
                    }
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">

                  <span className="text-sm font-bold">
                    {loading
                      ? "—"
                      : `${percent}%`}
                  </span>

                </div>

              </div>

              <div>

                <p className="text-2xl font-bold leading-none">
                  {loading
                    ? "—"
                    : `${percent}%`}
                </p>

                <p className="mt-1 text-xs text-[#a9c4b4]">
                  {loading
                    ? "Loading"
                    : `${completed} of ${total} done`}
                </p>

              </div>

            </div>

          </div>
        </div>

        {/* =========================
            ERROR
        ========================= */}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 shadow-sm">
            {error}
          </div>
        )}

        {/* =========================
            STAT CARDS
        ========================= */}

        {!error && (
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.label}
                  className="group relative overflow-hidden rounded-2xl border border-[#d7e8dc] bg-white p-5 shadow-[0_5px_18px_rgba(45,106,79,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(45,106,79,0.12)]"
                >

                  {/* Top line */}

                  <div
                    className="absolute left-0 right-0 top-0 h-1 opacity-70"
                    style={{
                      backgroundColor:
                        card.tint,
                    }}
                  />

                  <div className="flex items-start justify-between">

                    {/* Icon */}

                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105"
                      style={{
                        backgroundColor:
                          card.bg,
                        color: card.tint,
                      }}
                    >
                      <Icon size={18} />
                    </div>

                    {/* Small circle */}

                    <div
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor:
                          card.tint,
                      }}
                    />

                  </div>

                  <p className="mt-4 text-sm font-medium text-[#5d6b63]">
                    {card.label}
                  </p>

                  <p
                    className="mt-1 text-3xl font-bold"
                    style={{
                      color: card.tint,
                    }}
                  >
                    {loading
                      ? "—"
                      : card.value}
                  </p>

                </div>
              );
            })}

          </div>
        )}

        {/* =========================
            RECENT ACTIVITY
        ========================= */}

        {!error && (
          <div className="mt-7 overflow-hidden rounded-2xl border border-[#d7e8dc] bg-white shadow-[0_5px_20px_rgba(45,106,79,0.06)]">

            {/* Header */}

            <div className="border-b border-[#e5eee8] px-5 py-5 md:px-6">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-lg font-bold text-[#183c2a]">
                    Recent Activity
                  </h2>

                  <p className="mt-1 text-xs text-[#718077]">
                    Your latest task updates
                  </p>

                </div>

                <div className="rounded-lg bg-[#e8f5ed] px-3 py-1.5 text-xs font-semibold text-[#2d6a4f]">
                  {recent.length}{" "}
                  {recent.length === 1
                    ? "Task"
                    : "Tasks"}
                </div>

              </div>

            </div>

            {/* Activity */}

            <div className="p-4 md:p-6">

              {!loading &&
                recent.length === 0 && (
                  <div className="rounded-xl border border-dashed border-[#c8dfcf] bg-[#f7fcf8] p-8 text-center">

                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5f4ea] text-[#2d6a4f]">

                      <FaTasks size={18} />

                    </div>

                    <p className="mt-3 text-sm font-semibold text-[#365f49]">
                      No activity yet
                    </p>

                    <p className="mt-1 text-xs text-[#718077]">
                      Your recent task activity
                      will appear here.
                    </p>

                  </div>
                )}

              <ul className="space-y-2">

                {recent.map((task) => (
                  <li
                    key={task._id}
                    className={`group flex flex-col gap-3 rounded-xl border-l-4 bg-[#f9fcfa] px-4 py-3 transition-all duration-200 hover:bg-[#f1f9f4] sm:flex-row sm:items-center sm:justify-between ${
                      statusColor[
                        task.status
                      ] ||
                      "border-gray-300"
                    }`}
                  >

                    {/* Task info */}

                    <div className="min-w-0">

                      <p className="truncate text-sm font-semibold text-[#183c2a]">
                        {task.title}
                      </p>

                      <p className="mt-1 truncate text-xs text-[#718077]">
                        {task.projectId?.title ||
                          "No project"}
                      </p>

                    </div>

                    {/* Right */}

                    <div className="flex shrink-0 items-center gap-3">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          statusBadge[
                            task.status
                          ] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {task.status}
                      </span>

                      <span className="text-xs text-[#718077]">
                        {new Date(
                          task.updatedAt
                        ).toLocaleDateString()}
                      </span>

                    </div>

                  </li>
                ))}

              </ul>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}
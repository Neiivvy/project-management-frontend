"use client";

import { useEffect, useState } from "react";

import { getMyTasks } from "@/api/tasks";
import useAuthStore from "@/store/useAuthStore";

import {
  FaTasks,
  FaCheckCircle,
  FaHourglassHalf,
  FaExclamationTriangle,
  FaArrowRight,
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
  "To Do": "bg-gray-100 text-gray-700 border-gray-200",
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
  Review: "bg-purple-50 text-purple-700 border-purple-200",
  Completed: "bg-green-50 text-green-700 border-green-200",
};

export default function MemberDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const now = useClock();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const circumference = 2 * Math.PI * 27;

  const offset =
    circumference -
    (percent / 100) * circumference;

  const cards = [
    {
      label: "Total Assigned",
      value: total,
      icon: FaTasks,
      tint: "#2d6a4f",
      bg: "#eaf5ee",
      description: "All assigned tasks",
    },
    {
      label: "Completed",
      value: completed,
      icon: FaCheckCircle,
      tint: "#16834b",
      bg: "#e8f7ee",
      description: "Successfully finished",
    },
    {
      label: "Pending",
      value: pending,
      icon: FaHourglassHalf,
      tint: "#c78632",
      bg: "#fff4e4",
      description: "Tasks still remaining",
    },
    {
      label: "Overdue",
      value: overdue,
      icon: FaExclamationTriangle,
      tint: "#c0392b",
      bg: "#fcebea",
      description: "Need your attention",
    },
  ];

  return (
    <main className="flex-1 min-h-screen bg-[#eef5f0] p-5 md:p-8">

      {/* ================= HERO ================= */}
      <section
        className="
          relative
          overflow-hidden
          rounded-[28px]
          bg-[#10291f]
          px-6
          py-7
          md:px-9
          md:py-9
          text-white
          shadow-[0_20px_50px_rgba(16,41,31,0.20)]
        "
      >
        {/* Background decorations */}
        <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#2d6a4f] opacity-30 blur-3xl" />

        <div className="absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-[#e9b872] opacity-[0.08] blur-3xl" />

        <div className="absolute right-10 top-10 h-2 w-2 rounded-full bg-[#e9b872]" />
        <div className="absolute right-32 top-24 h-1.5 w-1.5 rounded-full bg-white/40" />
        <div className="absolute right-20 bottom-16 h-2 w-2 rounded-full bg-[#9fb8ab]" />

        {/* Decorative line */}
        <svg
          className="
            absolute
            right-0
            top-0
            h-full
            w-2/5
            opacity-[0.12]
            pointer-events-none
          "
          viewBox="0 0 400 200"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 150 L60 90 L120 130 L180 40 L240 95 L300 20 L400 60"
            stroke="#e9b872"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div
          className="
            relative
            flex
            flex-col
            gap-8
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          {/* Welcome */}
          <div className="max-w-2xl">

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#e9b872] shadow-[0_0_12px_#e9b872]" />

              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#a9bdb2]">
                Member Dashboard
              </p>
            </div>

            <p className="mt-4 text-xs uppercase tracking-wider text-[#8fa99c]">
              {now.toLocaleDateString(undefined, {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
              {" · "}
              {now.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <h1
              className="
                mt-2
                text-3xl
                md:text-4xl
                font-bold
                tracking-tight
              "
            >
              Welcome Back,{" "}
              <span className="text-[#e9b872]">
                {user?.name?.split(" ")[0] ||
                  "there"}
              </span>{" "}
              👋
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-[#b9c9c0]">
              Stay focused, keep your tasks moving,
              and make progress toward your goals.
            </p>

            {/* Upcoming chip */}
            <div
              className="
                mt-5
                inline-flex
                max-w-full
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.08]
                px-4
                py-2
                text-xs
                text-[#dbe5df]
                backdrop-blur-md
              "
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#e9b872] shadow-[0_0_8px_#e9b872]" />

              <span className="truncate">
                {loading
                  ? "Checking your board..."
                  : chipText}
              </span>
            </div>
          </div>

          {/* Progress */}
          <div
            className="
              flex
              items-center
              gap-5
              self-start
              rounded-2xl
              border
              border-white/10
              bg-white/[0.06]
              px-5
              py-4
              backdrop-blur-md
              md:self-center
            "
          >
            <div className="relative">

              <svg
                width="88"
                height="88"
                viewBox="0 0 64 64"
                className="-rotate-90"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="27"
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth="5"
                  fill="none"
                />

                <circle
                  cx="32"
                  cy="32"
                  r="27"
                  stroke="#e9b872"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={
                    loading
                      ? circumference
                      : offset
                  }
                  className="
                    transition-all
                    duration-1000
                    ease-out
                  "
                />
              </svg>

              {/* Center */}
              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                "
              >
                <span className="text-sm font-bold text-white">
                  {loading
                    ? "—"
                    : `${percent}%`}
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-[#8fa99c]">
                Progress
              </p>

              <p className="mt-1 text-xl font-bold text-white">
                {loading
                  ? "Loading..."
                  : `${completed} of ${total}`}
              </p>

              <p className="text-xs text-[#8fa99c]">
                tasks completed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ERROR ================= */}
      {error && (
        <div
          className="
            mt-6
            rounded-2xl
            border
            border-red-200
            bg-red-50
            px-5
            py-4
            shadow-sm
          "
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
              <FaExclamationTriangle
                size={14}
                className="text-red-600"
              />
            </div>

            <p className="text-sm font-medium text-red-600">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* ================= STAT CARDS ================= */}
      {!error && (
        <section className="mt-8">

          <div className="mb-4">
            <h2 className="text-lg font-bold text-[#18251e]">
              Your Overview
            </h2>

            <p className="mt-1 text-xs text-[#718078]">
              A quick look at your current workload
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {cards.map((c) => (
              <div
                key={c.label}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#dce8df]
                  bg-white
                  p-5
                  shadow-[0_5px_20px_rgba(45,106,79,0.06)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_15px_35px_rgba(45,106,79,0.12)]
                "
              >
                {/* Card glow */}
                <div
                  className="
                    absolute
                    -right-8
                    -top-8
                    h-24
                    w-24
                    rounded-full
                    opacity-40
                    blur-2xl
                  "
                  style={{
                    backgroundColor: c.tint,
                  }}
                />

                <div className="relative">

                  <div className="flex items-start justify-between">

                    <span
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        transition-all
                        duration-300
                        group-hover:scale-110
                      "
                      style={{
                        backgroundColor: c.bg,
                        color: c.tint,
                      }}
                    >
                      <c.icon size={17} />
                    </span>

                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider"
                      style={{
                        color: c.tint,
                      }}
                    >
                      Stats
                    </span>
                  </div>

                  <p className="mt-5 text-xs font-medium text-[#68766e]">
                    {c.label}
                  </p>

                  <p
                    className="mt-1 text-3xl font-bold"
                    style={{
                      color: c.tint,
                    }}
                  >
                    {loading ? "—" : c.value}
                  </p>

                  <p className="mt-1 text-[11px] text-[#8a968f]">
                    {c.description}
                  </p>

                  <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#edf2ee]">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        backgroundColor: c.tint,
                        width: loading
                          ? "20%"
                          : total
                          ? `${Math.max(
                              10,
                              (c.value / total) *
                                100
                            )}%`
                          : "10%",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= RECENT ACTIVITY ================= */}
      {!error && (
        <section
          className="
            mt-8
            overflow-hidden
            rounded-2xl
            border
            border-[#dce8df]
            bg-white
            shadow-[0_5px_25px_rgba(45,106,79,0.07)]
          "
        >

          {/* Header */}
          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-[#edf1ee]
              px-6
              py-5
            "
          >
            <div>
              <h2 className="text-lg font-bold text-[#18251e]">
                Recent Activity
              </h2>

              <p className="mt-1 text-xs text-[#718078]">
                Your latest task updates
              </p>
            </div>

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#edf6f0]
              "
            >
              <FaTasks
                size={15}
                className="text-[#2d6a4f]"
              />
            </div>
          </div>

          {/* Activity */}
          <div className="p-4 md:p-6">

            {!loading && recent.length === 0 && (
              <div
                className="
                  rounded-2xl
                  border
                  border-dashed
                  border-[#cad9cf]
                  bg-[#f8fbf9]
                  px-6
                  py-12
                  text-center
                "
              >
                <div
                  className="
                    mx-auto
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-[#eaf4ed]
                  "
                >
                  <FaTasks
                    size={19}
                    className="text-[#789083]"
                  />
                </div>

                <p className="mt-4 text-sm font-semibold text-[#34463b]">
                  No activity yet
                </p>

                <p className="mt-1 text-xs text-[#7b8981]">
                  Your recent task updates will appear here.
                </p>
              </div>
            )}

            <ul className="space-y-3">

              {recent.map((t) => (
                <li
                  key={t._id}
                  className={`
                    group
                    flex
                    items-center
                    justify-between
                    gap-4
                    rounded-xl
                    border
                    border-[#edf1ee]
                    border-l-4
                    ${statusColor[t.status] || "border-gray-300"}
                    bg-[#fbfcfb]
                    px-4
                    py-4
                    transition-all
                    duration-200
                    hover:bg-[#f5f9f6]
                    hover:shadow-md
                  `}
                >
                  {/* Left */}
                  <div className="min-w-0">

                    <div className="flex items-center gap-2">

                      <span
                        className={`
                          h-2
                          w-2
                          shrink-0
                          rounded-full
                          ${
                            t.status ===
                            "Completed"
                              ? "bg-green-500"
                              : t.status ===
                                "In Progress"
                              ? "bg-blue-500"
                              : t.status ===
                                "Review"
                              ? "bg-purple-500"
                              : "bg-gray-400"
                          }
                        `}
                      />

                      <p className="truncate text-sm font-semibold text-[#18251e]">
                        {t.title}
                      </p>
                    </div>

                    <p className="mt-1 truncate pl-4 text-xs text-[#718078]">
                      {t.projectId?.title || "—"}
                    </p>
                  </div>

                  {/* Right */}
                  <div className="flex shrink-0 items-center gap-3">

                    <span
                      className={`
                        rounded-full
                        border
                        px-3
                        py-1.5
                        text-[10px]
                        font-semibold
                        ${statusBadge[t.status] || "bg-gray-100"}
                      `}
                    >
                      {t.status}
                    </span>

                    <span className="hidden text-right text-[11px] text-[#7a8880] sm:block">
                      {new Date(
                        t.updatedAt
                      ).toLocaleDateString()}
                    </span>

                    <FaArrowRight
                      size={11}
                      className="
                        text-[#b0bcb5]
                        transition-all
                        duration-200
                        group-hover:translate-x-1
                        group-hover:text-[#2d6a4f]
                      "
                    />
                  </div>
                </li>
              ))}

            </ul>
          </div>
        </section>
      )}

      {/* Bottom spacing */}
      <div className="h-4" />
    </main>
  );
}
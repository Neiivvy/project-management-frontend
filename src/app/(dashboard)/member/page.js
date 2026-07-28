"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import { getMyTasks } from "@/api/tasks";
import useAuthStore from "@/store/useAuthStore";
import { FaTasks, FaCheckCircle, FaHourglassHalf, FaExclamationTriangle } from "react-icons/fa";

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const statusColor = {
  "To Do": "border-gray-300",
  "In Progress": "border-blue-400",
  "Review": "border-purple-400",
  "Completed": "border-green-500",
};

const statusBadge = {
  "To Do": "bg-gray-200 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Review": "bg-purple-100 text-purple-700",
  "Completed": "bg-green-100 text-green-700",
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
      .catch((err) => setError(err.response?.data?.message || "Failed to load tasks"))
      .finally(() => setLoading(false));
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const overdue = tasks.filter(
    (t) => t.status !== "Completed" && t.deadline && new Date(t.deadline) < now
  ).length;
  const pending = total - completed - overdue;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  const upcoming = tasks
    .filter((t) => t.status !== "Completed" && t.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0];

  const chipText = upcoming
    ? `Next due: ${upcoming.title} · ${new Date(upcoming.deadline).toLocaleDateString(undefined, { month: "short", day: "numeric" })}`
    : total
    ? "Nothing overdue — you're clear"
    : "No tasks assigned yet";

  const recent = [...tasks]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  const circumference = 2 * Math.PI * 26;
  const offset = circumference - (percent / 100) * circumference;

  const cards = [
    { label: "Total Assigned", value: total, icon: FaTasks, tint: "#2d6a4f", bg: "#eef2ee" },
    { label: "Completed", value: completed, icon: FaCheckCircle, tint: "#1e824c", bg: "#eaf7ee" },
    { label: "Pending", value: pending, icon: FaHourglassHalf, tint: "#c98a3e", bg: "#fbf1e4" },
    { label: "Overdue", value: overdue, icon: FaExclamationTriangle, tint: "#c0392b", bg: "#fbeae8" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f7f6f6]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-8">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-2xl bg-[#12291f] px-8 py-7 text-white">
            <svg
              className="pointer-events-none absolute right-0 top-0 h-full w-2/5 opacity-[0.14]"
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

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#9fb8ab]">
                  {now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}
                  {" · "}
                  {now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                </p>

                <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
                  Welcome Back, {user?.name?.split(" ")[0] || "there"} 👋
                </h1>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-[#dce5df]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e9b872]" />
                  {loading ? "Checking your board..." : chipText}
                </div>
              </div>

              <div className="flex items-center gap-4 self-start md:self-center">
                <svg width="72" height="72" viewBox="0 0 64 64" className="shrink-0 -rotate-90">
                  <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.15)" strokeWidth="6" fill="none" />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="#e9b872"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={loading ? circumference : offset}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                <div>
                  <p className="text-2xl font-bold leading-none">{loading ? "—" : `${percent}%`}</p>
                  <p className="mt-1 text-xs text-[#9fb8ab]">
                    {loading ? "loading" : `${completed} of ${total} done`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {error && <p className="mt-6 text-red-600">{error}</p>}

          {/* Stat cards */}
          {!error && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {cards.map((c) => (
                <div key={c.label} className="bg-white rounded-xl shadow-sm p-5">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ backgroundColor: c.bg, color: c.tint }}
                  >
                    <c.icon size={16} />
                  </span>
                  <p className="mt-3 text-xs text-[#404943]">{c.label}</p>
                  <p className="text-3xl font-bold" style={{ color: c.tint }}>
                    {loading ? "—" : c.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Recent activity */}
          {!error && (
            <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-semibold text-[#181d19] mb-4">Recent Activity</h2>

              {!loading && recent.length === 0 && (
                <p className="text-sm text-[#404943]">No activity yet.</p>
              )}

              <ul className="space-y-1">
                {recent.map((t) => (
                  <li
                    key={t._id}
                    className={`flex items-center justify-between border-l-4 pl-4 py-3 ${statusColor[t.status] || "border-gray-300"}`}
                  >
                    <div>
                      <p className="text-sm font-medium text-[#181d19]">{t.title}</p>
                      <p className="text-xs text-[#404943]">{t.projectId?.title || "—"}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium rounded-full px-3 py-1 ${statusBadge[t.status] || "bg-gray-100"}`}>
                        {t.status}
                      </span>
                      <span className="text-xs text-[#404943] w-20 text-right">
                        {new Date(t.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

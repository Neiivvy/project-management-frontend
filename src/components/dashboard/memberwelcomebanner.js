"use client";

import { useEffect, useState } from "react";
import { getMyTasks } from "@/api/tasks";
import useAuthStore from "@/store/useAuthStore";

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function MemberWelcomeBanner() {
  const user = useAuthStore((state) => state.user);
  const now = useClock();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyTasks()
      .then((res) => setTasks(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  const upcoming = tasks
    .filter((t) => t.status !== "Completed" && t.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0];

  const chipText = upcoming
    ? `Next due: ${upcoming.title} · ${new Date(upcoming.deadline).toLocaleDateString(undefined, { month: "short", day: "numeric" })}`
    : total
    ? "Nothing overdue — you're clear"
    : "No tasks assigned yet";

  const circumference = 2 * Math.PI * 26;
  const offset = circumference - (percent / 100) * circumference;

  return (
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

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Hello, {user?.name?.split(" ")[0] || "there"}
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
              {loading ? "loading" : `${completed} of ${total} tasks done`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import {
  FiDownload,
  FiPrinter,
  FiCalendar,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiTrendingUp,
  FiChevronDown,
  FiFolder,
} from "react-icons/fi";

const summary = [
  { label: "Total tasks", value: "312", icon: FiFolder, tone: "indigo" },
  { label: "Completed", value: "218", icon: FiCheckCircle, tone: "emerald" },
  { label: "In progress", value: "71", icon: FiClock, tone: "amber" },
  { label: "Overdue", value: "23", icon: FiAlertTriangle, tone: "rose" },
];

const taskBreakdown = [
  { label: "Completed", value: 218, tone: "bg-emerald-500" },
  { label: "In progress", value: 71, tone: "bg-amber-400" },
  { label: "Overdue", value: 23, tone: "bg-rose-500" },
];
const taskTotal = taskBreakdown.reduce((sum, t) => sum + t.value, 0);

const projectProgress = [
  {
    name: "UI/UX Design",
    progress: 78,
    status: "On track",
    deadline: "Jul 14",
  },
  {
    name: "DashBoard Design",
    progress: 42,
    status: "At risk",
    deadline: "Jul 22",
  },
  {
    name: "Landing Page",
    progress: 91,
    status: "On track",
    deadline: "Jul 09",
  },
  {
    name: "Login & Register Form",
    progress: 15,
    status: "Behind",
    deadline: "Aug 01",
  },
  {
    name: "MongoDb Integration",
    progress: 60,
    status: "On track",
    deadline: "Jul 30",
  },
];

const teamPerformance = [
  { name: "Sagar Shrestha.", role: "Designer", completed: 42, assigned: 48 },
  { name: "Nikita Dangal.", role: "Engineer", completed: 35, assigned: 50 },
  { name: "Shovit Regmi", role: "Engineer", completed: 51, assigned: 55 },
  { name: "Pankaj Kumar Rajbanshi", role: "PM", completed: 28, assigned: 30 },
  { name: "Sumana Ranjit", role: "QA", completed: 33, assigned: 40 },
];

const milestones = [
  { label: "Discovery & scoping complete", date: "Jun 02", done: true },
  { label: "Design system finalized", date: "Jun 20", done: true },
  { label: "Beta release to internal team", date: "Jul 15", done: false },
  { label: "Public launch", date: "Aug 05", done: false },
];

const statusStyles = {
  "On track": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "At risk": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Behind: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

const toneStyles = {
  indigo: "bg-indigo-50 text-indigo-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-600",
};

const dateRanges = ["Last 7 days", "Last 30 days", "This quarter", "All time"];

export default function ProjectReportPage() {
  const [range, setRange] = useState(dateRanges[1]);
  const [rangeOpen, setRangeOpen] = useState(false);

  return (
    <div className="bg-slate-50 text-slate-900 mx-auto max-w-7xl px-4 py-2 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Project Report
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Performance summary across all active projects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setRangeOpen((o) => !o)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <FiCalendar className="h-4 w-4 text-slate-400" />
              {range}
              <FiChevronDown className="h-4 w-4 text-slate-400" />
            </button>
            {rangeOpen && (
              <div className="absolute right-0 z-10 mt-2 w-44 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                {dateRanges.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRange(r);
                      setRangeOpen(false);
                    }}
                    className={`block w-full px-3.5 py-2 text-left text-sm hover:bg-slate-50 ${
                      r === range
                        ? "font-medium text-indigo-600"
                        : "text-slate-600"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <FiPrinter className="h-4 w-4" />
            Print
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            <FiDownload className="h-4 w-4" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${toneStyles[s.tone]}`}
            >
              <s.icon className="h-4.5 w-4.5" />
            </span>
            <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">
              {s.value}
            </p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Task breakdown */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-1">
          <h2 className="text-sm font-semibold">Task status breakdown</h2>

          <div className="mt-5 flex justify-center">
            <DonutChart segments={taskBreakdown} total={taskTotal} />
          </div>

          <ul className="mt-5 space-y-2">
            {taskBreakdown.map((t) => (
              <li
                key={t.label}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-2 text-slate-600">
                  <span className={`h-2.5 w-2.5 rounded-full ${t.tone}`} />
                  {t.label}
                </span>
                <span className="font-medium tabular-nums text-slate-900">
                  {t.value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="text-sm font-semibold">Project progress</h2>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <FiTrendingUp className="h-3.5 w-3.5" />
              {range}
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {projectProgress.map((p) => (
              <div key={p.name} className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {p.name}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyles[p.status]}`}
                  >
                    {p.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-1.5 w-full rounded-full bg-slate-100">
                    <div
                      className="h-1.5 rounded-full bg-indigo-500"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <span className="w-10 shrink-0 text-right text-xs text-slate-400">
                    {p.progress}%
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">Due {p.deadline}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="text-sm font-semibold">Team performance</h2>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <FiUsers className="h-3.5 w-3.5" />
              {teamPerformance.length} members
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {teamPerformance.map((m) => {
              const rate = Math.round((m.completed / m.assigned) * 100);
              return (
                <div key={m.name} className="flex items-center gap-4 px-5 py-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                    {m.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      {m.name}
                    </p>
                    <p className="text-xs text-slate-400">{m.role}</p>
                  </div>
                  <div className="hidden w-32 sm:block">
                    <div className="h-1.5 w-full rounded-full bg-slate-100">
                      <div
                        className="h-1.5 rounded-full bg-emerald-500"
                        style={{ width: `${rate}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-16 shrink-0 text-right text-xs text-slate-500 tabular-nums">
                    {m.completed}/{m.assigned}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold">Upcoming milestones</h2>
          <ul className="mt-4 space-y-4">
            {milestones.map((ms, i) => (
              <li key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      ms.done
                        ? "bg-emerald-500 text-white"
                        : "border-2 border-slate-300 bg-white"
                    }`}
                  >
                    {ms.done && <FiCheckCircle className="h-3 w-3" />}
                  </span>
                  {i < milestones.length - 1 && (
                    <span className="mt-1 h-full w-px flex-1 bg-slate-200" />
                  )}
                </div>
                <div className="pb-4">
                  <p
                    className={`text-sm ${ms.done ? "text-slate-400 line-through" : "font-medium text-slate-900"}`}
                  >
                    {ms.label}
                  </p>
                  <p className="text-xs text-slate-400">{ms.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function DonutChart({ segments, total }) {
  const radius = 52;
  const stroke = 16;
  const circumference = 2 * Math.PI * radius;

  const colorMap = {
    "bg-emerald-500": "#10b981",
    "bg-amber-400": "#fbbf24",
    "bg-rose-500": "#f43f5e",
  };

  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <g transform="rotate(-90 70 70)">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={stroke}
        />

        {segments.map((seg, index) => {
          const fraction = seg.value / total;
          const dash = fraction * circumference;
          const gap = circumference - dash;

          const offset = segments
            .slice(0, index)
            .reduce(
              (sum, item) => sum + (item.value / total) * circumference,
              0,
            );

          return (
            <circle
              key={seg.label}
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={colorMap[seg.tone] || "#6366f1"}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
        })}
      </g>

      <text
        x="70"
        y="66"
        textAnchor="middle"
        className="fill-slate-900 text-xl font-semibold"
        style={{ fontSize: "22px" }}
      >
        {total}
      </text>

      <text
        x="70"
        y="86"
        textAnchor="middle"
        className="fill-slate-400"
        style={{ fontSize: "11px" }}
      >
        total tasks
      </text>
    </svg>
  );
}

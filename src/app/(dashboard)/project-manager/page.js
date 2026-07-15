"use client";

import { useEffect, useMemo, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import {
  FiFolder,
  FiClock,
  FiAlertTriangle,
  FiUsers,
  FiCheckCircle,
  FiChevronRight,
  FiFlag,
  FiTrendingUp,
} from "react-icons/fi";
import { getProjects } from "@/api/projectApi";
import Pagination from "./projects/components/Pagination";
import { FaUserFriends } from "react-icons/fa";
import { getTasks } from "@/api/taskApi";
import { getUsers } from "@/api/userApi";

const PENDING_TASKS = [
  {
    title: "Review API ",
    project: "PMS API",
    due: "Today",
    priority: "High",
  },
  {
    title: "Landing page",
    project: "E-Commerce",
    due: "Tomorrow",
    priority: "Medium",
  },
  {
    title: "Writting Project Report",
    project: "Project Clarity App",
    due: "Jul 10",
    priority: "Medium",
  },
  {
    title: "Payment Integration",
    project: "Esewa",
    due: "Jul 12",
    priority: "Low",
  },
  {
    title: "Set up MongoDB replica set locally",
    project: "MongoDB Integration",
    due: "Jul 13",
    priority: "Low",
  },
];

const OVERDUE_TASKS = [
  {
    title: "Fix bug on Project Clarity",
    project: "Project Clarity",
    assignee: "Nikita D.",
    daysOverdue: 3,
  },
  {
    title: "Review API",
    project: "PMS API",
    assignee: "Sagar S.",
    daysOverdue: 1,
  },
  {
    title: "Writting Project Report",
    project: "Project Clarity App",
    assignee: "Shovit R.",
    daysOverdue: 5,
  },
];

const TEAM_PROGRESS = [
  { name: "Sagar Shrestha", role: "Designer", completed: 42, assigned: 48 },
  { name: "Nikita Dangal", role: "Engineer", completed: 35, assigned: 50 },
  { name: "Shovit Regmi", role: "Engineer", completed: 51, assigned: 55 },
  { name: "Pankaj Rajbanshi", role: "PM", completed: 28, assigned: 30 },
  { name: "Sumana Ranjit", role: "QA", completed: 33, assigned: 40 },
];

const TASK_BREAKDOWN = [
  { label: "Completed", value: 96, tone: "bg-emerald-500", hex: "#10b981" },
  { label: "Pending", value: 42, tone: "bg-amber-400", hex: "#fbbf24" },
  { label: "Overdue", value: 12, tone: "bg-rose-500", hex: "#f43f5e" },
];
const TASK_TOTAL = TASK_BREAKDOWN.reduce((sum, t) => sum + t.value, 0);

const statusStyles = {
  planning: "bg-amber-50 text-amber-700 ring-amber-600/20",
  active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  completed: "bg-blue-50 text-blue-700 ring-blue-600/20",
};

const priorityStyles = {
  High: "bg-rose-500",
  Medium: "bg-amber-400",
  Low: "bg-slate-300",
};

const toneStyles = {
  indigo: "bg-indigo-50 text-indigo-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-600",
};

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [filter, setFilter] = useState("All");

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  const statusFilters = [
    "All",
    ...new Set(projects.map((project) => project.status)),
  ];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.status === filter);

  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject,
  );
  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadProjects();
  }, []);

  const totalProjects = projects.length;

  const completedProjects = projects.filter(
    (p) => p.status === "completed",
  ).length;

  const activeProjects = projects.filter((p) => p.status === "active").length;

  const pendingProjects = projects.filter(
    (p) => p.status === "planning",
  ).length;

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadTasks();
  }, []);
  const totalTasks = tasks.length;

  useEffect(() => {
    async function loadMembers() {
      try {
        const data = await getUsers();
        console.log(data);

        setUsers(data.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadMembers();
  }, []);
  const totalMembers = users.filter((user) => user.role === "member").length;

  const teamAvg = Math.round(
    (TEAM_PROGRESS.reduce((sum, m) => sum + m.completed / m.assigned, 0) /
      TEAM_PROGRESS.length) *
      100,
  );

  const summary = [
    {
      label: "My projects",
      value: totalProjects,
      icon: FiFolder,
      tone: "indigo",
    },
    {
      label: "Pending tasks",
      value: totalTasks,
      icon: FiClock,
      tone: "amber",
    },
    {
      label: "Total Members",
      value: totalMembers,
      icon: FaUserFriends,
      tone: "rose",
    },
    {
      label: "Team progress",
      value: `${teamAvg}%`,
      icon: FiUsers,
      tone: "emerald",
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mx-auto max-w-7xl bg-slate-50  py-6 text-slate-900 sm:px-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back, {user?.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here&rsquo;s what&rsquo;s happening across your projects today.
          </p>
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
            <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums ">
              {s.value}
            </p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-1">
          <h2 className="text-sm font-semibold">Task status breakdown</h2>

          <div className="mt-5 flex justify-center">
            <DonutChart segments={TASK_BREAKDOWN} total={TASK_TOTAL} />
          </div>

          <ul className="mt-5 space-y-2">
            {TASK_BREAKDOWN.map((t) => (
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
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <h2 className="text-sm font-semibold">My Projects</h2>

            <div className="flex flex-wrap gap-3">
              {statusFilters.map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`rounded-full px-5 py-1 text-xs font-medium transition ${
                    filter === status
                      ? " bg-[#2d6a4f] text-white"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {currentProjects.map((p) => (
              <div key={p._id} className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {p.title}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyles[p.status]}`}
                  >
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-1.5 w-full rounded-full bg-slate-100">
                    <div
                      className="h-1.5 rounded-full bg-[#2d6a4f]"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <span className="w-10 shrink-0 text-right text-xs text-slate-400">
                    {p.progress}%
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-3 text-xs text-slate-400">
                  <span>Due {p.deadline}</span>
                  <span>&middot;</span>
                  <span>
                    {p.tasksLeft} task{p.tasksLeft === 1 ? "" : "s"} left
                  </span>
                </div>
              </div>
            ))}

            {filteredProjects.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-slate-400">
                No projects match &ldquo;{filter}&rdquo;.
              </p>
            )}
            <Pagination
              totalItems={filteredProjects.length}
              itemsPerPage={projectsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Team progress */}
        <div className="rounded-xl border border-slate-200 bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="text-sm font-semibold">Team progress</h2>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <FiTrendingUp className="h-3.5 w-3.5" />
              This sprint
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {TEAM_PROGRESS.map((m) => {
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
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Pending tasks</h2>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
              {PENDING_TASKS.length}
            </span>
          </div>
          <ul className="mt-3 divide-y divide-slate-100">
            {PENDING_TASKS.map((t, i) => (
              <li key={i} className="flex items-start gap-2.5 py-3 first:pt-3">
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${priorityStyles[t.priority]}`}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {t.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {t.project} &middot; {t.due}
                  </p>
                </div>
                <FiChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-300" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-rose-100 bg-white">
        <div className="flex items-center justify-between border-b border-rose-50 px-5 py-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <FiFlag className="h-4 w-4 text-rose-500" />
            Overdue tasks
          </h2>
          <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600">
            {OVERDUE_TASKS.length} need attention
          </span>
        </div>
        <div className="divide-y divide-slate-100">
          {OVERDUE_TASKS.map((t, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900">{t.title}</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {t.project} &middot; assigned to {t.assignee}
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">
                <FiAlertTriangle className="h-3 w-3" />
                {t.daysOverdue}d overdue
              </span>
            </div>
          ))}
          {OVERDUE_TASKS.length === 0 && (
            <div className="flex items-center gap-2 px-5 py-8 text-sm text-slate-400">
              <FiCheckCircle className="h-4 w-4 text-emerald-500" />
              Nothing overdue — great work.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function DonutChart({ segments, total }) {
  const radius = 52;
  const stroke = 16;
  const circumference = 2 * Math.PI * radius;

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
              stroke={seg.hex}
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
        className="fill-slate-900 font-semibold"
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

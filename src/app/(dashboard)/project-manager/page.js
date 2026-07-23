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
  indigo: "bg-indigo-50 text-[#2d6a4f",
  emerald: "bg-emerald-50 text-[#2d6a4f",
  amber: "bg-amber-50 text-[#2d6a4f",
  rose: "bg-rose-50 text-[#2d6a4f",
  green: "bg-indigo-50 text-[#2d6a4f] ",
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

  const completedTasks = tasks.filter((t) => t.status === "Completed").length;

  const totalMembers = users.filter((user) => user.role === "member").length;

  const pendingTasks = tasks
    .filter((t) => t.status !== "Completed")
    .slice(0, 5);

  const teamProgress = users
    .filter((u) => u.role === "member")
    .map((member) => {
      const assigned = tasks.filter(
        (t) => t.assignedTo?._id === member._id,
      ).length;

      const completed = tasks.filter(
        (t) => t.assignedTo?._id === member._id && t.status === "Completed",
      ).length;

      return {
        ...member,
        assigned,
        completed,
      };
    });
  const teamAvg =
    teamProgress.length > 0
      ? Math.round(
          (teamProgress.reduce(
            (sum, m) => sum + (m.assigned > 0 ? m.completed / m.assigned : 0),
            0,
          ) /
            teamProgress.length) *
            100,
        )
      : 0;

  const inProgressTasks = tasks.filter(
    (t) => t.status === "In Progress",
  ).length;

  const todoTasks = tasks.filter((t) => t.status === "To Do").length;

  const overdue = tasks.filter(
    (task) =>
      task.status !== "completed" &&
      task.deadline &&
      new Date(task.deadline) < new Date(),
  );

  const TASK_BREAKDOWN = [
    {
      label: "Completed",
      value: completedTasks,
      tone: "bg-emerald-500",
      hex: "#10b981",
    },
    {
      label: "In Progress",
      value: inProgressTasks,
      tone: "bg-amber-500",
      hex: "#f59e0b",
    },
    {
      label: "To Do",
      value: todoTasks,
      tone: "bg-slate-500",
      hex: "#64748b",
    },
  ];

  const summary = [
    {
      label: "My Projects",
      value: totalProjects,
      icon: FiFolder,
      tone: "green",
    },
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: FiClock,
      tone: "amber",
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: FiCheckCircle,
      tone: "emerald",
    },
    {
      label: "Overdue",
      value: overdue.length,
      icon: FiAlertTriangle,
      tone: "rose",
    },
  ];

  const TASK_TOTAL = TASK_BREAKDOWN.reduce((sum, t) => sum + t.value, 0);

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
                  <span>
                    Due{": "}
                    {new Date(p.deadline).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
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
            {teamProgress.map((member) => {
              const rate =
                member.assigned > 0
                  ? Math.round((member.completed / member.assigned) * 100)
                  : 0;
              return (
                <div
                  key={member.name}
                  className="flex items-center gap-4 px-5 py-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                    {member.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      {member.name}
                    </p>
                    <p className="text-xs text-slate-400">{member.role}</p>
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
                    {member.completed}/{member.assigned}
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
              {pendingTasks.length}
            </span>
          </div>
          <ul className="mt-3 divide-y divide-slate-100">
            {pendingTasks.map((t) => (
              <li
                key={t._id}
                className="flex items-start gap-2.5 py-3 first:pt-3"
              >
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${priorityStyles[t.priority]}`}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {t.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {t.projectId?.title || "No Project"} &middot;{" "}
                    {new Date(t.deadline).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <FiChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-300" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-rose-100 bg-white max-w-190">
        <div className="flex items-center justify-between border-b border-rose-50 px-5 py-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <FiFlag className="h-4 w-4 text-rose-500" />
            Overdue Tasks
          </h2>

          <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600">
            {overdue.length} need attention
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {overdue.map((task) => {
            const daysOverdue = Math.max(
              0,
              Math.floor(
                (new Date() - new Date(task.deadline)) / (1000 * 60 * 60 * 24),
              ),
            );

            return (
              <div
                key={task._id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900">
                    {task.title}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    {task.projectId?.title || "No Project"} &middot; assigned to{" "}
                    {task.assignedTo?.name || "Unassigned"}
                  </p>
                </div>

                <span className="flex shrink-0 items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">
                  <FiAlertTriangle className="h-3 w-3" />
                  {daysOverdue} day{daysOverdue !== 1 ? "s" : ""} overdue
                </span>
              </div>
            );
          })}

          {overdue.length === 0 && (
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
          const fraction = total > 0 ? seg.value / total : 0;
          const dash = total > 0 ? fraction * circumference : 0;
          const gap = circumference - dash;
          const offset =
            total > 0
              ? segments
                  .slice(0, index)
                  .reduce(
                    (sum, item) => sum + (item.value / total) * circumference,
                    0,
                  )
              : 0;

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

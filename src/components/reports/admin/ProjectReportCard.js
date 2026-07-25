"use client";

import { useEffect, useRef } from "react";
import {
  FiFolder,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiInbox,
} from "react-icons/fi";

import TaskBreakdownChart from "./TaskBreakdownChart";

export default function ProjectReportCard({ report }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";

    const timeout = setTimeout(() => {
      el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  if (!report) return null;

  const stats = [
    {
      label: "Team Size",
      value: report.teamSize,
      icon: FiUsers,
      color: "#8b5cf6",
      bg: "bg-violet-50",
      border: "border-violet-100",
      numberColor: "#8b5cf6",
    },
    {
      label: "Total Tasks",
      value: report.totalTasks,
      icon: FiFolder,
      color: "#6366f1",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
      numberColor: "#6366f1",
    },
    {
      label: "Completed",
      value: report.completedTasks,
      icon: FiCheckCircle,
      color: "#059669",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      numberColor: "#059669",
    },
    {
      label: "Progress",
      value: `${report.completionPercentage}%`,
      icon: FiClock,
      color: "#f59e0b",
      bg: "bg-amber-50",
      border: "border-amber-100",
      numberColor: "#f59e0b",
    },
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "on hold":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div
      ref={cardRef}
      className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="relative bg-linear-to-r from-[#0f5238]/5 to-[#2d6a4f]/5 p-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#0f5238] to-[#2d6a4f] text-white text-xl font-bold shadow-lg shadow-[#0f5238]/20">
              {report.projectName?.charAt(0)?.toUpperCase() || "P"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#181d19]">
                {report.projectName}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Manager: {report.manager}
              </p>
            </div>
          </div>

          <span
            className={`
              self-start px-3 py-1.5 rounded-lg text-xs font-semibold border
              ${getStatusColor(report.status)}
            `}
          >
            {report.status}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <FiClock className="text-xs" />
            <span>
              Deadline:{" "}
              {report.deadline
                ? new Date(report.deadline).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "No deadline"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((stat, index) => (
            <StatBadge
              key={stat.label}
              stat={stat}
              index={index}
            />
          ))}
        </div>

        {/* Completion Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              Project Completion
            </span>
            <span className="text-sm font-bold text-[#059669]">
              {report.completionPercentage}%
            </span>
          </div>

          <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-[#0f5238] to-[#10b981] transition-all duration-1000 ease-out"
              style={{ width: `${report.completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Chart */}
        <TaskBreakdownChart
          data={{
            completedTasks: report.completedTasks,
            inProgressTasks: report.inProgressTasks,
            todoTasks: report.todoTasks,
            reviewTasks: report.reviewTasks,
          }}
        />

        {/* Team Performance */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#8b5cf6]/10 text-[#8b5cf6]">
              <FiUsers className="text-sm" />
            </div>
            <h3 className="text-base font-semibold text-[#181d19]">
              Team Performance
            </h3>
          </div>

          <div className="space-y-2.5">
            {Object.entries(report.tasksByMember || {}).length > 0 ? (
              Object.entries(report.tasksByMember).map(
                ([member, stats], index) => (
                  <TeamMemberRow
                    key={member}
                    member={member}
                    stats={stats}
                    index={index}
                  />
                )
              )
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 mb-2">
                  <FiInbox className="text-xl" />
                </div>
                <p className="text-sm text-slate-500">
                  No team data available.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBadge({ stat, index }) {
  const badgeRef = useRef(null);

  useEffect(() => {
    const el = badgeRef.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "scale(0.9)";

    const timeout = setTimeout(() => {
      el.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";
      el.style.opacity = "1";
      el.style.transform = "scale(1)";
    }, 200 + index * 50);

    return () => clearTimeout(timeout);
  }, [index]);

  const Icon = stat.icon;

  return (
    <div
      ref={badgeRef}
      className={`
        group relative overflow-hidden
        ${stat.bg} ${stat.border}
        border rounded-xl p-3.5
        transition-all duration-300
        hover:shadow-md
        hover:-translate-y-0.5
      `}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Icon
          className="text-sm"
          style={{ color: stat.color }}
        />
        <span className="text-xs font-medium text-slate-500">
          {stat.label}
        </span>
      </div>

      <p
        className="text-2xl font-bold tracking-tight"
        style={{ color: stat.numberColor }}
      >
        {stat.value ?? 0}
      </p>
    </div>
  );
}

function TeamMemberRow({ member, stats, index }) {
  const rowRef = useRef(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateX(-10px)";

    const timeout = setTimeout(() => {
      el.style.transition = "opacity 0.3s ease-out, transform 0.3s ease-out";
      el.style.opacity = "1";
      el.style.transform = "translateX(0)";
    }, index * 40);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div
      ref={rowRef}
      className="
        group
        bg-slate-50/50
        border border-slate-100
        rounded-xl
        p-4
        transition-all duration-200
        hover:bg-white
        hover:border-slate-200
        hover:shadow-sm
      "
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0f5238]/10 text-[#0f5238] font-semibold text-sm">
            {member?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <p className="font-semibold text-[#181d19] group-hover:text-[#0f5238] transition-colors">
            {member}
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-500">
            Assigned:{" "}
            <span className="font-semibold text-[#181d19]">{stats.assigned}</span>
          </span>
          <span className="w-px h-4 bg-slate-200" />
          <span className="text-slate-500">
            Completed:{" "}
            <span className="font-semibold text-emerald-600">{stats.completed}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

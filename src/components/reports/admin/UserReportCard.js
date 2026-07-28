"use client";

import { useEffect, useRef } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiEye,
  FiInbox,
} from "react-icons/fi";

import TaskBreakdownChart from "./TaskBreakdownChart";

export default function UserReportCard({ report }) {
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
      label: "Total Tasks",
      value: report.totalAssignedTasks,
      icon: FiFileText,
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
      label: "In Progress",
      value: report.inProgressTasks,
      icon: FiClock,
      color: "#f59e0b",
      bg: "bg-amber-50",
      border: "border-amber-100",
      numberColor: "#f59e0b",
    },
    {
      label: "To Do",
      value: report.todoTasks,
      icon: FiFileText,
      color: "#6b7280",
      bg: "bg-gray-50",
      border: "border-gray-100",
      numberColor: "#6b7280",
    },
    {
      label: "Review",
      value: report.reviewTasks,
      icon: FiEye,
      color: "#8b5cf6",
      bg: "bg-violet-50",
      border: "border-violet-100",
      numberColor: "#8b5cf6",
    },
  ];

  return (
    <div
      ref={cardRef}
      className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="relative bg-linear-to-r from-[#3b82f6]/5 to-[#8b5cf6]/5 p-6 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#3b82f6] to-[#8b5cf6] text-white text-xl font-bold shadow-lg shadow-[#3b82f6]/20">
            {report.userName?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#181d19]">
              {report.userName}
            </h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#3b82f6]/10 text-[#3b82f6] mt-1">
              {report.userRole}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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
              Completion Rate
            </span>
            <span className="text-sm font-bold text-[#059669]">
              {report.completionPercentage}%
            </span>
          </div>

          <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-[#059669] to-[#10b981] transition-all duration-1000 ease-out"
              style={{ width: `${report.completionPercentage}%` }}
            />
          </div>

          <p className="text-xs text-slate-500">
            {report.completedTasks} of {report.totalAssignedTasks} tasks completed
          </p>
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

        {/* Task List */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6366f1]/10 text-[#6366f1]">
              <FiFileText className="text-sm" />
            </div>
            <h3 className="text-base font-semibold text-[#181d19]">
              Assigned Tasks
            </h3>
          </div>

          <div className="space-y-2.5">
            {report.tasks?.length > 0 ? (
              report.tasks.map((task, index) => (
                <TaskItem
                  key={index}
                  task={task}
                  index={index}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 mb-2">
                  <FiInbox className="text-xl" />
                </div>
                <p className="text-sm text-slate-500">
                  No assigned tasks found.
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

function TaskItem({ task, index }) {
  const itemRef = useRef(null);

  useEffect(() => {
    const el = itemRef.current;
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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "in progress":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "todo":
        return "bg-slate-50 text-slate-600 border-slate-200";
      case "review":
        return "bg-violet-50 text-violet-700 border-violet-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-amber-600 bg-amber-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-slate-500 bg-slate-50";
    }
  };

  return (
    <div
      ref={itemRef}
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#181d19] truncate">
            {task.taskTitle}
          </p>
          <p className="text-sm text-slate-500 mt-0.5">
            Project: {task.projectName}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`
              px-2.5 py-1 rounded-lg text-xs font-medium border
              ${getStatusColor(task.status)}
            `}
          >
            {task.status}
          </span>

          <span
            className={`
              px-2.5 py-1 rounded-lg text-xs font-medium
              ${getPriorityColor(task.priority)}
            `}
          >
            {task.priority}
          </span>
        </div>
      </div>
    </div>
  );
}

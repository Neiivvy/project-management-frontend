"use client";

import { motion } from "framer-motion";
import {
  FolderOpen,
  CheckSquare,
  Shield,
  BarChart3,
  Calendar,
  UserCheck,
  Lock,
  TrendingUp,
} from "lucide-react";

const capabilities = [
  {
    id: "projects",
    icon: FolderOpen,
    title: "Project Management",
    description:
      "Create projects, set milestones, and keep every initiative visible in one place.",
    visual: "timeline",
  },
  {
    id: "tasks",
    icon: CheckSquare,
    title: "Task Assignment",
    description:
      "Break work into tasks, assign owners, and track progress in real time.",
    visual: "tasklist",
  },
  {
    id: "roles",
    icon: Shield,
    title: "Role-Based Access",
    description:
      "Define permissions for admins, managers, and members with precision.",
    visual: "permissions",
  },
  {
    id: "reports",
    icon: BarChart3,
    title: "Reports & Analytics",
    description:
      "Generate insights on delivery, team performance, and project health.",
    visual: "stats",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function TimelineVisual() {
  const milestones = [
    { label: "Kickoff", status: "done" },
    { label: "Design", status: "done" },
    { label: "Development", status: "active" },
    { label: "Launch", status: "upcoming" },
  ];

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between mb-2">
        {milestones.map((m, i) => (
          <div key={m.label} className="flex flex-col items-center">
            <div
              className={`h-2.5 w-2.5 rounded-full border-2 ${
                m.status === "done"
                  ? "bg-[#498f70] border-[#498f70]"
                  : m.status === "active"
                  ? "bg-white border-[#498f70]"
                  : "bg-white border-[#D8E5DD]"
              }`}
            />
            <span className="text-[10px] text-[#6B7280] mt-1 whitespace-nowrap">
              {m.label}
            </span>
          </div>
        ))}
      </div>
      <div className="relative h-1 w-full rounded-full bg-[#EEF5F1]">
        <div className="absolute inset-y-0 left-0 w-3/4 rounded-full bg-linear-to-r from-[#498f70] to-[#3a7d5d]" />
      </div>
    </div>
  );
}

function TaskListVisual() {
  const tasks = [
    { title: "Design system", assignee: "JD", done: true },
    { title: "API endpoints", assignee: "SK", done: false },
    { title: "Write tests", assignee: "MR", done: false },
  ];

  return (
    <div className="mt-5 space-y-2">
      {tasks.map((task) => (
        <div
          key={task.title}
          className="flex items-center gap-2.5 p-2 rounded-md bg-[#F7FAF8] border border-[#D8E5DD]/60"
        >
          <div
            className={`h-3.5 w-3.5 rounded border flex items-center justify-center shrink-0 ${
              task.done
                ? "bg-[#498f70] border-[#498f70]"
                : "border-[#D8E5DD]"
            }`}
          >
            {task.done && (
              <svg
                className="h-2 w-2 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span
            className={`text-xs flex-1 ${
              task.done ? "text-[#6B7280] line-through" : "text-[#374151]"
            }`}
          >
            {task.title}
          </span>
          <div className="h-5 w-5 rounded-full bg-[#498f70]/10 flex items-center justify-center text-[8px] font-bold text-[#498f70]">
            {task.assignee}
          </div>
        </div>
      ))}
    </div>
  );
}

function PermissionsVisual() {
  const roles = [
    { name: "Admin", color: "bg-[#498f70]", perms: 4 },
    { name: "PM", color: "bg-[#2d6a4f]", perms: 3 },
    { name: "Member", color: "bg-[#3a7d5d]", perms: 1 },
  ];

  return (
    <div className="mt-5 space-y-2.5">
      {roles.map((role) => (
        <div
          key={role.name}
          className="flex items-center gap-3 p-2.5 rounded-md bg-[#F7FAF8] border border-[#D8E5DD]/60"
        >
          <div
            className={`h-7 w-7 rounded-lg ${role.color} flex items-center justify-center`}
          >
            <Lock className="h-3.5 w-3.5 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-medium text-[#374151]">{role.name}</div>
            <div className="flex gap-1 mt-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i < role.perms ? "bg-[#498f70]" : "bg-[#D8E5DD]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StatsVisual() {
  const stats = [
    { label: "On Time", value: "87%", trend: "up" },
    { label: "Tasks", value: "156", trend: "up" },
    { label: "Teams", value: "12", trend: "neutral" },
  ];

  return (
    <div className="mt-5 grid grid-cols-3 gap-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="p-2.5 rounded-lg bg-[#F7FAF8] border border-[#D8E5DD]/60 text-center"
        >
          <div className="text-lg font-bold text-[#111827]">{stat.value}</div>
          <div className="text-[10px] text-[#6B7280] uppercase tracking-wider mt-0.5">
            {stat.label}
          </div>
          {stat.trend === "up" && (
            <TrendingUp className="h-3 w-3 text-[#498f70] mx-auto mt-1" />
          )}
        </div>
      ))}
    </div>
  );
}

const visualComponents = {
  timeline: TimelineVisual,
  tasklist: TaskListVisual,
  permissions: PermissionsVisual,
  stats: StatsVisual,
};

export default function CoreCapabilities() {
  return (
    <section className="py-24 bg-[#F7FAF8] px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest uppercase text-[#498f70]">
            Core Capabilities
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-[#111827] tracking-tight">
            Everything your team needs
          </h2>
          <p className="mt-4 text-[#374151] max-w-2xl mx-auto">
            A focused set of tools for planning, executing, and reviewing work.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            const VisualComponent = visualComponents[cap.visual];

            return (
              <div
                key={cap.id}
                className="group relative rounded-2xl bg-white border border-[#D8E5DD] p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#498f70]/5 hover:border-[#498f70]/20 hover:-translate-y-1"
              >
                <div className="h-11 w-11 rounded-xl bg-[#498f70]/5 flex items-center justify-center group-hover:bg-[#498f70]/10 transition-colors">
                  <Icon className="h-5 w-5 text-[#498f70]" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-[#111827]">
                  {cap.title}
                </h3>
                <p className="mt-1.5 text-sm text-[#374151] leading-relaxed">
                  {cap.description}
                </p>

                {VisualComponent && <VisualComponent />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

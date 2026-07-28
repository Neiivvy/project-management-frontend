"use client";

import { useEffect, useRef } from "react";
import {
  FolderKanban,
  Clock3,
  Activity,
  CheckCircle2,
} from "lucide-react";

const STATS_CONFIG = [
  {
    label: "Total Projects",
    icon: FolderKanban,
    color: "#0f5238",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    numberColor: "#0f5238",
  },
  {
    label: "Planning",
    icon: Clock3,
    color: "#f59e0b",
    bg: "bg-amber-50",
    border: "border-amber-100",
    numberColor: "#f59e0b",
  },
  {
    label: "Active",
    icon: Activity,
    color: "#3b82f6",
    bg: "bg-blue-50",
    border: "border-blue-100",
    numberColor: "#3b82f6",
  },
  {
    label: "Completed",
    icon: CheckCircle2,
    color: "#10b981",
    bg: "bg-teal-50",
    border: "border-teal-100",
    numberColor: "#10b981",
  },
];

export default function ProjectStatsBar({ projects }) {
  const total = projects.length;

  const planning = projects.filter(
    (p) => p.status === "planning"
  ).length;

  const active = projects.filter(
    (p) => p.status === "active"
  ).length;

  const completed = projects.filter(
    (p) => p.status === "completed"
  ).length;

  const values = [total, planning, active, completed];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {STATS_CONFIG.map((stat, index) => (
        <StatCard
          key={stat.label}
          stat={stat}
          value={values[index]}
          index={index}
        />
      ))}
    </div>
  );
}

function StatCard({ stat, value, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(15px)";

    const timeout = setTimeout(() => {
      el.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 60);

    return () => clearTimeout(timeout);
  }, [index]);

  const Icon = stat.icon;

  return (
    <div
      ref={cardRef}
      className={`
        group relative overflow-hidden
        bg-white
        border ${stat.border}
        rounded-2xl
        p-5
        shadow-sm
        transition-all duration-300
        hover:shadow-md
        hover:-translate-y-1
        cursor-default
      `}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${stat.color}08 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${stat.color}15`,
            color: stat.color,
          }}
        >
          <Icon className="text-lg" />
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500">
            {stat.label}
          </p>
          <p
            className="text-2xl font-bold tracking-tight"
            style={{ color: stat.numberColor }}
          >
            {value ?? 0}
          </p>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: stat.color }}
      />
    </div>
  );
}

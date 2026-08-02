"use client";

import { FiFolder, FiCheckCircle, FiClock } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";

const toneStyles = {
  indigo: "bg-indigo-50 text-indigo-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-600",
};

export default function ReportSummary({ projectStats = {} }) {
  const summary = [
    {
      label: "Total Projects",
      value: projectStats.totalProjects || 0,
      icon: FiFolder,
      tone: "indigo",
    },
    {
      label: "Completed",
      value: projectStats.completedProjects,
      icon: FiCheckCircle,
      tone: "emerald",
    },
    {
      label: "Active",
      value: projectStats.activeProjects,
      icon: FiClock,
      tone: "amber",
    },
    {
      label: "Planning",
      value: projectStats.planningProjects,
      icon: FaTasks,
      tone: "rose",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summary.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-lg ${toneStyles[item.tone]}`}
            >
              <Icon className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-3xl font-bold text-slate-900">
              {item.value}
            </h3>

            <p className="mt-1 text-sm text-slate-500">{item.label}</p>
          </div>
        );
      })}
    </div>
  );
}

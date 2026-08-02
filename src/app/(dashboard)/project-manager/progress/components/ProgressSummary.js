"use client";

import { FiCheckCircle, FiClock, FiList, FiPlayCircle } from "react-icons/fi";

export default function ProgressSummary({ progress }) {
  if (!progress) return null;

  const cards = [
    {
      label: "Total Tasks",
      value: progress.total,
      icon: FiList,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "To Do",
      value: progress.byStatus["To Do"] || 0,
      icon: FiClock,
      color: "bg-slate-50 text-slate-600",
    },
    {
      label: "In Progress",
      value: progress.byStatus["In Progress"] || 0,
      icon: FiPlayCircle,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Completed",
      value: progress.byStatus["Completed"] || 0,
      icon: FiCheckCircle,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-lg ${card.color}`}
            >
              <Icon size={20} />
            </div>

            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              {card.value}
            </h2>

            <p className="mt-1 text-sm text-gray-500">{card.label}</p>
          </div>
        );
      })}
    </div>
  );
}

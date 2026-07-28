"use client";

import { useEffect, useRef } from "react";
import {
  FiUsers,
  FiUser,
  FiUserCheck,
  FiShield,
  FiFolder,
  FiActivity,
  FiCheckSquare,
  FiCheckCircle,
  FiClock,
  FiFileText,
} from "react-icons/fi";

export default function OverviewCards({ overview }) {
  if (!overview) return null;

  const cards = [
    {
      title: "Total Users",
      value: overview.users.total,
      icon: FiUsers,
      color: "#800000",
      bg: "bg-red-50",
      border: "border-red-100",
      numberColor: "#800000",
    },
    {
      title: "Members",
      value: overview.users.members,
      icon: FiUser,
      color: "#2563eb",
      bg: "bg-blue-50",
      border: "border-blue-100",
      numberColor: "#2763eb",
    },
    {
      title: "Project Managers",
      value: overview.users.projectManagers,
      icon: FiUserCheck,
      color: "#0d9488",
      bg: "bg-teal-50",
      border: "border-teal-100",
      numberColor: "#0d9488",
    },
    {
      title: "Admins",
      value: overview.users.admins,
      icon: FiShield,
      color: "#eab308",
      bg: "bg-yellow-50",
      border: "border-yellow-100",
      numberColor: "#ca8a04",
    },
    {
      title: "Total Projects",
      value: overview.projects.total,
      icon: FiFolder,
      color: "#16a34a",
      bg: "bg-green-50",
      border: "border-green-100",
      numberColor: "#16a34a",
    },
    {
      title: "Active Projects",
      value: overview.projects.active,
      icon: FiActivity,
      color: "#dc2626",
      bg: "bg-red-50",
      border: "border-red-100",
      numberColor: "#dc2626",
    },
    {
      title: "Total Tasks",
      value: overview.tasks.total,
      icon: FiCheckSquare,
      color: "#92400e",
      bg: "bg-orange-50",
      border: "border-orange-100",
      numberColor: "#92400e",
    },
    {
      title: "Completed Tasks",
      value: overview.tasks.completed,
      icon: FiCheckCircle,
      color: "#6b7280",
      bg: "bg-gray-50",
      border: "border-gray-100",
      numberColor: "#6b7280",
    },
    {
      title: "In Progress Tasks",
      value: overview.tasks.inProgress,
      icon: FiClock,
      color: "#181d19",
      bg: "bg-slate-100",
      border: "border-slate-200",
      numberColor: "#181d19",
    },
    {
      title: "Todo Tasks",
      value: overview.tasks.todo,
      icon: FiFileText,
      color: "#d4a373",
      bg: "bg-orange-50",
      border: "border-orange-100",
      numberColor: "#b8860b",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <StatCard
          key={card.title}
          card={card}
          index={index}
        />
      ))}
    </div>
  );
}

function StatCard({ card, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";

    const timeout = setTimeout(() => {
      el.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 60);

    return () => clearTimeout(timeout);
  }, [index]);

  const Icon = card.icon;

  return (
    <div
      ref={cardRef}
      className={`
        group relative overflow-hidden
        bg-white
        border ${card.border}
        rounded-2xl
        p-5
        shadow-sm
        transition-all duration-300
        hover:shadow-md
        hover:-translate-y-1
        hover:border-opacity-60
        cursor-default
      `}
    >
      {/* Subtle gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${card.color}08 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `${card.color}15`,
              color: card.color,
            }}
          >
            <Icon className="text-lg" />
          </div>
          <span
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{
              backgroundColor: `${card.color}15`,
              color: card.color,
            }}
          >
            {card.title}
          </span>
        </div>

        <p
          className="text-3xl font-bold tracking-tight"
          style={{ color: card.numberColor }}
        >
          {card.value ?? 0}
        </p>

        <p className="text-xs text-slate-400 mt-1 font-medium">
          {card.title}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: card.color }}
      />
    </div>
  );
}

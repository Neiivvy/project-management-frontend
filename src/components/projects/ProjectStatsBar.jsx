"use client";

import {
  FolderKanban,
  Clock3,
  Activity,
  CheckCircle2,
} from "lucide-react";
import StatCard from "@/components/shared/StatCard";

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

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        icon={FolderKanban}
        label="Total Projects"
        value={total}
      />

      <StatCard
        icon={Clock3}
        label="Planning"
        value={planning}
      />

      <StatCard
        icon={Activity}
        label="Active"
        value={active}
      />

      <StatCard
        icon={CheckCircle2}
        label="Completed"
        value={completed}
      />
    </div>
  );
}
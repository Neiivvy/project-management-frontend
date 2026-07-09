// components/projects/ProjectStatsBar.jsx
"use client";

import { FolderKanban, Activity, AlertTriangle, CheckCircle2 } from "lucide-react";
import StatCard from "@/components/shared/StatCard";

export default function ProjectStatsBar({ projects }) {
  const total = projects.length;
  const active = projects.filter((p) => p.status === "active").length;
  const atRisk = projects.filter((p) => p.status === "at-risk").length;
  const completed = projects.filter((p) => p.status === "completed").length;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard icon={FolderKanban} label="Total Projects" value={total} trend={12} />
      <StatCard icon={Activity} label="Active" value={active} trend={6} />
      <StatCard icon={AlertTriangle} label="At Risk" value={atRisk} trend={atRisk > 0 ? 15 : 0} trendLabel="needs attention" />
      <StatCard icon={CheckCircle2} label="Completed" value={completed} />
    </div>
  );
}

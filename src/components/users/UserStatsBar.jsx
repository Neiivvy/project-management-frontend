"use client";

import {
  Users,
  ShieldCheck,
  ClipboardList,
  User,
} from "lucide-react";
import StatCard from "@/components/shared/StatCard";

export default function UserStatsBar({ users }) {
  const total = users.length;

  const admins = users.filter(
    (u) => u.role === "admin"
  ).length;

  const projectManagers = users.filter(
    (u) => u.role === "project_manager"
  ).length;

  const members = users.filter(
    (u) => u.role === "member"
  ).length;

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      <StatCard
        icon={Users}
        label="Total Users"
        value={total}
        color="#800000"
      />

      <StatCard
        icon={ShieldCheck}
        label="Admins"
        value={admins}
        color="#0f5238"
      />

      <StatCard
        icon={ClipboardList}
        label="Project Managers"
        value={projectManagers}
        color="#0d7377"
      />

      <StatCard
        icon={User}
        label="Members"
        value={members}
        color="#b8960f"
      />
    </div>
  );
}
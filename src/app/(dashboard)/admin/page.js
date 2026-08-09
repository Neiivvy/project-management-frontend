"use client";

import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import useDashboardStore from "@/store/admin/useDashboardStore";

import { FiUsers, FiFolder, FiUserCheck, FiCheckCircle } from "react-icons/fi";

import StatCard from "@/components/dashboard/admin/StatCard";
import RecentActivity from "@/components/dashboard/admin/RecentActivity";
import QuickActions from "@/components/dashboard/admin/QuickActions";
import RoleDistribution from "@/components/dashboard/admin/RoleDistribution";

export default function AdminPage() {
  const user = useAuthStore((state) => state.user);

  const { summary, fetchSummary, isLoading } = useDashboardStore();

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  if (isLoading || !summary) {
    return <div className="p-8 text-gray-500">Loading Dashboard...</div>;
  }

  return (
    <div>
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-[#181d19]">
          Welcome back, {user?.name}
        </h1>

        <p className="mt-1 text-[#697268]">
          Here&apos;s what&apos;s happening across Co-Work today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard
          icon={FiUsers}
          label="Total Users"
          value={summary.totalUsers ?? 0}
          color="#1a7a4c"
        />

        <StatCard
          icon={FiFolder}
          label="Projects"
          value={summary.totalProjects ?? 0}
          color="#c9a000"
        />

        <StatCard
          icon={FiUserCheck}
          label="Project Managers"
          value={summary.projectManagers ?? 0}
          color="#2563eb"
        />

        <StatCard
          icon={FiCheckCircle}
          label="Completed Tasks"
          value={summary.completedTasks ?? 0}
          color="#c2410c"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        <div className="space-y-6">
          <QuickActions />
          <RoleDistribution summary={summary} />
        </div>
      </div>
    </div>
  );
}

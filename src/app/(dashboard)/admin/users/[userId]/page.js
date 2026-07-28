"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Briefcase, ListChecks, ShieldCheck } from "lucide-react";

import useUserDetailStore from "@/store/admin/useUserDetailStore";

import UserDetailHeader from "@/components/users/detail/UserDetailHeader";
import UserStatsCard from "@/components/users/detail/UserStatsCard";
import ManagedProjectsGrid from "@/components/users/detail/ManagedProjectsGrid";
import UserProjectsGrid from "@/components/users/detail/UserProjectsGrid";
import UserTasksTable from "@/components/users/detail/UserTasksTable";

function SectionHeading({ icon: Icon, title, count, tone = "green" }) {
  const tones = {
    green: { chip: "bg-[#0f5238] text-white", ring: "bg-[#e7f5ee] text-[#0f5238]" },
    blue: { chip: "bg-[#0369a1] text-white", ring: "bg-[#e0f2fe] text-[#0369a1]" },
  };
  const t = tones[tone];
  return (
    <div className="flex items-center gap-2.5">
      <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${t.ring}`}>
        <Icon size={15} strokeWidth={2} />
      </span>
      <h2 className="text-lg font-bold text-[#05110a]">{title}</h2>
      <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${t.chip}`}>{count}</span>
    </div>
  );
}

export default function UserDetailPage() {
  const { userId } = useParams();

  const { user, projects, tasks, isLoading, error, fetchUserDetail } =
    useUserDetailStore();

  useEffect(() => {
    if (userId) fetchUserDetail(userId);
  }, [userId, fetchUserDetail]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 bg-[#f4f9f6] p-4 sm:p-6 lg:p-8 min-h-screen">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-[#dcece3]" />
        <div className="h-32 animate-pulse rounded-2xl bg-[#dcece3]" />
        <div className="h-24 animate-pulse rounded-2xl bg-[#dcece3]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6 bg-[#f4f9f6] p-4 sm:p-6 lg:p-8 min-h-screen">
        <div className="rounded-2xl border border-[#f4eaea] bg-[#fef2f2] p-6">
          <p className="text-sm font-medium text-[#8a3b3b]">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const stats = {
    totalProjects: projects?.length || 0,
    totalTasks: tasks?.length || 0,
    completedTasks: tasks?.filter((t) => t.status === "Completed").length || 0,
    pendingTasks: tasks?.filter(
      (t) => t.status !== "Completed"
    ).length || 0,
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4f9f6]">
      {/* Ambient background accents */}
      <div className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-linear-to-br from-[#74c69d]/30 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-[40%] -left-32 h-72 w-72 rounded-full bg-linear-to-tr from-[#0f5238]/15 to-transparent blur-3xl" />

      <div className="relative flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <UserDetailHeader user={user} />

        {/* Stats */}
        <UserStatsCard stats={stats} role={user.role} />

        {/* Role-based sections */}
        {user.role === "project_manager" && (
          <section className="flex flex-col gap-4 rounded-2xl border border-[#d6ecdf] bg-linear-to-br from-[#d4ede0] via-[#e6f5ed] to-[#f4faf7] p-5 shadow-[0_1px_3px_rgba(15,82,56,0.08)] sm:p-6">
            <SectionHeading icon={Briefcase} title="Projects Managed" count={projects?.length || 0} tone="green" />
            <ManagedProjectsGrid projects={projects} />
          </section>
        )}

        {user.role === "member" && (
          <div className="flex flex-col gap-6">
            {/* Projects Section */}
            <section className="flex flex-col gap-4 rounded-2xl border border-[#d6ecdf] bg-linear-to-br from-[#d4ede0] via-[#e6f5ed] to-[#f4faf7] p-5 shadow-[0_1px_3px_rgba(15,82,56,0.08)] sm:p-6">
              <SectionHeading icon={Briefcase} title="Projects" count={projects?.length || 0} tone="green" />
              <UserProjectsGrid projects={projects} />
            </section>

            {/* Tasks Section */}
            <section className="flex flex-col gap-4 rounded-2xl border border-[#d9eefb] bg-linear-to-br from-[#eaf6fd] via-[#f1f9fd] to-[#f8fcfe] p-5 shadow-[0_1px_3px_rgba(3,105,161,0.08)] sm:p-6">
              <SectionHeading icon={ListChecks} title="Assigned Tasks" count={tasks?.length || 0} tone="blue" />
              <UserTasksTable tasks={tasks} />
            </section>
          </div>
        )}

        {user.role === "admin" && (
          <section className="relative overflow-hidden rounded-2xl border border-[#d0e8dc] bg-linear-to-br from-[#f0faf4] to-white p-6 text-center shadow-[0_1px_3px_rgba(15,82,56,0.08)] sm:p-8">
            {/* Concentric ring motif */}
            <div className="pointer-events-none absolute left-1/2 top-8 h-40 w-40 -translate-x-1/2 rounded-full border border-[#0f5238]/10" />
            <div className="pointer-events-none absolute left-1/2 top-8 h-28 w-28 -translate-x-1/2 rounded-full border border-[#0f5238]/10" />

            <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#0f5238] to-[#40916c] shadow-[0_4px_16px_rgba(15,82,56,0.3)]">
              <ShieldCheck className="h-8 w-8 text-white" strokeWidth={1.75} />
            </div>
            <h3 className="relative text-base font-semibold text-[#05110a]">
              Admin Overview
            </h3>
            <p className="relative mt-1 text-sm text-[#6b7b74]">
              Admins aren&apos;t assigned to specific projects or tasks. Use the
              navigation to manage users, projects, and reports.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
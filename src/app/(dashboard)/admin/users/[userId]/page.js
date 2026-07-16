"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import useUserDetailStore from "@/store/useUserDetailStore";

import UserProfileCard from "@/components/users/detail/UserProfileCard";
import UserProjectsGrid from "@/components/users/detail/UserProjectsGrid";
import UserTasksTable from "@/components/users/detail/UserTasksTable";
import ManagedProjectsGrid from "@/components/users/detail/ManagedProjectsGrid";

export default function UserDetailPage() {
  const { userId } = useParams();
  const router = useRouter();

  const { user, projects, tasks, isLoading, error, fetchUserDetail } = useUserDetailStore();

  useEffect(() => {
    if (userId) fetchUserDetail(userId);
  }, [userId, fetchUserDetail]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <p className="text-sm text-[#6b7b74]">Loading user...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <p className="text-sm text-[#8a3b3b]">{error}</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <button
        onClick={() => router.back()}
        className="group inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#375948]
                   transition-colors duration-200 hover:text-[#1d6d45]"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
        Back to Users
      </button>

      <UserProfileCard user={user} />

      {user.role === "project_manager" && (
        <section className="flex flex-col gap-3">
          <h2 className="text-base font-semibold text-[#05110a]">Projects Managed</h2>
          <ManagedProjectsGrid projects={projects} />
        </section>
      )}

      {user.role === "member" && (
        <>
          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[#05110a]">Projects</h2>
            <UserProjectsGrid projects={projects} />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-base font-semibold text-[#05110a]">Assigned Tasks</h2>
            <UserTasksTable tasks={tasks} />
          </section>
        </>
      )}

      {user.role === "admin" && (
        <div className="rounded-2xl border border-white/6 bg-white/1.5 p-8 text-center backdrop-blur-xl">
          <p className="text-sm text-[#6b7b74]">Admins aren&apos;t assigned to projects or tasks.</p>
        </div>
      )}
    </div>
  );
}
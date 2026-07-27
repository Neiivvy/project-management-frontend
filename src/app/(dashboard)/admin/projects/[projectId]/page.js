"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { FolderKanban, Loader2, Users, ClipboardList, CheckCircle2, Clock } from "lucide-react";

import EmptyState from "@/components/shared/EmptyState";
import Avatar from "@/components/shared/Avatar";

import useProjectStore from "@/store/admin/useProjectStore";
import { mapProjectDetail } from "@/lib/mappers/project";

export default function ProjectDetailPage() {
  const { projectId } = useParams();

  const {
    currentProject,
    isLoadingProject,
    projectError,
    fetchProjectById,
    clearCurrentProject,

    projectTasks,
    fetchProjectTasks,
  } = useProjectStore();

  const contentRef = useRef(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!projectId) return;

    fetchProjectById(projectId);
    fetchProjectTasks(projectId);

    return () => {
      clearCurrentProject();
    };
  }, [projectId, fetchProjectById, fetchProjectTasks, clearCurrentProject]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";

    const timeout = setTimeout(() => {
      el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);

    return () => clearTimeout(timeout);
  }, [currentProject]);

  if (isLoadingProject) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-4 border-slate-100" />
            <div
              className="
                absolute inset-0
                h-12 w-12
                rounded-full
                border-4
                border-transparent
                border-t-[#1a7a4c]
                border-r-[#2563eb]
                animate-spin
              "
            />
          </div>
          <p className="text-sm text-slate-500">
            Loading project details...
          </p>
        </div>
      </div>
    );
  }

  if (projectError) {
    return (
      <div className="py-10">
        <EmptyState
          icon={FolderKanban}
          title="Unable to load project"
          message={projectError}
        />
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="py-10">
        <EmptyState
          icon={FolderKanban}
          title="Project not found"
          message="This project may have been deleted or you don't have permission to view it."
        />
      </div>
    );
  }

  const project = mapProjectDetail(currentProject);

  const tasksTotal = projectTasks.length;
  const tasksDone = projectTasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const progress = tasksTotal === 0 ? 0 : Math.round((tasksDone / tasksTotal) * 100);

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "progress", label: "Progress" },
    { key: "team", label: "Team" },
  ];

  return (
    <div
      ref={contentRef}
      className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8"
    >
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#0f5238] to-[#2d6a4f] p-6 sm:p-8 text-white shadow-lg">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold backdrop-blur-sm">
              {project.name?.charAt(0)?.toUpperCase() || "P"}
            </div>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                {project.name}
              </h1>
              <p className="mt-1 text-sm text-white/70">
                {project.manager?.name || "No manager assigned"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
              project.status === "active"
                ? "bg-emerald-400/20 text-emerald-100"
                : project.status === "completed"
                ? "bg-blue-400/20 text-blue-100"
                : "bg-amber-400/20 text-amber-100"
            }`}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickStat icon={ClipboardList} label="Total Tasks" value={tasksTotal} color="bg-white/20" />
          <QuickStat icon={CheckCircle2} label="Completed" value={tasksDone} color="bg-emerald-400/30" />
          <QuickStat icon={Clock} label="Remaining" value={tasksTotal - tasksDone} color="bg-amber-400/30" />
          <QuickStat icon={Users} label="Progress" value={`${progress}%`} color="bg-blue-400/30" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.key
                ? "bg-[#1a7a4c] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-[#1a7a4c]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "overview" && (
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c9a000]/10 text-[#c9a000]">
                  <span className="text-sm font-bold">📝</span>
                </div>
                <h2 className="text-base font-semibold text-[#181d19]">
                  Description
                </h2>
              </div>
              {project.description ? (
                <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
                  {project.description}
                </p>
              ) : (
                <p className="text-sm text-slate-400 italic">
                  No description provided.
                </p>
              )}
            </div>
          )}

          {activeTab === "progress" && (
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-[#181d19]">
                  Task Progress
                </h2>
                <span className="text-2xl font-bold text-[#0f5238]">
                  {progress}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100 mb-6">
                <div
                  className="h-full rounded-full bg-linear-to-r from-[#0f5238] to-[#10b981] transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-center">
                  <p className="text-2xl font-bold text-[#6366f1]">{tasksTotal}</p>
                  <p className="text-xs text-slate-500 mt-1">Total</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-center">
                  <p className="text-2xl font-bold text-emerald-600">{tasksDone}</p>
                  <p className="text-xs text-slate-500 mt-1">Done</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-center">
                  <p className="text-2xl font-bold text-amber-600">{tasksTotal - tasksDone}</p>
                  <p className="text-xs text-slate-500 mt-1">Remaining</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-base font-semibold text-[#181d19] mb-4">
                Team Members
              </h2>
              {project.team?.length > 0 ? (
                <div className="space-y-3">
                  {project.team.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition-all hover:border-slate-200 hover:bg-slate-50/50"
                    >
                      <Avatar name={member.name} size="md" variant="dark" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#181d19] truncate">
                          {member.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {member.email || "No email"}
                        </p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                        member.availability === "available"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {member.availability === "available" ? "Available" : "Busy"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 text-center py-8">
                  No team members assigned yet.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Manager Card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563eb]/10 text-[#2563eb]">
                <span className="text-sm font-bold">👤</span>
              </div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Manager
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Avatar name={project.manager?.name} size="lg" variant="dark" />
              <div>
                <p className="text-sm font-semibold text-[#181d19]">
                  {project.manager?.name || "Unknown"}
                </p>
                <p className="text-xs text-slate-500">
                  {project.manager?.email || "No email"}
                </p>
              </div>
            </div>
          </div>

          {/* Meta Card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0d7377]/10 text-[#0d7377]">
                <span className="text-sm font-bold">ℹ️</span>
              </div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Details
              </h2>
            </div>

            <div className="space-y-3">
              <MetaRow label="Created" value={formatDate(project.createdAt)} />
              <MetaRow label="Due Date" value={formatDate(project.dueDate)} />
              <MetaRow label="Status" value={project.status} />
              <MetaRow label="Priority" value={project.priority} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickStat({ icon: Icon, label, value, color }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl ${color} px-4 py-3`}>
      <Icon size={18} className="text-white/90" />
      <div>
        <p className="text-xs text-white/70">{label}</p>
        <p className="text-lg font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

function MetaRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-none">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-[#181d19] capitalize">{value || "—"}</span>
    </div>
  );
}

function formatDate(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

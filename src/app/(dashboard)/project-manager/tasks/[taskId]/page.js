"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useTaskStore from "@/store/useTaskStore";
import CommentSection from "@/components/tasks/CommentSection";

import {
  FaArrowLeft,
  FaFolderOpen,
  FaUser,
  FaCalendarAlt,
  FaFlag,
  FaCheck,
} from "react-icons/fa";

const STATUS_STEPS = ["To Do", "In Progress", "Review", "Completed"];

const PRIORITY_STYLES = {
  High: {
    dot: "bg-[#c4522f]",
    text: "text-[#c4522f]",
    bg: "bg-[#c4522f]/10",
    ring: "ring-[#c4522f]/20",
  },
  Medium: {
    dot: "bg-[#b8862c]",
    text: "text-[#b8862c]",
    bg: "bg-[#b8862c]/10",
    ring: "ring-[#b8862c]/20",
  },
  Low: {
    dot: "bg-[#3f7d5c]",
    text: "text-[#3f7d5c]",
    bg: "bg-[#3f7d5c]/10",
    ring: "ring-[#3f7d5c]/20",
  },
};

export default function TaskDetailsPage() {
  const router = useRouter();
  const { taskId } = useParams();
  const task = useTaskStore((state) => state.task);
  const loading = useTaskStore((state) => state.loading);
  const fetchTaskById = useTaskStore((state) => state.fetchTaskById);

  useEffect(() => {
    if (taskId) {
      fetchTaskById(taskId);
    }
  }, [fetchTaskById, taskId]);

  if (loading) {
    return (
      <div className="flex h-80 flex-col items-center justify-center gap-3 text-[#5b6b64]">
        <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-[#0f5238]/15 border-t-[#0f5238]" />
        <p className="text-sm font-medium tracking-wide">Loading task…</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex h-80 flex-col items-center justify-center gap-2 text-center">
        <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f5238]/8 text-[#0f5238]">
          <FaFolderOpen size={20} />
        </div>
        <h2 className="text-2xl font-semibold text-[#1a2e28]">
          Task not found
        </h2>
        <p className="text-sm text-[#5b6b64]">
          It may have been moved or deleted.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-4 rounded-xl border border-[#0f5238]/20 px-5 py-2.5 text-sm font-semibold text-[#0f5238] transition hover:bg-[#0f5238]/5 active:scale-[0.98]"
        >
          Go back
        </button>
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.indexOf(task.status);
  const progressPercent =
    currentStepIndex <= 0
      ? 0
      : (currentStepIndex / (STATUS_STEPS.length - 1)) * 100;
  const priorityStyle = PRIORITY_STYLES[task.priority] ?? PRIORITY_STYLES.Low;

  return (
    <div className="space-y-6" style={{ fontFamily: "var(--font-inter)" }}>
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e4e9e6] bg-white text-[#1a2e28] shadow-[0_1px_2px_rgba(15,23,20,0.06)] transition hover:border-[#0f5238]/30 hover:text-[#0f5238] hover:shadow-[0_2px_8px_rgba(15,82,56,0.12)] active:scale-95"
        >
          <FaArrowLeft size={14} />
        </button>
        <div className="min-w-0">
          <p
            className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Task Details
          </p>
          <h1
            className="truncate text-2xl font-bold text-[#163126] sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            {task.title}
          </h1>
        </div>
      </div>

      {/* Main card */}
      <div className="overflow-hidden rounded-3xl border border-[#e4e9e6] bg-white shadow-[0_1px_3px_rgba(15,23,20,0.05),0_8px_24px_-12px_rgba(15,23,20,0.08)]">
        {/* Description + priority */}
        <div className="flex flex-col gap-4 border-b border-[#eef1ef] px-6 py-6 sm:flex-row sm:items-start sm:justify-between sm:px-8">
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5b6b64]">
              Description
            </p>

            <p className="mt-2 wrap-break-word text-[15px] leading-7 text-slate-600">
              {task.description || "No description provided."}
            </p>
          </div>

          <span
            className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold ring-1 ${priorityStyle.bg} ${priorityStyle.text} ${priorityStyle.ring}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${priorityStyle.dot}`} />
            {task.priority} Priority
          </span>
        </div>

        {/* Progress */}
        <div className="border-b border-[#eef1ef] px-6 py-7 sm:px-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5b6b64]">
              Progress
            </p>
            <p className="text-[11px] font-semibold text-[#0f5238]">
              {task.status}
            </p>
          </div>

          <div className="relative">
            {/* Track */}
            <div className="absolute left-4 right-4 top-4 h-0.5 rounded-full bg-[#e4e9e6]">
              <div
                className="h-full rounded-full bg-linear-to-r from-[#0f5238] to-[#1b7a55] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="relative flex items-start justify-between">
              {STATUS_STEPS.map((step, i) => {
                const done = i < currentStepIndex;
                const active = i === currentStepIndex;

                return (
                  <div key={step} className="flex w-20 flex-col items-center">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white transition-all duration-300 ${
                        done
                          ? "border-[#0f5238] bg-[#0f5238] text-white"
                          : active
                            ? "border-[#0f5238] text-[#0f5238] shadow-[0_0_0_4px_rgba(15,82,56,0.1)]"
                            : "border-[#dde3e0] text-[#b7c0bb]"
                      }`}
                    >
                      {done ? (
                        <FaCheck size={11} />
                      ) : (
                        <span
                          className={`h-2 w-2 rounded-full ${active ? "bg-[#0f5238]" : "bg-[#dde3e0]"}`}
                        />
                      )}
                    </div>
                    <span
                      className={`mt-2.5 text-center text-[11px] font-medium leading-tight ${
                        active
                          ? "font-semibold text-[#0f5238]"
                          : done
                            ? "text-[#3d4b45]"
                            : "text-[#a6b0ab]"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Meta grid */}
        <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8 ">
          <MetaCard icon={<FaFolderOpen size={14} />} label="Project">
            <p className="text-[15px] font-medium text-[#1a2e28] ">
              {task.projectId?.title || "—"}
            </p>
          </MetaCard>

          <MetaCard icon={<FaUser size={13} />} label="Assigned to">
            <p className="text-[15px] font-medium text-[#1a2e28]">
              {task.assignedTo?.name || "Unassigned"}
            </p>
            {task.assignedTo?.email && (
              <p className="text-[13px] text-[#8b968f]">
                {task.assignedTo.email}
              </p>
            )}
          </MetaCard>
          <MetaCard icon={<FaCalendarAlt size={14} />} label="Deadline">
            <p className="text-[15px] font-medium text-[#1a2e28]">
              {task.deadline
                ? new Date(task.deadline).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "No deadline set"}
            </p>
          </MetaCard>

          <MetaCard icon={<FaFlag size={14} />} label="Priority">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] font-semibold ${priorityStyle.bg} ${priorityStyle.text}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${priorityStyle.dot}`}
              />
              {task.priority}
            </span>
          </MetaCard>
        </div>
      </div>
      <CommentSection taskId={taskId} />
    </div>
  );
}

function MetaCard({ icon, label, children }) {
  return (
    <div className="group rounded-2xl border border-[#eef1ef] bg-[#d5f6e7] p-5 transition-all duration-200 hover:border-[#0f5238]/15 hover:bg-[#a7f0cf] hover:shadow-[0_2px_10px_rgba(15,23,20,0.05)]">
      <div className="mb-3 flex items-center gap-2.5 text-[#5b6b64]">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0f5238]/8 text-[#0f5238] transition-colors group-hover:bg-[#0f5238]/12">
          {icon}
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-widest">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

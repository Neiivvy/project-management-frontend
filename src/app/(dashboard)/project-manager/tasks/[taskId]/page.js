"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useTaskStore from "@/store/useTaskStore";

import {
  FaArrowLeft,
  FaFolderOpen,
  FaUser,
  FaCalendarAlt,
  FaFlag,
  FaCircle,
  FaCheck,
} from "react-icons/fa";

// Status order carries real meaning here — it's the actual pipeline a task
// moves through, so it's rendered as a stepper rather than a flat badge.
const STATUS_STEPS = ["To Do", "In Progress", "Review", "Completed"];

const PRIORITY_STYLES = {
  High: { dot: "bg-[#c4522f]", text: "text-[#c4522f]", bg: "bg-[#c4522f]/8" },
  Medium: { dot: "bg-[#b8862c]", text: "text-[#b8862c]", bg: "bg-[#b8862c]/8" },
  Low: { dot: "bg-[#3f7d5c]", text: "text-[#3f7d5c]", bg: "bg-[#3f7d5c]/8" },
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
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0f5238]/20 border-t-[#0f5238]" />
        <p className="text-sm tracking-wide">Loading task…</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex h-80 flex-col items-center justify-center gap-2 text-center">
        <h2 className="text-2xl font-semibold text-[#1a2e28]">
          Task not found
        </h2>
        <p className="text-sm text-[#5b6b64]">
          It may have been moved or deleted.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-4 rounded-lg border border-[#0f5238]/20 px-4 py-2 text-sm font-medium text-[#0f5238] transition hover:bg-[#0f5238]/5"
        >
          Go back
        </button>
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.indexOf(task.status);
  const priorityStyle = PRIORITY_STYLES[task.priority] ?? PRIORITY_STYLES.Low;

  return (
    <div
      className="space-y-6"
      style={{
        fontFamily: "var(--font-inter)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e4e9e6] bg-white text-[#1a2e28] shadow-sm transition hover:border-[#0f5238]/30 hover:text-[#0f5238]"
        >
          <FaArrowLeft size={14} />
        </button>
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700"
            style={{
              fontFamily: "var(--font-jakarta)",
            }}
          >
            TASK DETAILS
          </p>
          <h1
            className="text-3xl font-bold text-[#163126] md:text-4xl"
            style={{
              fontFamily: "var(--font-jakarta)",
            }}
          >
            {task.title}
          </h1>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#e4e9e6] bg-white shadow-sm">
        <div className="border-b border-[#eef1ef] px-8 py-6">
          <p
            className="text-base leading-8 text-slate-600"
            style={{
              fontFamily: "var(--font-inter)",
            }}
          >
            {task.description || "No description provided."}
          </p>
        </div>

        <div className="border-b border-[#eef1ef] px-8 py-7">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5b6b64]">
            Progress
          </p>
          <div className="flex items-start">
            {STATUS_STEPS.map((step, i) => {
              const done = i < currentStepIndex;
              const active = i === currentStepIndex;
              const isLast = i === STATUS_STEPS.length - 1;

              return (
                <div
                  key={step}
                  className={`flex items-center ${isLast ? "" : "flex-1"}`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        done
                          ? "border-[#0f5238] bg-[#0f5238] text-white"
                          : active
                            ? "border-[#0f5238] bg-white text-[#0f5238]"
                            : "border-[#dde3e0] bg-white text-[#b7c0bb]"
                      }`}
                    >
                      {done ? <FaCheck size={11} /> : <FaCircle size={7} />}
                    </div>
                    <span
                      className={`mt-2 w-20 text-center text-[11px] font-medium leading-tight ${
                        active
                          ? "text-[#0f5238]"
                          : done
                            ? "text-[#3d4b45]"
                            : "text-[#a6b0ab]"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {!isLast && (
                    <div
                      className={`mx-1 -mt-5 h-0.5 flex-1 rounded ${
                        done ? "bg-[#0f5238]" : "bg-[#e4e9e6]"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Meta grid */}
        <div className="grid gap-px bg-[#eef1ef] sm:grid-cols-2">
          <MetaCell icon={<FaFolderOpen size={13} />} label="Project">
            <p className="text-[15px] font-medium text-[#1a2e28]">
              {task.projectId?.title || "—"}
            </p>
          </MetaCell>

          <MetaCell icon={<FaUser size={13} />} label="Assigned to">
            <p className="text-[15px] font-medium text-[#1a2e28]">
              {task.assignedTo?.name || "Unassigned"}
            </p>
            {task.assignedTo?.email && (
              <p className="text-[13px] text-[#8b968f]">
                {task.assignedTo.email}
              </p>
            )}
          </MetaCell>

          <MetaCell icon={<FaCalendarAlt size={13} />} label="Deadline">
            <p className="text-[15px] font-medium text-[#1a2e28]">
              {task.deadline
                ? new Date(task.deadline).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "No deadline set"}
            </p>
          </MetaCell>

          <MetaCell icon={<FaFlag size={13} />} label="Priority">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] font-semibold ${priorityStyle.bg} ${priorityStyle.text}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${priorityStyle.dot}`}
              />
              {task.priority}
            </span>
          </MetaCell>
        </div>
      </div>
    </div>
  );
}

function MetaCell({ icon, label, children }) {
  return (
    <div className="bg-white px-8 py-6">
      <div className="mb-3 flex items-center gap-2 text-[#5b6b64]">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-widest">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

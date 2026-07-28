"use client";

import {
  CheckCircle2,
  ClipboardList,
  Circle,
  TrendingUp,
} from "lucide-react";

export default function ProjectProgressCard({
  progress = 0,
  tasksDone = 0,
  tasksTotal = 0,
}) {
  const remainingTasks = Math.max(tasksTotal - tasksDone, 0);

  return (
    <section
      className="
        rounded-2xl
        border border-slate-100
        bg-white
        p-5
        shadow-sm
        sm:p-6
        transition-all duration-300
        hover:shadow-md
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Project Progress
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Based on completed project tasks
          </p>
        </div>

        <div className="rounded-xl bg-[#0f5238]/10 px-3 py-2">
          <span className="text-lg font-bold text-[#0f5238]">
            {progress}%
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#0f5238] to-[#10b981] transition-all duration-700 ease-out"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-200 hover:border-slate-200 hover:bg-white">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6366f1]/10 text-[#6366f1]">
              <ClipboardList
                size={16}
              />
            </div>

            <span className="text-sm text-slate-500">
              Total Tasks
            </span>
          </div>

          <p className="mt-3 text-2xl font-bold text-[#6366f1]">
            {tasksTotal}
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-200 hover:border-slate-200 hover:bg-white">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2
                size={16}
              />
            </div>

            <span className="text-sm text-slate-500">
              Completed
            </span>
          </div>

          <p className="mt-3 text-2xl font-bold text-emerald-600">
            {tasksDone}
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-200 hover:border-slate-200 hover:bg-white">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Circle
                size={16}
              />
            </div>

            <span className="text-sm text-slate-500">
              Remaining
            </span>
          </div>

          <p className="mt-3 text-2xl font-bold text-amber-600">
            {remainingTasks}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f5238]/10 text-[#0f5238]">
          <TrendingUp
            size={16}
          />
        </div>

        <p className="text-sm text-slate-500">
          {tasksDone} of{" "}
          <span className="font-semibold text-[#181d19]">
            {tasksTotal}
          </span>{" "}
          tasks have been completed.
        </p>
      </div>
    </section>
  );
}

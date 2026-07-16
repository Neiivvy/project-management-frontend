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
        border border-[#dbe6e1]
        bg-white
        p-5
        shadow-sm
        sm:p-6
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#66756e]">
            Project Progress
          </h2>

          <p className="mt-1 text-sm text-[#7a8782]">
            Based on completed project tasks
          </p>
        </div>

        <div className="rounded-xl bg-[#eef8f3] px-3 py-2">
          <span className="text-lg font-bold text-[#0f5238]">
            {progress}%
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="h-3 overflow-hidden rounded-full bg-[#e8f0eb]">
          <div
            className="h-full rounded-full bg-[#40916c] transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#edf2ef] p-4">
          <div className="flex items-center gap-2">
            <ClipboardList
              size={18}
              className="text-[#40916c]"
            />

            <span className="text-sm text-[#66756e]">
              Total Tasks
            </span>
          </div>

          <p className="mt-3 text-2xl font-semibold text-[#23312d]">
            {tasksTotal}
          </p>
        </div>

        <div className="rounded-xl border border-[#edf2ef] p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={18}
              className="text-green-600"
            />

            <span className="text-sm text-[#66756e]">
              Completed
            </span>
          </div>

          <p className="mt-3 text-2xl font-semibold text-[#23312d]">
            {tasksDone}
          </p>
        </div>

        <div className="rounded-xl border border-[#edf2ef] p-4">
          <div className="flex items-center gap-2">
            <Circle
              size={18}
              className="text-orange-500"
            />

            <span className="text-sm text-[#66756e]">
              Remaining
            </span>
          </div>

          <p className="mt-3 text-2xl font-semibold text-[#23312d]">
            {remainingTasks}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center gap-2 rounded-xl bg-[#f7faf8] px-4 py-3">
        <TrendingUp
          size={18}
          className="text-[#40916c]"
        />

        <p className="text-sm text-[#66756e]">
          {tasksDone} of{" "}
          <span className="font-semibold text-[#23312d]">
            {tasksTotal}
          </span>{" "}
          tasks have been completed.
        </p>
      </div>
    </section>
  );
}
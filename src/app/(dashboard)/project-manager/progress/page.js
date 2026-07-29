"use client";

import { useEffect, useMemo } from "react";

import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaSearch,
} from "react-icons/fa";

import useTaskStore from "@/store/useTaskStore";

const STATUS_STYLE = {
  "To Do": {
    bg: "#f1f1f0",
    text: "#6b7280",
    bar: "#9ca3af",
  },

  "In Progress": {
    bg: "#faf1e2",
    text: "#a8711f",
    bar: "#c98a3a",
  },

  Review: {
    bg: "#ecedf9",
    text: "#4c4f9e",
    bar: "#5b5fa8",
  },

  Completed: {
    bg: "#e8f2ee",
    text: "#0f5238",
    bar: "#0f5238",
  },
};

function StatCard({ title, value, icon, color }) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      border
      border-gray-100
      p-5
      flex
      justify-between
      items-center
      "
    >
      <div>
        <p
          className="
          text-xs
          uppercase
          tracking-wide
          text-gray-400
          font-semibold
          "
        >
          {title}
        </p>

        <h2
          className="
          text-3xl
          font-bold
          text-[#10231b]
          mt-2
          "
        >
          {value}
        </h2>
      </div>

      <div
        className="
        h-12
        w-12
        rounded-xl
        flex
        items-center
        justify-center
        text-xl
        "
        style={{
          backgroundColor: color.bg,
          color: color.text,
        }}
      >
        {icon}
      </div>
    </div>
  );
}

function StatusCard({ status, count, percentage }) {
  const style = STATUS_STYLE[status];

  return (
    <div
      className="
      bg-white
      rounded-2xl
      border
      border-gray-100
      p-5
      "
    >
      <div
        className="
        flex
        justify-between
        items-center
        mb-3
        "
      >
        <div className="flex items-center gap-2">
          <span
            className="
            h-3
            w-3
            rounded-full
            "
            style={{
              backgroundColor: style.bar,
            }}
          />

          <h3 className="font-semibold text-[#10231b]">{status}</h3>
        </div>

        <span className="font-bold">{count}</span>
      </div>

      <div
        className="
        h-3
        rounded-full
        bg-gray-100
        overflow-hidden
        "
      >
        <div
          className="
          h-full
          rounded-full
          transition-all
          duration-700
          "
          style={{
            width: `${percentage}%`,
            backgroundColor: style.bar,
          }}
        />
      </div>

      <p className="text-xs text-gray-400 mt-2">{percentage}% of tasks</p>
    </div>
  );
}

export default function ProgressPage() {
  const tasks = useTaskStore((state) => state.tasks);

  const loading = useTaskStore((state) => state.loading);

  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const progress = useMemo(() => {
    const total = tasks.length;

    const byStatus = {
      "To Do": 0,

      "In Progress": 0,

      Review: 0,

      Completed: 0,
    };

    tasks.forEach((task) => {
      if (byStatus[task.status] !== undefined) {
        byStatus[task.status]++;
      }
    });

    const percentages = {};

    Object.keys(byStatus).forEach((status) => {
      percentages[status] = total
        ? Math.round((byStatus[status] / total) * 100)
        : 0;
    });

    return {
      total,

      byStatus,

      percentages,
    };
  }, [tasks]);

  if (loading) {
    return (
      <div
        className="
      rounded-xl
      bg-white
      p-10
      text-center
      shadow-sm
      "
      >
        Loading Tasks...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <p
          className="
        text-xs
        uppercase
        tracking-wider
        text-[#0f5238]
        font-semibold
        "
        >
          Analytics
        </p>

        <h1
          className="
        text-3xl
        font-bold
        text-[#10231b]
        "
        >
          Task Progress
        </h1>

        <p className="text-gray-500 mt-1">
          Monitor overall task completion and workflow status.
        </p>
      </div>

      {/* STATS */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-4
        gap-5
        "
      >
        <StatCard
          title="Total Tasks"
          value={progress.total}
          icon={<FaTasks />}
          color={{
            bg: "#e8f2ee",
            text: "#0f5238",
          }}
        />

        <StatCard
          title="Completed"
          value={progress.byStatus.Completed}
          icon={<FaCheckCircle />}
          color={{
            bg: "#e8f2ee",
            text: "#0f5238",
          }}
        />

        <StatCard
          title="In Progress"
          value={progress.byStatus["In Progress"]}
          icon={<FaClock />}
          color={{
            bg: "#faf1e2",
            text: "#a8711f",
          }}
        />

        <StatCard
          title="Completion"
          value={`${progress.percentages.Completed}%`}
          icon={<FaChartLine />}
          color={{
            bg: "#ecedf9",
            text: "#4c4f9e",
          }}
        />
      </div>

      {/* STATUS */}

      <div>
        <h2
          className="
        text-lg
        font-bold
        mb-4
        text-[#10231b]
        "
        >
          Status Progress
        </h2>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
          "
        >
          {Object.keys(STATUS_STYLE).map((status) => (
            <StatusCard
              key={status}
              status={status}
              count={progress.byStatus[status]}
              percentage={progress.percentages[status]}
            />
          ))}
        </div>
      </div>

      {tasks.length === 0 && (
        <div
          className="
          bg-white
          rounded-2xl
          p-10
          text-center
          text-gray-400
          "
        >
          No tasks available
        </div>
      )}
    </div>
  );
}

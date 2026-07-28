"use client";

import { useEffect } from "react";
import TaskBoard from "../tasks/components/TaskBoard";
import useTaskStore from "@/store/useTaskStore";

export default function ProgressPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const loading = useTaskStore((state) => state.loading);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Task Progress</h1>

        <p className="text-gray-500">
          Monitor task progress across all projects.
        </p>
      </div>

      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          Loading Tasks...
        </div>
      ) : (
        <TaskBoard tasks={tasks} />
      )}
    </div>
  );
}

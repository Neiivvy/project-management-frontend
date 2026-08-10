"use client";

import { useEffect, useState } from "react";

import useAuthStore from "@/store/useAuthStore";
import useDashboardStore from "@/store/admin/useDashboardStore";

import { getProjects } from "@/api/projectApi";
import { getActivities } from "@/api/activityApi";
import { getTasks, deleteTask } from "@/api/taskApi";

import DashboardStats from "@/components/dashboard/project_manager/DashboardStats";
import TaskBreakdown from "@/components/dashboard/project_manager/TaskBreakdown";
import OverdueTasks from "@/components/dashboard/project_manager/OverdueTasks";
import RecentActivityPm from "@/components/dashboard/project_manager/Pm_RecentActivity";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);

  const { summary, fetchSummary, isLoading } = useDashboardStore();

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectResponse, taskResponse] = await Promise.all([
          getProjects(),
          getTasks(),
        ]);

        setProjects(projectResponse?.data || projectResponse || []);
        setTasks(taskResponse?.data || taskResponse || []);
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await getActivities({
          limit: 5,
          days: 30,
        });

        setActivities(response?.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    loadActivities();
  }, []);

  if (isLoading || !summary) {
    return <div className="p-8 text-gray-500">Loading Dashboard...</div>;
  }

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  const reviewTasks = tasks.filter((task) => task.status === "Review").length;

  const todoTasks = tasks.filter((task) => task.status === "To Do").length;

  const pendingTasks = tasks
    .filter((task) => task.status !== "Completed")
    .slice(0, 5);

  const overdue = tasks.filter((task) => {
    if (!task.deadline) return false;

    const deadline = new Date(task.deadline);

    return task.status?.toLowerCase() !== "completed" && deadline < new Date();
  });

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);

      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const taskBreakdown = [
    {
      label: "Completed",
      value: completedTasks,
      tone: "bg-emerald-500",
      hex: "#10b981",
    },
    {
      label: "In Progress",
      value: inProgressTasks,
      tone: "bg-amber-500",
      hex: "#f59e0b",
    },
    {
      label: "Review",
      value: reviewTasks,
      tone: "bg-blue-500",
      hex: "#2563eb",
    },
    {
      label: "To Do",
      value: todoTasks,
      tone: "bg-slate-500",
      hex: "#64748b",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-[#181d19]">
          Welcome back, {user?.name}
        </h1>

        <p className="mt-1 text-[#697268]">
          Here&apos;s what&apos;s happening across your projects today.
        </p>
      </div>

      {/* Dashboard Stats */}
      <div className="mt-6">
        <DashboardStats
          summary={summary}
          projects={projects}
          tasks={tasks}
          completedTasks={completedTasks}
          pendingTasks={pendingTasks}
          inProgressTasks={inProgressTasks}
        />
      </div>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <RecentActivityPm activities={activities} />
        </div>

        <TaskBreakdown segments={taskBreakdown} />
      </div>

      {/* Overdue Tasks */}
      <div className="mt-6">
        <OverdueTasks tasks={overdue} onDelete={handleDeleteTask} />
      </div>
    </div>
  );
}

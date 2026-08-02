import {
  FiUsers,
  FiFolder,
  FiUserCheck,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

import StatCard from "@/components/dashboard/project_manager/StatCard";

export default function DashboardStats({
  summary,
  projects,
  tasks,
  completedTasks,
  pendingTasks,
  inProgressTasks,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
      <StatCard
        icon={FiUsers}
        label="My Projects"
        value={summary.totalProjects || projects.length}
        color="#1a7a4c"
      />

      <StatCard
        icon={FiFolder}
        label="Total Tasks"
        value={summary.totalTasks || tasks.length}
        color="#c9a000"
      />

      <StatCard
        icon={FiUserCheck}
        label="Completed Tasks"
        value={completedTasks}
        color="#2563eb"
      />

      <StatCard
        icon={FiClock}
        label="Pending Tasks"
        value={pendingTasks.length}
        color="#c2410c"
      />

      <StatCard
        icon={FiCheckCircle}
        label="In Progress"
        value={inProgressTasks}
        color="#2d6a4f"
      />
    </div>
  );
}

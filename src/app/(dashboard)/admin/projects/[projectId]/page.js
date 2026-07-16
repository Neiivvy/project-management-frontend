"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { FolderKanban, Loader2 } from "lucide-react";

import EmptyState from "@/components/shared/EmptyState";

import ProjectDetailHeader from "@/components/projects/ProjectDetailHeader";
import ProjectOverviewCard from "@/components/projects/ProjectOverviewCard";
import ProjectProgressCard from "@/components/projects/ProjectProgressCard";
import ProjectManagerCard from "@/components/projects/ProjectManagerCard";
import ProjectTeamCard from "@/components/projects/ProjectTeamCard";
import ProjectMetaCard from "@/components/projects/ProjectMetaCard";

import useProjectStore from "@/store/useProjectStore";
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

  useEffect(() => {
    if (!projectId) return;

    fetchProjectById(projectId);
    fetchProjectTasks(projectId);

    return () => {
      clearCurrentProject();
    };
  }, [projectId, fetchProjectById, fetchProjectTasks, clearCurrentProject]);

  if (isLoadingProject) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={40}
            className="animate-spin text-[#40916c]"
          />
          <p className="text-sm text-[#66756e]">
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

  // ==========================
  // Task Statistics
  // ==========================

  const tasksTotal = projectTasks.length;

  const tasksDone = projectTasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const progress =
    tasksTotal === 0
      ? 0
      : Math.round((tasksDone / tasksTotal) * 100);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <ProjectDetailHeader
        project={project}
        onEdit={() => console.log("Edit")}
        onDelete={() => console.log("Delete")}
      />

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Left */}
        <div className="flex flex-col gap-6 xl:col-span-2">
          <ProjectOverviewCard
            description={project.description}
          />

          <ProjectProgressCard
            progress={progress}
            tasksDone={tasksDone}
            tasksTotal={tasksTotal}
          />
        </div>

        {/* Right */}
        <div className="flex flex-col gap-6">
          <ProjectManagerCard
            manager={project.manager}
          />

          <ProjectTeamCard
            team={project.team}
          />

          <ProjectMetaCard
            createdAt={project.createdAt}
            dueDate={project.dueDate}
            status={project.status}
            priority={project.priority}
          />
        </div>
      </div>
    </div>
  );
}
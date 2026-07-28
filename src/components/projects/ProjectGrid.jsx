// components/projects/ProjectGrid.jsx
"use client";

import { FolderKanban } from "lucide-react";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectListRow from "@/components/projects/ProjectListRow";
import EmptyState from "@/components/shared/EmptyState";

export default function ProjectGrid({ projects, view = "grid" }) {
  if (projects.length === 0) {
    return (
      <EmptyState
        icon={FolderKanban}
        title="No projects found"
        message="Try adjusting your search or filters."
      />
    );
  }

  if (view === "list") {
    return (
      <div className="flex flex-col gap-2.5">
        {projects.map((project, i) => (
          <ProjectListRow key={project.id} project={project} index={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}

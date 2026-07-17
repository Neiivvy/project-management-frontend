"use client";

import { useEffect, useMemo, useState } from "react";

import ProjectStatsBar from "@/components/projects/ProjectStatsBar";
import ProjectFilters from "@/components/projects/ProjectFilters";
import ProjectGrid from "@/components/projects/ProjectGrid";
import Pagination from "@/components/shared/Pagination";  

import useProjectStore from "@/store/admin/useProjectStore"

const PAGE_SIZE = 6;

export default function ProjectsPage() {
  const { projects, fetchProjects, isLoading, error } = useProjectStore();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Map backend response to match the UI
 const projectList = useMemo(() => {
  return projects.map((project) => ({
    id: project._id,
    name: project.title,
    description: project.description || "No description",

    manager: project.manager?.name || "Unknown",

    status: project.status,

    dueDate: project.deadline || new Date(),

    // Fake values until backend supports them
    progress: 0,
    priority: "low",

    team:
      project.teamMembers?.map((member) => ({
        id: member._id,
        name: member.name,
      })) || [],

    tasksDone: 0,
    tasksTotal: 0,
  }));
}, [projects]);

  const filtered = useMemo(() => {
    return projectList.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.manager.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "all" || project.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [projectList, search, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  );

  const pageItems = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  function handleFilterChange(setter) {
    return (value) => {
      setter(value);
      setPage(1);
    };
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-[#23312d] sm:text-2xl">
          Projects
        </h1>

        <p className="text-sm text-[#66756e]">
          Track progress, ownership, and health across every project.
        </p>
      </header>

      <ProjectStatsBar projects={projectList} />

      <section
        className="
          flex flex-col gap-4
          rounded-2xl
          border border-[#dbe6e1]
          bg-white
          p-4
          shadow-sm
          sm:p-5
        "
      >
        <ProjectFilters
          search={search}
          onSearchChange={handleFilterChange(setSearch)}
          status={status}
          onStatusChange={handleFilterChange(setStatus)}
          view={view}
          onViewChange={setView}
          onNewProject={() => console.log("Open Create Project Modal")}
        />

        {isLoading ? (
          <div className="py-20 text-center text-gray-500">
            Loading projects...
          </div>
        ) : error ? (
          <div className="py-20 text-center text-red-500">
            {error}
          </div>
        ) : (
          <>
            <ProjectGrid projects={pageItems} view={view} />

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={filtered.length}
              pageSize={PAGE_SIZE}
            />
          </>
        )}
      </section>
    </div>
  );
}
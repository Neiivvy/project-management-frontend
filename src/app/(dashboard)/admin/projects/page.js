"use client";

import { useEffect, useMemo, useState, useRef } from "react";

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

  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(-10px)";

    const timeout = setTimeout(() => {
      el.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

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
      {/* Header */}
      <div ref={headerRef}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f5238]/10 text-[#0f5238]">
            <span className="text-lg">📁</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#181d19]">
              Projects
            </h1>
            <p className="text-sm text-slate-500">
              Track progress, ownership, and health across every project.
            </p>
          </div>
        </div>
      </div>

      <ProjectStatsBar projects={projectList} />

      <section
        className="
          flex flex-col gap-4
          rounded-2xl
          border border-slate-100
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
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-100 border-t-[#0f5238]" />
            <p className="text-sm text-slate-500 mt-3">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500 mb-3">
              <span className="text-xl">⚠️</span>
            </div>
            <p className="text-sm text-red-600 font-medium">{error}</p>
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

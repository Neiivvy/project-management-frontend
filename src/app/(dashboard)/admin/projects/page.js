"use client";

import { useMemo, useState } from "react";
import ProjectStatsBar from "@/components/projects/ProjectStatsBar";
import ProjectFilters from "@/components/projects/ProjectFilters";
import ProjectGrid from "@/components/projects/ProjectGrid";
import Pagination from "@/components/shared/Pagination";
import { MOCK_PROJECTS } from "@/constants/adminMockData";

const PAGE_SIZE = 6;

export default function ProjectsPage() {
  const [projects] = useState(MOCK_PROJECTS);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.manager.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "all" || p.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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

      <ProjectStatsBar projects={projects} />

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
          onNewProject={() => console.log("open new-project modal")}
        />

        <ProjectGrid projects={pageItems} view={view} />

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={filtered.length}
          pageSize={PAGE_SIZE}
        />
      </section>
    </div>
  );
}
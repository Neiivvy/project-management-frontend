"use client";

import { useEffect, useMemo, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";

import ProjectTable from "./components/ProjectTable";
import ProjectModal from "./components/ProjectModal";

import useProjectStore from "@/store/useProjectStore";
import { toast } from "react-toastify";
import Pagination from "./components/Pagination";

export default function ProjectsPage() {
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const projects = useProjectStore((state) => state.projects);
  const loading = useProjectStore((state) => state.loading);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const { deleteProject } = useProjectStore();

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`Delete "${project.title}"?`)) return;
    const success = await deleteProject(project._id);

    if (success) {
      toast.success("Project deleted successfully!");
    } else {
      toast.error("Failed to delete project");
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  const statusFilters = [
    "All",
    ...new Set((projects || []).map((project) => project.status)),
  ];

  const filteredProjects = useMemo(() => {
    return (projects || []).filter((project) => {
      const matchesSearch = project.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject,
  );

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>

          <p className="text-gray-500">Manage all your projects.</p>
        </div>

        <button
          onClick={() => {
            setSelectedProject(null);
            setShowProjectModal(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-[#0f5238] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0b412d]"
        >
          <FaPlus />
          New Project
        </button>
      </div>

      <div className="mb-5 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={handleSearch}
            className="w-full rounded-lg border border-[#bfc9c1] py-3 pl-11 pr-4 transition focus:border-[#0f5238] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20"
          />
        </div>

        <div className="flex items-center gap-3   px-4 py-1 ">
          <span className="text-sm font-semibold">Filter by:</span>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="min-w-30 cursor-pointer rounded-xl border border-gray-100 bg-white px-4 py-2 text-sm font-medium "
          >
            {statusFilters.map((status) => (
              <option key={status} value={status}>
                {status === "All"
                  ? "All Status"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          Loading Projects...
        </div>
      ) : (
        <>
          <ProjectTable
            projects={filteredProjects}
            currentPage={currentPage}
            projectsPerPage={projectsPerPage}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Pagination
            totalItems={filteredProjects.length}
            itemsPerPage={projectsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
      <ProjectModal
        show={showProjectModal}
        setShow={setShowProjectModal}
        setSelectedProject={setSelectedProject}
        mode={selectedProject ? "edit" : "create"}
        project={selectedProject}
      />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import api from "@/api/axios";
import { toast } from "react-toastify";

import ProjectTable from "./components/ProjectTable";
import ProjectModal from "./components/ProjectModal";

import { FaPlus, FaSearch } from "react-icons/fa";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const getProjects = async () => {
    try {
      setLoading(true);

      const response = await api.get("/projects");

      setProjects(response.data.data);
      setFilteredProjects(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      await getProjects();
    };

    fetchProjects();
  }, []);

  // Search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = projects.filter((project) =>
      project.title.toLowerCase().includes(value),
    );

    setFilteredProjects(filtered);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>

          <p className="text-gray-500">Manage all your projects.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <FaPlus />
          New Project
        </button>
      </div>

      <div className="p-3 mb-2">
        <div className="relative w-96">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search Project..."
            onChange={handleSearch}
            className="border pl-10 pr-4 py-2 w-full border-[#bfc9c1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20 focus:border-[#0f5238] transition-all"
          />
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-2xs p-10 text-center">
          Loading Projects...
        </div>
      ) : (
        <ProjectTable projects={filteredProjects} />
      )}

      <ProjectModal
        show={showModal}
        setShow={setShowModal}
        refreshProjects={getProjects}
      />
    </div>
  );
}

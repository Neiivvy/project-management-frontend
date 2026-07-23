"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FaTimes, FaSearch, FaCheck, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import useProjectStore from "@/store/useProjectStore";
import { assignMembersToProject } from "@/api/projectApi";

export default function AssignMemberModal({ show, setShow, member }) {
  const {
    projects,
    fetchProjects,
    loading: isLoadingProjects,
  } = useProjectStore();

  const [isAssigning, setIsAssigning] = useState(false);
  const dialogRef = useRef(null);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (show) {
      fetchProjects();
    }
  }, [show, fetchProjects]);

  // Close on Escape
  useEffect(() => {
    if (!show) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShow(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [show, setShow]);

  const filteredProjects = useMemo(() => {
    if (!query.trim()) return projects;
    const q = query.toLowerCase();
    return projects.filter((p) => p.title?.toLowerCase().includes(q));
  }, [projects, query]);

  if (!show) return null;

  const toggleProject = (id) => {
    setSelectedProjects((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) setShow(false);
  };

  const initials = (name = "") =>
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("");

  const handleAssign = async () => {
    if (!selectedProjects.length) {
      toast.error("Please select at least one project");
      return;
    }

    setIsAssigning(true);
    try {
      const results = await Promise.all(
        selectedProjects.map((projectId) =>
          assignMembersToProject(projectId, member._id),
        ),
      );

      if (results.every(Boolean)) {
        toast.success(
          selectedProjects.length === 1
            ? "Member assigned to project"
            : `Member assigned to ${selectedProjects.length} projects`,
        );
        setSelectedProjects([]);
        setShow(false);
      } else {
        toast.error("Some assignments failed. Please try again.");
      }
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-[fadeIn_150ms_ease-out]"
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="assign-modal-title"
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 animate-[scaleIn_150ms_ease-out]"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0f5238]/10 text-sm font-semibold text-[#0f5238]">
              {initials(member?.name) || "?"}
            </div>
            <div className="min-w-0">
              <h2
                id="assign-modal-title"
                className="truncate text-lg font-semibold text-slate-900"
              >
                Assign {member?.name}
              </h2>
              <p className="text-sm text-slate-500">
                Choose one or more projects
              </p>
            </div>
          </div>

          <button
            onClick={() => setShow(false)}
            aria-label="Close dialog"
            className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5238]/40"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-slate-100 p-4">
          <div className="relative">
            <FaSearch
              size={13}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0f5238]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20"
            />
          </div>
        </div>

        {/* Project list */}
        <div className="max-h-80 overflow-y-auto p-4">
          {isLoadingProjects ? (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-slate-400">
              <FaSpinner className="animate-spin" size={18} />
              <p className="text-sm">Loading projects…</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-1 py-10 text-center">
              <p className="text-sm font-medium text-slate-600">
                {query ? "No projects match your search" : "No projects yet"}
              </p>
              <p className="text-sm text-slate-400">
                {query
                  ? "Try a different search term"
                  : "Create a project first to assign members"}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredProjects.map((project) => {
                const checked = selectedProjects.includes(project._id);
                return (
                  <label
                    key={project._id}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${
                      checked
                        ? "border-[#0f5238]/30 bg-[#0f5238]/5"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleProject(project._id)}
                      className="sr-only"
                    />
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                        checked
                          ? "border-[#0f5238] bg-[#0f5238] text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {checked && <FaCheck size={10} />}
                    </span>
                    <span className="truncate text-sm font-medium text-slate-700">
                      {project.title}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 p-4">
          <span className="text-sm text-slate-500">
            {selectedProjects.length > 0
              ? `${selectedProjects.length} selected`
              : "Nothing selected"}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setShow(false)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            >
              Cancel
            </button>

            <button
              onClick={handleAssign}
              disabled={isAssigning || !selectedProjects.length}
              className="flex items-center gap-2 rounded-lg bg-[#0f5238] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0c4530] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5238]/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isAssigning && <FaSpinner className="animate-spin" size={12} />}
              {isAssigning ? "Assigning…" : "Assign"}
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(4px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

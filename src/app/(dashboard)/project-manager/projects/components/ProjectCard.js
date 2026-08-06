"use client";

import { useRouter } from "next/navigation";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaFolderOpen,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";

export default function ProjectCard({
  project,
  index,
  currentPage,
  projectsPerPage,
  onEdit,
  onDelete,
}) {
  const router = useRouter();

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200";

      case "active":
        return "bg-blue-100 text-blue-700 ring-1 ring-blue-200";

      case "pending":
        return "bg-amber-100 text-amber-700 ring-1 ring-amber-200";

      default:
        return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-[#0f5238] to-emerald-500 text-white">
            <FaFolderOpen />
          </div>

          <div>
            <p className="text-xs text-slate-500">
              #{(currentPage - 1) * projectsPerPage + index + 1}
            </p>

            <h3 className="mt-1 font-bold text-slate-800">{project.title}</h3>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
            project.status,
          )}`}
        >
          {project.status || "Pending"}
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 line-clamp-2 text-sm text-slate-500">
        {project.description || "No description available."}
      </p>

      {/* Info */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Members</span>

          <div className="flex items-center gap-2 font-medium text-slate-700">
            <FaUsers className="text-[#0f5238]" />
            {project.teamMembers?.length || 0}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Deadline</span>

          <div className="flex items-center gap-2 font-medium text-slate-700">
            <FaCalendarAlt className="text-[#0f5238]" />

            <span className="text-sm">
              {project.deadline
                ? new Date(project.deadline).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <button
          onClick={() =>
            router.push(`/project-manager/projects/${project._id}`)
          }
          className="flex h-11 items-center justify-center rounded-xl border border-slate-200 text-green-600 transition hover:bg-green-600 hover:text-white"
        >
          <FaEye />
        </button>

        <button
          onClick={() => onEdit(project)}
          className="flex h-11 items-center justify-center rounded-xl border border-slate-200 text-blue-600 transition hover:bg-blue-600 hover:text-white"
        >
          <FaEdit />
        </button>

        <button
          onClick={() => onDelete(project)}
          className="flex h-11 items-center justify-center rounded-xl border border-slate-200 text-red-600 transition hover:bg-red-600 hover:text-white"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

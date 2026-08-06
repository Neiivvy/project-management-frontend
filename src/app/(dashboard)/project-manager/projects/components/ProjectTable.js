"use client";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaFolderOpen,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import ProjectCard from "./ProjectCard";

export default function ProjectTable({
  projects,
  currentPage,
  projectsPerPage,
  onEdit,
  onDelete,
}) {
  const router = useRouter();

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

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

  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;

  const currentProjects = sortedProjects.slice(indexOfFirst, indexOfLast);

  return (
    <>
      {/* Mobile & Tablet */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:hidden">
        {projects.length > 0 ? (
          currentProjects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              currentPage={currentPage}
              projectsPerPage={projectsPerPage}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="col-span-full rounded-3xl border border-slate-200 bg-white py-20 text-center shadow">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50">
              <FaFolderOpen className="text-5xl text-[#0f5238]" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-800">
              No Projects Yet
            </h2>

            <p className="mt-2 text-slate-500">
              Your projects will appear here once you create them.
            </p>
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-lg shadow-slate-200/50 ring-1 ring-slate-100">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="sticky top-0 z-10 bg-linear-to-r from-slate-50 via-white to-slate-50 backdrop-blur-sm border-b border-slate-200">
                <tr className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="px-4 py-3 w-10">SN</th>
                  <th className="px-5 py-3 text-center">Project</th>
                  <th className="px-5 py-3 text-center">Members</th>
                  <th className="px-5 py-3 text-center">Deadline</th>
                  <th className="px-5 py-3 text-center">Status</th>
                  <th className="px-5 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {projects.length > 0 ? (
                  currentProjects.map((project, index) => (
                    <tr
                      key={index}
                      className="group border-b border-slate-100 last:border-0 transition-all duration-300 hover:bg-emerald-50/60 hover:shadow-inner"
                    >
                      <td className="px-4 py-3 text-slate-500">
                        {(currentPage - 1) * projectsPerPage + index + 1}
                      </td>

                      <td className="px-5 py-3">
                        <div className="flex items-start gap-4 ">
                          <div className="flex h-8 sm:min-w-8 mt-2 items-center justify-center rounded-2xl bg-linear-to-br from-[#0f5238] to-emerald-500 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                            <FaFolderOpen className="text-2xs" />
                          </div>

                          <div>
                            <h3 className="text-2xs font-bold text-slate-800 group-hover:text-[#0f5238] transition">
                              {project.title}
                            </h3>

                            <p className="mt-1 max-w-xs text-xs text-slate-500 line-clamp-2">
                              {project.description || "No description"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <span className="rext-xs text-slate-700">
                            {project.teamMembers?.length || 0}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-emerald-700">
                          <FaCalendarAlt className="text-[#0f5238]" />
                          <span className="text-sm">
                            {project.deadline
                              ? new Date(project.deadline).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )
                              : "-"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${getStatusColor(project.status)}`}
                        >
                          <div className="h-2 w-2 rounded-full bg-current opacity-80"></div>

                          {project.status || "Pending"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-2 opacity-90 transition-all group-hover:opacity-100">
                          <button
                            title="View"
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-green-600 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#0f5238] hover:bg-green-700 hover:text-white"
                            onClick={() =>
                              router.push(
                                `/project-manager/projects/${project._id}`,
                              )
                            }
                          >
                            <FaEye />
                          </button>
                          <button
                            title="Edit"
                            onClick={() => onEdit(project)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-600 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#0f5238] hover:bg-blue-700 hover:text-white"
                          >
                            <FaEdit />
                          </button>
                          <button
                            title="Delete"
                            onClick={() => onDelete(project)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-red-600 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#0f5238] hover:bg-red-600 hover:text-white"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-24 text-center">
                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50">
                        <FaFolderOpen className="text-5xl text-[#0f5238]" />
                      </div>

                      <h2 className="mt-6 text-2xl font-bold text-slate-800">
                        No Projects Yet
                      </h2>

                      <p className="mx-auto mt-2 max-w-sm text-slate-500">
                        Your projects will appear here once you create them.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

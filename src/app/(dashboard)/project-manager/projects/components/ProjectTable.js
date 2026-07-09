"use client";

import { FaEdit, FaEye, FaArchive } from "react-icons/fa";

export default function ProjectTable({ projects }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr className="text-sm text-slate-600">
            <th className="px-6 py-4 text-left">Project</th>
            <th className="px-6 py-4 text-left">Manager</th>
            <th className="px-6 py-4 text-left">Deadline</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <tr
                key={project._id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="px-6 py-5">
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {project.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                      {project.description || "No description"}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5">{project.manager?.name || "-"}</td>

                <td className="px-6 py-5">
                  {project.deadline
                    ? new Date(project.deadline).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      project.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : project.status === "active"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-4">
                    <button className="text-blue-600 transition hover:text-blue-800">
                      <FaEye />
                    </button>

                    <button className="text-green-600 transition hover:text-green-800">
                      <FaEdit />
                    </button>

                    <button className="text-red-600 transition hover:text-red-800">
                      <FaArchive />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-12 text-center text-slate-500">
                No projects found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import { getMyProjects } from "@/api/projects";

const statusColor = {
  planning: "bg-gray-100 text-gray-700",
  active: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

export default function MemberProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyProjects()
      .then((res) => setProjects(res.data.data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load projects"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f7f6f6]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-[#181d19] mb-6">My Projects</h1>

          {loading && <p className="text-[#404943]">Loading projects...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && (
            <div className="grid md:grid-cols-2 gap-6">
              {projects.length === 0 && (
                <p className="text-[#404943]">You're not assigned to any projects yet.</p>
              )}

              {projects.map((project) => (
                <Link
                  key={project._id}
                  href={`/member/projects/${project._id}`}
                  className="block bg-white rounded-xl shadow-sm p-6 hover:border-[#2d6a4f]/40 border border-transparent transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-semibold text-[#181d19]">{project.title}</h2>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor[project.status] || "bg-gray-100"}`}>
                      {project.status === "active" ? "In Progress" : project.status}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-[#404943] mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#eef2ee]">
                      <div className="h-2 rounded-full bg-[#2d6a4f]" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>

                  <div className="text-sm text-[#404943] space-y-1">
                    <p>
                      Deadline:{" "}
                      <strong>
                        {project.deadline
                          ? new Date(project.deadline).toLocaleDateString(undefined, {
                              day: "numeric", month: "long", year: "numeric",
                            })
                          : "Not set"}
                      </strong>
                    </p>
                    <p>Manager: <strong>{project.manager?.name || "—"}</strong></p>
                    <p>Team size: {project.teamMembers?.length || 0}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
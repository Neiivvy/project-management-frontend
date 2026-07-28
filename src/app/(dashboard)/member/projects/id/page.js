"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import { getProject } from "@/api/projects";

const statusColor = {
  planning: "bg-gray-100 text-gray-700",
  active: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

export default function MemberProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProject(id)
      .then((res) => setProject(res.data.data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load project"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="flex min-h-screen bg-[#f7f6f6]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8 max-w-2xl">
          <button onClick={() => router.back()} className="text-sm text-[#404943] mb-4">
            ← Back
          </button>

          {loading && <p className="text-[#404943]">Loading project...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {project && (
            <>
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-2xl font-bold text-[#181d19]">{project.title}</h1>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColor[project.status] || "bg-gray-100"}`}>
                    {project.status === "active" ? "In Progress" : project.status}
                  </span>
                </div>

                {project.description && (
                  <p className="text-sm text-[#404943] mb-4">{project.description}</p>
                )}

                <div className="mb-4">
                  <div className="flex justify-between text-xs text-[#404943] mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#eef2ee]">
                    <div className="h-2 rounded-full bg-[#2d6a4f]" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-2 text-sm text-[#404943]">
                  <p>Deadline:</p>
                  <p className="text-[#181d19] font-medium">
                    {project.deadline
                      ? new Date(project.deadline).toLocaleDateString(undefined, {
                          day: "numeric", month: "long", year: "numeric",
                        })
                      : "Not set"}
                  </p>
                  <p>Manager:</p>
                  <p className="text-[#181d19] font-medium">{project.manager?.name || "—"}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-semibold text-[#181d19] mb-4">Team Members</h2>
                <div className="space-y-3">
                  {project.teamMembers?.length === 0 && (
                    <p className="text-sm text-[#404943]">No team members yet.</p>
                  )}
                  {project.teamMembers?.map((m) => (
                    <div key={m._id} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2d6a4f] text-white text-sm font-bold">
                        {m.name?.charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-[#181d19]">{m.name}</p>
                        <p className="text-xs text-[#404943]">{m.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
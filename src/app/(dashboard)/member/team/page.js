"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import { getMyProjects } from "@/api/projects";
import useAuthStore from "@/store/useAuthStore";

export default function MemberTeamPage() {
  const currentUser = useAuthStore((state) => state.user);
  const [teammates, setTeammates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await getMyProjects();
        const projects = res.data.data;
        const membersMap = new Map();

        projects.forEach((project) => {
          if (project.manager) {
            membersMap.set(project.manager._id, {
              ...project.manager,
              role: "Project Manager",
              projects: [project.title],
            });
          }

          (project.teamMembers || []).forEach((member) => {
            if (member._id === currentUser?._id) return;

            if (membersMap.has(member._id)) {
              membersMap.get(member._id).projects.push(project.title);
            } else {
              membersMap.set(member._id, { ...member, role: "Member", projects: [project.title] });
            }
          });
        });

        setTeammates(Array.from(membersMap.values()));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load team");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [currentUser]);

  return (
    <div className="flex min-h-screen bg-[#f7f6f6]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-[#181d19] mb-6">My Team</h1>

          {loading && <p className="text-[#404943]">Loading team...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {teammates.length === 0 && (
                <p className="text-[#404943]">No teammates found yet.</p>
              )}

              {teammates.map((person) => (
                <div key={person._id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d6a4f] text-white font-bold">
                      {person.name?.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <h2 className="font-semibold text-[#181d19]">{person.name}</h2>
                      <p className="text-xs text-[#404943]">{person.role}</p>
                    </div>
                  </div>

                  <p className="text-sm text-[#404943] mb-2">{person.email}</p>
                  <p className="text-xs text-[#404943]">
                    Shared projects: {person.projects.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
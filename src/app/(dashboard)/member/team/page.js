"use client";

import { useEffect, useState } from "react";
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
              membersMap
                .get(member._id)
                .projects.push(project.title);
            } else {
              membersMap.set(member._id, {
                ...member,
                role: "Member",
                projects: [project.title],
              });
            }
          });
        });

        setTeammates(Array.from(membersMap.values()));
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load team"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [currentUser]);

  return (
    <main className="min-h-screen bg-[#eaf7ef] p-8">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#123524]">
          My Team
        </h1>

        <p className="text-sm text-[#527565] mt-2">
          View your teammates and the projects you work on together.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-[#f4fbf6] border border-[#c7e3d1] rounded-2xl p-6 shadow-sm">
          <p className="text-[#527565]">
            Loading team...
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 shadow-sm">
          <p className="text-red-600">
            {error}
          </p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* No teammates */}
          {teammates.length === 0 && (
            <div className="col-span-full bg-[#f4fbf6] border border-[#c7e3d1] rounded-2xl p-8 text-center shadow-sm">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#dff3e6] flex items-center justify-center text-[#2d6a4f] text-2xl">
                👥
              </div>

              <p className="text-[#527565]">
                No teammates found yet.
              </p>
            </div>
          )}

          {teammates.map((person) => (
            <div
              key={person._id}
              className="
                group
                bg-[#f4fbf6]
                rounded-2xl
                border
                border-[#c7e3d1]
                shadow-[0_5px_18px_rgba(30,90,55,0.07)]
                p-6
                hover:shadow-[0_8px_25px_rgba(30,90,55,0.13)]
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              {/* Person Header */}
              <div className="flex items-center gap-4 mb-5">

                {/* Avatar */}
                <span
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#2d6a4f]
                    text-white
                    text-lg
                    font-bold
                    shadow-sm
                    group-hover:scale-105
                    transition-transform
                  "
                >
                  {person.name
                    ?.charAt(0)
                    .toUpperCase()}
                </span>

                {/* Name and Role */}
                <div className="min-w-0">
                  <h2 className="font-bold text-lg text-[#123524] truncate">
                    {person.name}
                  </h2>

                  <span
                    className={`
                      inline-block
                      mt-1
                      text-xs
                      font-semibold
                      px-2.5
                      py-1
                      rounded-full
                      ${
                        person.role === "Project Manager"
                          ? "bg-[#dcecff] text-[#175cd3]"
                          : "bg-[#dff3e6] text-[#087443]"
                      }
                    `}
                  >
                    {person.role}
                  </span>
                </div>

              </div>

              {/* Divider */}
              <div className="border-t border-[#d5e9dc] mb-5" />

              {/* Email */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-[#668273] uppercase tracking-wide mb-1">
                  Email
                </p>

                <p className="text-sm text-[#294c39] break-all">
                  {person.email}
                </p>
              </div>

              {/* Shared Projects */}
              <div>
                <p className="text-xs font-semibold text-[#668273] uppercase tracking-wide mb-2">
                  Shared Projects
                </p>

                <div className="flex flex-wrap gap-2">
                  {person.projects.map(
                    (project, index) => (
                      <span
                        key={index}
                        className="
                          inline-flex
                          items-center
                          px-3
                          py-1.5
                          rounded-lg
                          bg-[#eaf7ef]
                          border
                          border-[#d5e9dc]
                          text-xs
                          font-medium
                          text-[#2d6a4f]
                        "
                      >
                        {project}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Bottom accent */}
              <div className="mt-6 h-1 w-12 rounded-full bg-[#2d6a4f] group-hover:w-20 transition-all duration-300" />

            </div>
          ))}
        </div>
      )}
    </main>
  );
}
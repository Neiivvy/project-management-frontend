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
          // Project Manager
          if (project.manager) {
            membersMap.set(project.manager._id, {
              ...project.manager,
              role: "Project Manager",
              projects: [project.title],
            });
          }

          // Team Members
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

        setTeammates(
          Array.from(membersMap.values())
        );
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
    <main className="min-h-screen rounded-3xl bg-gradient-to-br from-[#effaf3] via-[#f7fcf8] to-[#e4f5eb] p-6 md:p-8">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="mb-7 flex items-center gap-4">

        {/* Team Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2d6a4f] to-[#40916c] text-white shadow-md shadow-[#2d6a4f]/20">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8zm6 0a3 3 0 100-6 3 3 0 000 6zM12 14a6 6 0 00-6 6h12a6 6 0 00-6-6z"
            />
          </svg>

        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#173c2b] md:text-3xl">
            My Team
          </h1>

          <p className="mt-1 text-sm text-[#64766b]">
            View your project managers and teammates
          </p>
        </div>

      </div>

      {/* =========================
          LOADING
      ========================= */}

      {loading && (
        <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-[#d4e9dc] bg-white/80 shadow-sm">

          <div className="flex flex-col items-center gap-3">

            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#dcefe3] border-t-[#2d6a4f]" />

            <p className="text-sm font-medium text-[#506158]">
              Loading team...
            </p>

          </div>

        </div>
      )}

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm">

          <p className="font-semibold text-red-700">
            Unable to load team
          </p>

          <p className="mt-1 text-sm text-red-600">
            {error}
          </p>

        </div>
      )}

      {/* =========================
          TEAM CARDS
      ========================= */}

      {!loading && !error && (
        <>
          {teammates.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#b9d9c4] bg-white/80 p-10 text-center shadow-sm">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e4f3e9] text-[#2d6a4f]">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8zm6 0a3 3 0 100-6 3 3 0 000 6z"
                  />
                </svg>

              </div>

              <p className="mt-3 font-semibold text-[#365f49]">
                No teammates found
              </p>

              <p className="mt-1 text-sm text-[#718077]">
                You haven't been assigned to a team yet.
              </p>

            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {teammates.map((person) => (
                <div
                  key={person._id}
                  className="group relative overflow-hidden rounded-2xl border border-[#c4dfce] bg-gradient-to-br from-white via-[#f9fcfa] to-[#e6f5eb] p-5 shadow-[0_6px_20px_rgba(45,106,79,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(45,106,79,0.13)]"
                >

                  {/* Top Green Line */}
                  <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#2d6a4f] to-[#8ac8a0]" />

                  {/* =========================
                      PERSON HEADER
                  ========================= */}

                  <div className="flex items-center gap-3">

                    {/* Avatar */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2d6a4f] to-[#40916c] text-sm font-bold text-white shadow-sm">
                      {person.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">

                      <h2 className="truncate font-semibold text-[#183c2a]">
                        {person.name}
                      </h2>

                      {/* Role */}
                      <span
                        className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          person.role ===
                          "Project Manager"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-[#e2f3e8] text-[#287a50]"
                        }`}
                      >
                        {person.role}
                      </span>

                    </div>

                  </div>

                  {/* Divider */}
                  <div className="my-4 h-px bg-[#dcebe1]" />

                  {/* =========================
                      EMAIL
                  ========================= */}

                  <div className="mb-3">

                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#718077]">
                      Email
                    </p>

                    <p className="mt-1 truncate text-sm text-[#405148]">
                      {person.email || "—"}
                    </p>

                  </div>

                  {/* =========================
                      PROJECTS
                  ========================= */}

                  <div>

                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#718077]">
                      Shared Projects
                    </p>

                    <div className="mt-2 flex flex-wrap gap-1.5">

                      {person.projects.map(
                        (project, index) => (
                          <span
                            key={index}
                            className="rounded-lg bg-[#e8f5ed] px-2.5 py-1 text-xs font-medium text-[#365f49]"
                          >
                            {project}
                          </span>
                        )
                      )}

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}
        </>
      )}
    </main>
  );
}
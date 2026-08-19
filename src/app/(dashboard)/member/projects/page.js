"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyProjects } from "@/api/projects";

const statusColor = {
  planning:
    "bg-amber-50 text-amber-700 border border-amber-200",
  active:
    "bg-blue-50 text-blue-700 border border-blue-200",
  completed:
    "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

export default function MemberProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyProjects()
      .then((res) => setProjects(res.data.data))
      .catch((err) =>
        setError(
          err.response?.data?.message ||
            "Failed to load projects"
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen rounded-3xl bg-gradient-to-br from-[#effaf3] via-[#f7fcf8] to-[#e4f5eb] p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4">

          {/* Header Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2d6a4f] to-[#40916c] shadow-md shadow-[#2d6a4f]/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h18M5 7v12a2 2 0 002 2h10a2 2 0 002-2V7M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#173c2b]">
              My Projects
            </h1>

            <p className="mt-1 text-sm text-[#64766b]">
              View and manage the projects assigned to you
            </p>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-[#d4e9dc] bg-white/80 shadow-sm backdrop-blur">
          <div className="flex flex-col items-center gap-4">

            <div className="h-11 w-11 animate-spin rounded-full border-4 border-[#dcefe3] border-t-[#2d6a4f]" />

            <p className="text-sm font-medium text-[#506158]">
              Loading projects...
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm">
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <span className="font-bold text-red-600">
                !
              </span>
            </div>

            <div>
              <p className="font-semibold text-red-700">
                Unable to load projects
              </p>

              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Projects */}
      {!loading && !error && (
        <>
          {projects.length === 0 ? (
            <div className="rounded-3xl border border-[#d4e9dc] bg-white/80 p-14 text-center shadow-sm">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e2f3e8] to-[#d2ecdc]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#2d6a4f]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7h18M5 7v12a2 2 0 002 2h10a2 2 0 002-2V7M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
                  />
                </svg>
              </div>

              <h2 className="text-lg font-bold text-[#173c2b]">
                No projects yet
              </h2>

              <p className="mt-2 text-sm text-[#64766b]">
                You&apos;re not assigned to any projects yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {projects.map((project) => (
                <Link
                  key={project._id}
                  href={`/member/projects/${project._id}`}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-[#b9dcc7]
                    bg-gradient-to-br
                    from-white
                    via-[#f5fbf7]
                    to-[#e4f4ea]
                    p-6
                    shadow-[0_8px_30px_rgba(45,106,79,0.08)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#70ad88]
                    hover:shadow-[0_15px_35px_rgba(45,106,79,0.16)]
                  "
                >

                  {/* Decorative Green Glow */}
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#b7dec5]/30 blur-2xl transition-all duration-300 group-hover:bg-[#8fc6a5]/40" />

                  {/* Small Top Accent */}
                  <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#2d6a4f] via-[#52a675] to-[#95d5ad]" />

                  {/* Project Header */}
                  <div className="relative mb-6 flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <h2 className="truncate text-xl font-bold text-[#17633f] transition-colors duration-300 group-hover:text-[#0f5132]">
                        {project.title}
                      </h2>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#40916c]" />

                        <p className="text-xs font-medium text-[#728178]">
                          Project
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${
                        statusColor[project.status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {project.status === "active"
                        ? "In Progress"
                        : project.status}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="mb-5 h-px bg-gradient-to-r from-transparent via-[#cfe5d6] to-transparent" />

                  {/* Project Details */}
                  <div className="relative space-y-4">

                    {/* Deadline */}
                    <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/70 p-3 transition-colors group-hover:bg-white/90">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e4f3e9] shadow-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-[#287a50]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>

                        <span className="text-sm font-medium text-[#64766b]">
                          Deadline
                        </span>
                      </div>

                      <strong className="text-right text-sm font-bold text-[#183c2a]">
                        {project.deadline
                          ? new Date(
                              project.deadline
                            ).toLocaleDateString(undefined, {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "Not set"}
                      </strong>
                    </div>

                    {/* Manager */}
                    <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/70 p-3 transition-colors group-hover:bg-white/90">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e4f3e9] shadow-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-[#287a50]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>

                        <span className="text-sm font-medium text-[#64766b]">
                          Manager
                        </span>
                      </div>

                      <strong className="max-w-[150px] truncate text-sm font-bold text-[#183c2a]">
                        {project.manager?.name || "—"}
                      </strong>
                    </div>

                    {/* Team */}
                    <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/70 p-3 transition-colors group-hover:bg-white/90">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e4f3e9] shadow-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-[#287a50]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m8-5a4 4 0 11-8 0 4 4 0 018 0zm4-2a3 3 0 11-6 0"
                            />
                          </svg>
                        </div>

                        <span className="text-sm font-medium text-[#64766b]">
                          Team size
                        </span>
                      </div>

                      <strong className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-[#dff1e5] px-2 text-sm font-bold text-[#17633f]">
                        {project.teamMembers?.length || 0}
                      </strong>
                    </div>
                  </div>

                  {/* View Project */}
                  <div className="relative mt-6 flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#d9f0e1] to-[#ccebd7] px-5 py-3.5 shadow-sm transition-all duration-300 group-hover:from-[#c8e9d3] group-hover:to-[#bce2ca]">

                    <span className="text-sm font-bold text-[#17633f]">
                      View Project
                    </span>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70 transition-transform duration-300 group-hover:translate-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#287a50]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
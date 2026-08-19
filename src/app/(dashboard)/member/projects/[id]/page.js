"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProject } from "@/api/projects";

const statusColor = {
  planning:
    "bg-amber-50 text-amber-700 border border-amber-200",
  active:
    "bg-blue-50 text-blue-700 border border-blue-200",
  completed:
    "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

export default function MemberProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    getProject(id)
      .then((res) => setProject(res.data.data))
      .catch((err) =>
        setError(
          err.response?.data?.message ||
            "Failed to load project"
        )
      )
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <main className="min-h-screen rounded-3xl bg-gradient-to-br from-[#effaf3] via-[#f7fcf8] to-[#e4f5eb] p-6 md:p-8">

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-2 rounded-xl border border-[#cfe4d6] bg-white/80 px-4 py-2 text-sm font-medium text-[#365f49] shadow-sm backdrop-blur transition-all duration-200 hover:-translate-x-0.5 hover:border-[#8fc4a2] hover:bg-white hover:text-[#17633f]"
      >
        <span className="text-lg">←</span>
        Back
      </button>

      {/* Loading */}
      {loading && (
        <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-[#d4e9dc] bg-white/80 shadow-sm backdrop-blur">
          <div className="flex flex-col items-center gap-4">
            <div className="h-11 w-11 animate-spin rounded-full border-4 border-[#dcefe3] border-t-[#2d6a4f]" />

            <p className="text-sm font-medium text-[#506158]">
              Loading project...
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
                Unable to load project
              </p>

              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Project */}
      {project && (
        <div className="max-w-4xl">

          {/* Project Information Card */}
          <div className="relative mb-6 overflow-hidden rounded-3xl border border-[#b9dcc7] bg-gradient-to-br from-white via-[#f7fcf8] to-[#e3f4e9] p-6 shadow-[0_10px_35px_rgba(45,106,79,0.10)] md:p-8">

            {/* Decorative glow */}
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#a9d8ba]/30 blur-3xl" />

            {/* Top green line */}
            <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-[#2d6a4f] via-[#52a675] to-[#a1d8b3]" />

            {/* Header */}
            <div className="relative mb-6 flex items-start justify-between gap-4">

              <div>
                <div className="flex items-center gap-3">

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
                        d="M3 7h18M5 7v12a2 2 0 002 2h10a2 2 0 002-2V7M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
                      />
                    </svg>
                  </div>

                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-[#173c2b] md:text-3xl">
                      {project.title}
                    </h1>

                    <p className="mt-1 text-sm text-[#6b7d72]">
                      Project Details
                    </p>
                  </div>
                </div>
              </div>

              <span
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold shadow-sm ${
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
            <div className="mb-6 h-px bg-gradient-to-r from-transparent via-[#cde4d5] to-transparent" />

            {/* Description */}
            {project.description && (
              <div className="mb-6 rounded-2xl border border-[#d8ebe0] bg-white/70 p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#2d6a4f]">
                  Description
                </p>

                <p className="text-sm leading-6 text-[#53645a]">
                  {project.description}
                </p>
              </div>
            )}

            {/* Project Information */}
            <div className="grid gap-4 md:grid-cols-2">

              {/* Deadline */}
              <div className="flex items-center gap-4 rounded-2xl border border-[#d7e9dd] bg-white/70 p-4 transition-all hover:bg-white hover:shadow-sm">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e2f3e8]">
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

                <div>
                  <p className="text-xs font-medium text-[#718077]">
                    Deadline
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#183c2a]">
                    {project.deadline
                      ? new Date(
                          project.deadline
                        ).toLocaleDateString(undefined, {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Not set"}
                  </p>
                </div>
              </div>

              {/* Manager */}
              <div className="flex items-center gap-4 rounded-2xl border border-[#d7e9dd] bg-white/70 p-4 transition-all hover:bg-white hover:shadow-sm">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e2f3e8]">
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

                <div>
                  <p className="text-xs font-medium text-[#718077]">
                    Manager
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#183c2a]">
                    {project.manager?.name || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members Card */}
          <div className="relative overflow-hidden rounded-3xl border border-[#b9dcc7] bg-gradient-to-br from-white via-[#f7fcf8] to-[#e6f5eb] p-6 shadow-[0_10px_35px_rgba(45,106,79,0.08)] md:p-8">

            {/* Decorative glow */}
            <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-[#a9d8ba]/20 blur-3xl" />

            {/* Header */}
            <div className="relative mb-6 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold text-[#173c2b]">
                  Team Members
                </h2>

                <p className="mt-1 text-sm text-[#718077]">
                  People assigned to this project
                </p>
              </div>

              <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-[#dff1e5] px-3 text-sm font-bold text-[#17633f]">
                {project.teamMembers?.length || 0}
              </div>
            </div>

            {/* Team List */}
            <div className="relative space-y-3">

              {project.teamMembers?.length === 0 && (
                <div className="rounded-2xl border border-dashed border-[#b9d9c4] bg-white/60 p-8 text-center">
                  <p className="text-sm text-[#64766b]">
                    No team members yet.
                  </p>
                </div>
              )}

              {project.teamMembers?.map((m) => (
                <div
                  key={m._id}
                  className="flex items-center gap-4 rounded-2xl border border-[#d7e9dd] bg-white/75 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                >

                  {/* Avatar */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2d6a4f] to-[#40916c] text-sm font-bold text-white shadow-sm">
                    {m.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#183c2a]">
                      {m.name}
                    </p>

                    <p className="truncate text-xs text-[#64766b]">
                      {m.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  FaArrowLeft,
  FaFolderOpen,
  FaUsers,
  FaCalendarAlt,
  FaSpinner,
  FaTasks,
  FaCheckCircle,
  FaUserMinus,
} from "react-icons/fa";

import axiosInstance from "@/api/axios";
import useProjectStore from "@/store/useProjectStore";
import useReportStore from "@/store/useReportStore";

export default function ProjectDetailsPage() {
  const router = useRouter();
  const { projectId } = useParams();

  const { project, loading, error, fetchProjectById } = useProjectStore();

  const report = useReportStore((state) => state.report);
  const fetchReport = useReportStore((state) => state.fetchReport);

  useEffect(() => {
    if (projectId) {
      fetchProjectById(projectId);
      fetchReport(projectId);
    }
  }, [projectId, fetchProjectById, fetchReport]);

  const handleRemoveMember = async (member) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${member.name} from this project?\n\nThey will also be removed from all tasks related to this project.`,
    );

    if (!confirmed) return;

    try {
      await axiosInstance.delete(
        `/projects/${projectId}/members/${member._id || member.id}`,
      );

      // Refresh project details
      await fetchProjectById(projectId);

      // Refresh report if member/task information is included
      await fetchReport(projectId);
    } catch (error) {
      console.error("Failed to remove member:", error);

      alert(
        error?.response?.data?.message ||
          "Failed to remove member from project",
      );
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const statusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "active":
        return "bg-blue-100 text-blue-700";

      case "planning":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <FaSpinner className="animate-spin text-5xl text-green-700" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h2 className="text-2xl font-bold text-red-600">{error}</h2>

        <button
          onClick={() => router.back()}
          className="mt-6 px-6 py-3 rounded-lg bg-green-700 text-white hover:bg-green-800"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <h2 className="text-2xl font-semibold">Project not found.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-1">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-11 h-11 rounded-lg bg-white shadow flex items-center justify-center hover:bg-gray-100"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {project.title}
            </h1>

            <p className="text-gray-500">Project Details</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        {/* Status */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>

              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${statusColor(
                  project.status,
                )}`}
              >
                {project.status}
              </span>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f2ee]">
              <FaFolderOpen className="text-xl text-[#0f5238]" />
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Team Members</p>

              <h2 className="mt-2 text-3xl font-bold text-[#10231b]">
                {project.teamMembers?.length || 0}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
              <FaUsers className="text-xl text-slate-600" />
            </div>
          </div>
        </div>

        {/* Total Tasks */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Tasks</p>

              <h2 className="mt-2 text-3xl font-bold text-[#10231b]">
                {project.tasks?.length || 0}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <FaTasks className="text-xl text-blue-600" />
            </div>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Completed Tasks
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#10231b]">
                {project.tasks?.filter((task) => task.status === "Completed")
                  .length || 0}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
              <FaCheckCircle className="text-xl text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Description</h2>

            <p className="text-gray-600 leading-7">
              {project.description || "No description available."}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-5">Schedule</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-5 flex gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <FaCalendarAlt className="text-green-700 text-xl" />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Start Date</p>

                  <h3 className="font-semibold mt-1">
                    {formatDate(project.createdAt)}
                  </h3>
                </div>
              </div>

              <div className="border rounded-lg p-5 flex gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <FaCalendarAlt className="text-green-700 text-xl" />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Update Date</p>

                  <h3 className="font-semibold mt-1">
                    {formatDate(project.updatedAt)}
                  </h3>
                </div>
              </div>

              <div className="border rounded-lg p-5 flex gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <FaCalendarAlt className="text-red-600 text-xl" />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">End Date</p>

                  <h3 className="font-semibold mt-1">
                    {formatDate(project.deadline)}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-5">Project Manager</h2>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-lg">
                {project.manager?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  {project.manager?.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {project.manager?.email}
                </p>

                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-purple-100 text-[#2d6a4f] text-xs font-semibold capitalize">
                  {project.manager?.role}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold">Team Members</h2>

              <span className="rounded-full bg-[#e8f2ee] px-3 py-1 text-xs font-semibold text-[#0f5238]">
                {project.teamMembers?.length || 0} Members
              </span>
            </div>

            {project.teamMembers?.length ? (
              <div className="max-h-90 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                {project.teamMembers.map((member, index) => {
                  const memberId = member._id || member.id;

                  return (
                    <div
                      key={memberId || index}
                      className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3 transition hover:border-gray-300 hover:bg-gray-50"
                    >
                      {/* Member Info */}
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2d6a4f] font-semibold text-sm text-white">
                          {member.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate font-semibold text-gray-800">
                            {member.name}
                          </h3>

                          <p className="truncate text-sm text-gray-500">
                            {member.email || "No email"}
                          </p>
                        </div>
                      </div>

                      {/* Right Side */}
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="hidden rounded-full bg-blue-100 px-3 py-1 text-xs font-medium capitalize text-blue-700 sm:inline-flex">
                          {member.role}
                        </span>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(member)}
                          title="Remove member"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-500 transition hover:border-red-300 hover:bg-red-100 hover:text-red-600"
                        >
                          <FaUserMinus size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-6 text-center text-gray-500">
                No team members assigned.
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-5">Project Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                    project.status,
                  )}`}
                >
                  {project.status}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Manager</span>
                <span className="font-medium">{project.manager?.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Members</span>
                <span className="font-medium">
                  {project.teamMembers?.length || 0}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Start</span>
                <span className="font-medium">
                  {formatDate(project.createdAt)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">End</span>
                <span className="font-medium">
                  {formatDate(project.deadline)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  FaArrowLeft,
  FaFolderOpen,
  FaUsers,
  FaCalendarAlt,
  FaSpinner,
} from "react-icons/fa";
import useProjectStore from "@/store/useProjectStore";

export default function ProjectDetailsPage() {
  const router = useRouter();
  const { projectId } = useParams();

  const { project, loading, error, fetchProjectById } = useProjectStore();
  useEffect(() => {
    if (projectId) {
      fetchProjectById(projectId);
    }
  }, [projectId, fetchProjectById]);

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
      {/* Header */}

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

      {/* Overview Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Status</p>

              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                  project.status,
                )}`}
              >
                {project.status}
              </span>
            </div>

            <FaFolderOpen className="text-3xl text-green-700" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Team Members</p>

              <h2 className="text-3xl font-bold mt-2">
                {project.teamMembers?.length || 0}
              </h2>
            </div>

            <FaUsers className="text-3xl text-[#2d6a4f]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT */}

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
          {/* Project Information */}
        </div>

        {/* RIGHT SIDEBAR */}

        <div className="space-y-6">
          {/* Manager */}

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

          {/* Team Members */}

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-5">Team Members</h2>

            {project.teamMembers?.length ? (
              <div className="space-y-4">
                {project.teamMembers.map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full  bg-[#2d6a4f] text-white flex items-center justify-center font-semibold">
                        {member.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>

                      <div>
                        <h3 className="font-semibold">{member.name}</h3>

                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium capitalize">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No team members assigned.
              </div>
            )}
          </div>

          {/* Summary */}

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

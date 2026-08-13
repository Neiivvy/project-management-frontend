"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const projects = [
  {
    id: "cowork",
    name: "Co-Work",
    status: "completed",
    progress: 10,
    deadline: "August 1, 2026",
    manager: "Sagar Shrestha",
    teamSize: 4,
    description:
      "Co-Work is a project management system designed to help teams manage projects, tasks, members and deadlines.",
    tasks: [
      "Project planning",
      "Create dashboard",
      "User management",
      "Task management",
    ],
  },
  {
    id: "elearning",
    name: "E-Learning system",
    status: "planning",
    progress: 10,
    deadline: "July 31, 2026",
    manager: "Sagar Shrestha",
    teamSize: 4,
    description:
      "An online learning platform for managing courses, students, instructors and learning activities.",
    tasks: [
      "Create course system",
      "Student registration",
      "Instructor management",
      "Course enrollment",
    ],
  },
  {
    id: "codeit",
    name: "CodeIT",
    status: "In Progress",
    progress: 10,
    deadline: "August 16, 2026",
    manager: "Project Manager",
    teamSize: 4,
    description:
      "CodeIT is a software development project for creating and managing coding-related activities.",
    tasks: [
      "Create project structure",
      "Frontend development",
      "Backend development",
      "Testing",
    ],
  },
  {
    id: "codeit-project",
    name: "CodeIt project",
    status: "completed",
    progress: 10,
    deadline: "August 1, 2026",
    manager: "Project Manager",
    teamSize: 4,
    description:
      "A software project developed by the project team.",
    tasks: [
      "Project setup",
      "UI development",
      "API development",
      "Final testing",
    ],
  },
];

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [project, setProject] = useState(null);

  useEffect(() => {
    const foundProject = projects.find(
      (item) => item.id === params.id
    );

    setProject(foundProject);
  }, [params.id]);

  if (!project) {
    return (
      <div className="p-8">
        <p className="text-red-600">
          Project not found.
        </p>

        <button
          onClick={() => router.push("/member/projects")}
          className="mt-4 px-5 py-2 bg-green-700 text-white rounded-lg"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">

      {/* Back button */}
      <button
        onClick={() => router.push("/member/projects")}
        className="mb-6 text-green-700 font-medium"
      >
        ← Back to Projects
      </button>

      {/* Project Header */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">

        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {project.name}
            </h1>

            <p className="text-gray-500 mt-2">
              Project Details
            </p>
          </div>

          <span
            className={`px-4 py-2 rounded-full font-medium ${
              project.status === "completed"
                ? "bg-green-100 text-green-700"
                : project.status === "planning"
                ? "bg-gray-100 text-gray-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {project.status}
          </span>
        </div>

        
        {/* Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-gray-500">
              Deadline
            </p>
            <p className="font-semibold text-lg">
              {project.deadline}
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-gray-500">
              Manager
            </p>
            <p className="font-semibold text-lg">
              {project.manager}
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-gray-500">
              Team Size
            </p>
            <p className="font-semibold text-lg">
              {project.teamSize} members
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-gray-500">
              Status
            </p>
            <p className="font-semibold text-lg">
              {project.status}
            </p>
          </div>

        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3">
            Description
          </h2>

          <p className="text-gray-600 leading-7">
            {project.description}
          </p>
        </div>

        {/* Tasks */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            Project Tasks
          </h2>

          <div className="space-y-3">
            {project.tasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                  ✓
                </div>

                <span>{task}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
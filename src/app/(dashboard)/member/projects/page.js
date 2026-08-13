"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getMyProjects } from "@/api/projects";
import { getMyTasks } from "@/api/tasks";

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
  },
];

export default function ProjectsPage() {
  const [projectProgress, setProjectProgress] = useState({});

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        // Get REAL projects from database
        const projectsResponse = await getMyProjects();

        // Get REAL tasks assigned to logged-in member
        const tasksResponse = await getMyTasks();

        const myProjects =
          projectsResponse?.data?.data || [];

        const myTasks =
          tasksResponse?.data?.data || [];

        console.log("MY PROJECTS:", myProjects);
        console.log("MY TASKS:", myTasks);

        const progress = {};

        /*
         * Match our static project name
         * with the real MongoDB project.
         */
        projects.forEach((staticProject) => {
          const realProject = myProjects.find((dbProject) => {
            const dbProjectName =
              dbProject.name ||
              dbProject.title ||
              dbProject.projectName ||
              "";

            return (
              dbProjectName.trim().toLowerCase() ===
              staticProject.name.trim().toLowerCase()
            );
          });

          // If project is not found in database
          if (!realProject) {
            progress[staticProject.id] = 0;
            return;
          }

          // REAL MongoDB project ID
          const realProjectId =
            realProject._id || realProject.id;

          /*
           * Find all tasks belonging to this
           * MongoDB project.
           */
          const projectTasks = myTasks.filter((task) => {
            const taskProject = task.projectId || task.project;

            if (!taskProject) {
              return false;
            }

            const taskProjectId =
              typeof taskProject === "object"
                ? taskProject._id || taskProject.id
                : taskProject;

            return (
              String(taskProjectId) ===
              String(realProjectId)
            );
          });

          const totalTasks = projectTasks.length;

          /*
           * Count ONLY completed tasks.
           */
          const completedTasks = projectTasks.filter(
            (task) =>
              String(task.status)
                .trim()
                .toLowerCase() === "completed"
          ).length;

          /*
           * Accurate percentage
           *
           * Example:
           * 4 completed / 5 total = 80%
           */
          const percentage =
            totalTasks > 0
              ? Math.round(
                  (completedTasks / totalTasks) * 100
                )
              : 0;

          progress[staticProject.id] = percentage;

          console.log(
            staticProject.name,
            {
              projectId: realProjectId,
              totalTasks,
              completedTasks,
              percentage,
            }
          );
        });

        setProjectProgress(progress);
      } catch (error) {
        console.error(
          "Failed to fetch project progress:",
          error
        );
      }
    };

    fetchProgress();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/member/projects/${project.id}`}
            className="block"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm border hover:shadow-lg transition cursor-pointer">
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  {project.name}
                </h2>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
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

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span>Progress</span>

                  <span>
                    {projectProgress[project.id] ?? 0}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-700 h-3 rounded-full"
                    style={{
                      width: `${
                        projectProgress[project.id] ?? 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-3 text-gray-700">
                <p>
                  Deadline:{" "}
                  <strong>{project.deadline}</strong>
                </p>

                <p>
                  Manager:{" "}
                  <strong>{project.manager}</strong>
                </p>

                <p>
                  Team size: {project.teamSize}
                </p>
              </div>

              <div className="mt-6 text-green-700 font-medium">
                Click to view project details →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
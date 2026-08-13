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
        // Get real projects from database
        const projectsResponse = await getMyProjects();

        // Get real tasks assigned to logged-in member
        const tasksResponse = await getMyTasks();

        const myProjects =
          projectsResponse?.data?.data || [];

        const myTasks =
          tasksResponse?.data?.data || [];

        console.log("MY PROJECTS:", myProjects);
        console.log("MY TASKS:", myTasks);

        const progress = {};

        /*
         * Match static projects with
         * real MongoDB projects.
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

          // Project doesn't exist in database
          if (!realProject) {
            progress[staticProject.id] = 0;
            return;
          }

          // Get real MongoDB project ID
          const realProjectId =
            realProject._id || realProject.id;

          /*
           * Find tasks belonging to this project.
           */
          const projectTasks = myTasks.filter((task) => {
            const taskProject =
              task.projectId || task.project;

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

          // Total tasks for this project
          const totalTasks = projectTasks.length;

          // Completed tasks
          const completedTasks = projectTasks.filter(
            (task) =>
              String(task.status)
                .trim()
                .toLowerCase() === "completed"
          ).length;

          /*
           * Calculate accurate percentage.
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
    <div className="min-h-screen bg-[#eaf7ef] p-6 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#123524]">
            My Projects
          </h1>

          <p className="text-sm text-[#527565] mt-2">
            Projects assigned to you
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/member/projects/${project.id}`}
              className="block group"
            >
              <div
                className="
                  relative
                  bg-[#f4fbf6]
                  border border-[#c7e3d1]
                  rounded-3xl
                  p-7
                  shadow-[0_4px_12px_rgba(30,90,55,0.08)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#f0faf3]
                  hover:shadow-[0_14px_35px_rgba(30,90,55,0.15)]
                  hover:border-[#9fcdb0]
                  overflow-hidden
                "
              >

                {/* Top Green Accent */}
                <div
                  className="
                    absolute
                    top-0
                    left-8
                    right-8
                    h-[4px]
                    bg-[#16834b]
                    rounded-b-full
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                  "
                />

                {/* Project Header */}
                <div className="flex justify-between items-start gap-5">

                  <div className="min-w-0">

                    {/* Project Label */}
                    <p className="text-xs font-semibold tracking-wider text-[#6b9680] mb-3">
                      PROJECT
                    </p>

                    {/* Project Name */}
                    <h2 className="text-2xl font-semibold text-[#123524] group-hover:text-[#087443] transition-colors">
                      {project.name}
                    </h2>

                  </div>

                  {/* Status */}
                  <span
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${
                      project.status === "completed"
                        ? "bg-[#c9f4d9] text-[#087443]"
                        : project.status === "planning"
                        ? "bg-[#fff0cf] text-[#986000]"
                        : "bg-[#dcecff] text-[#175cd3]"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        project.status === "completed"
                          ? "bg-[#087443]"
                          : project.status === "planning"
                          ? "bg-[#f79009]"
                          : "bg-[#175cd3]"
                      }`}
                    />

                    {project.status}
                  </span>

                </div>

                {/* Description */}
                <p className="mt-6 text-[15px] leading-6 text-[#527565]">
                  {project.description}
                </p>

                {/* Information Section */}
                <div className="mt-7 pt-5 border-t border-[#d5e9dc]">

                  <div className="grid grid-cols-2 gap-5">

                    {/* Deadline */}
                    <div>
                      <div className="flex items-center gap-2 text-[#5c7d6b] text-sm mb-2">

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.7"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3.75 9.75h16.5M5.25 5.25h13.5A1.5 1.5 0 0 1 20.25 6.75v12A1.5 1.5 0 0 1 18.75 20.25H5.25a1.5 1.5 0 0 1-1.5-1.5v-12a1.5 1.5 0 0 1 1.5-1.5Z"
                          />
                        </svg>

                        <span>Deadline</span>
                      </div>

                      <p className="text-sm font-semibold text-[#294c39]">
                        {project.deadline}
                      </p>
                    </div>

                    {/* Team */}
                    <div>
                      <div className="flex items-center gap-2 text-[#5c7d6b] text-sm mb-2">

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.7"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19.128a9.38 9.38 0 0 0 3.75.872 9.38 9.38 0 0 0 3.75-.872M15 19.128v-.02a4.5 4.5 0 0 0-4.5-4.5h-1a4.5 4.5 0 0 0-4.5 4.5v.02M15 19.128a9.38 9.38 0 0 1-3.75.872 9.38 9.38 0 0 1-3.75-.872M18 8.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9.75 9.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1-4.5 0Z"
                          />
                        </svg>

                        <span>Team</span>
                      </div>

                      <p className="text-sm font-semibold text-[#294c39]">
                        {project.teamSize} members
                      </p>
                    </div>

                  </div>

                  {/* Manager */}
                  <div className="mt-5 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      {/* Manager Avatar */}
                      <div
                        className="
                          w-10
                          h-10
                          rounded-full
                          bg-[#087443]
                          text-white
                          flex
                          items-center
                          justify-center
                          text-sm
                          font-bold
                          shadow-sm
                        "
                      >
                        {project.manager
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="text-xs text-[#71917f]">
                          Manager
                        </p>

                        <p className="text-sm font-semibold text-[#294c39]">
                          {project.manager}
                        </p>
                      </div>

                    </div>

                    {/* View Details Arrow */}
                    <div
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-[#d9f3e2]
                        text-[#087443]
                        flex
                        items-center
                        justify-center
                        text-xl
                        group-hover:bg-[#087443]
                        group-hover:text-white
                        group-hover:translate-x-1
                        transition-all
                      "
                    >
                      →
                    </div>

                  </div>

                </div>

              </div>
            </Link>
          ))}

        </div>
      </div>
    </div>
  );
}
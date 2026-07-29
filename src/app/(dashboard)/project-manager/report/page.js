"use client";

import { useEffect, useMemo, useState } from "react";

import useProjectStore from "@/store/useProjectStore";
import useReportStore from "@/store/useReportStore";

import ReportCard from "./components/ReportCard";
import ProjectInfoCard from "./components/ProjectInfoCard";
import ProgressBar from "./components/ProgressBar";
import TaskStatusChart from "./components/TaskStatusChart";
import TeamPerformanceTable from "./components/TeamPerformanceTable";
import ExportPdfButton from "./components/ExportPdfButton";

import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaChevronDown,
  FaClipboardList,
} from "react-icons/fa";

import ReportSummary from "./components/ReportSummary";

export default function ReportsPage() {
  const projects = useProjectStore((state) => state.projects);

  const fetchProjects = useProjectStore((state) => state.fetchProjects);

  const report = useReportStore((state) => state.report);

  const fetchReport = useReportStore((state) => state.fetchReport);

  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    if (selectedProject) {
      fetchReport(selectedProject);
    }
  }, [selectedProject, fetchReport]);

  const projectStats = useMemo(() => {
    return {
      totalProjects: projects.length,

      completedProjects: projects.filter(
        (p) => p.status?.toLowerCase() === "completed",
      ).length,

      activeProjects: projects.filter(
        (p) =>
          p.status?.toLowerCase() === "active" ||
          p.status?.toLowerCase() === "in progress",
      ).length,

      planningProjects: projects.filter(
        (p) =>
          p.status?.toLowerCase() === "planning" ||
          p.status?.toLowerCase() === "pending",
      ).length,
    };
  }, [projects]);

  return (
    <div className="min-h-screen bg-[#f6f5f2]">
      <div className="mx-auto max-w-7xl p-6 space-y-8">
        {/* HEADER */}

        <div className=" flex flex-col gap-6 ">
          <div>
            <p className=" text-xs font-semibold uppercase tracking-widest text-[#0f5238] ">
              Analytics
            </p>

            <h1 className=" mt-2 text-3xl font-bold text-[#10231b] ">
              Project Reports
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Track project performance, tasks and team progress.
            </p>
          </div>

          {/* SUMMARY CARDS */}

          <ReportSummary projectStats={projectStats} />

          {/* FILTER BAR */}

          <div className=" flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between ">
            <div
              className="
              relative w-full md:w-80 "
            >
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className=" w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-[#0f5238] focus:ring-2 focus:ring-[#0f5238]/20 "
              >
                <option value="">Select Project</option>

                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.title}
                  </option>
                ))}
              </select>

              <FaChevronDown className=" pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 " />
            </div>

            <ExportPdfButton report={report} />
          </div>
        </div>

        {/* EMPTY STATE */}

        {!report && (
          <div className=" flex min-h-87.5 flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white text-center shadow-sm ">
            <div className=" flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8f2ee] text-2xl text-[#0f5238] ">
              <FaClipboardList />
            </div>

            <h3 className=" mt-5 text-lg font-semibold text-[#10231b] ">
              No project selected
            </h3>

            <p className=" mt-2 max-w-sm text-sm text-gray-400 ">
              Select a project above to view detailed analytics.
            </p>
          </div>
        )}

        {/* REPORT CONTENT */}

        {report && (
          <div className="space-y-6">
            <ProjectInfoCard report={report} />

            <div className=" grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 ">
              <ReportCard
                title="Total Tasks"
                value={report.totalTasks}
                icon={<FaTasks />}
                accent="green"
              />

              <ReportCard
                title="Completed"
                value={report.completedTasks}
                icon={<FaCheckCircle />}
                accent="indigo"
              />

              <ReportCard
                title="In Progress"
                value={report.inProgressTasks}
                icon={<FaClock />}
                accent="amber"
              />

              <ReportCard
                title="Team Members"
                value={report.teamSize}
                icon={<FaUsers />}
                accent="slate"
              />
            </div>

            <ProgressBar percentage={report.completionPercentage} />

            <div className=" grid grid-cols-1 gap-6 xl:grid-cols-2 ">
              <TaskStatusChart report={report} />

              <TeamPerformanceTable tasksByMember={report.tasksByMember} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

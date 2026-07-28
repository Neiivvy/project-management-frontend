"use client";

import { useEffect, useState, useRef } from "react";
import { FiBarChart2 } from "react-icons/fi";

import OverviewCards from "@/components/reports/admin/OverviewCards";
import TopPMTable from "@/components/reports/admin/TopPMTable";
import UserSelector from "@/components/reports/admin/UserSelector";
import ProjectSelector from "@/components/reports/admin/ProjectSelector";
import UserReportCard from "@/components/reports/admin/UserReportCard";
import ProjectReportCard from "@/components/reports/admin/ProjectReportCard";
import EmptyReport from "@/components/reports/admin/EmptyReport";
import LoadingReport from "@/components/reports/admin/LoadingReport";

import {
  fetchAdminOverviewApi,
  fetchProjectReportApi,
  fetchUserReportApi,
} from "@/api/admin/reports";

import { fetchProjectsApi } from "@/api/admin/project";
import { fetchUsersApi } from "@/api/admin/users";

import useReportStore from "@/store/admin/useReportStore";

export default function ReportsPage() {
  const {
    overview,
    userReport,
    projectReport,

    selectedUser,
    selectedProject,

    setOverview,
    setUserReport,
    setProjectReport,

    setSelectedUser,
    setSelectedProject,
  } = useReportStore();

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(false);

  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(-10px)";

    const timeout = setTimeout(() => {
      el.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);

        const [overviewRes, usersRes, projectsRes] = await Promise.all([
          fetchAdminOverviewApi(),
          fetchUsersApi(),
          fetchProjectsApi(),
        ]);

        // admin overview
       setOverview(overviewRes.data);

        // users
        setUsers(usersRes.data || usersRes.users || []);

        // projects
        setProjects(projectsRes.data || projectsRes.projects || []);
      } catch (error) {
        console.error("Failed loading reports", error);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, [setOverview]);

  const handleUserSelect = async (userId) => {
    setSelectedUser(userId);

    setProjectReport(null);

    if (!userId) {
      setUserReport(null);

      return;
    }

    try {
      setReportLoading(true);

      const res = await fetchUserReportApi(userId);

      setUserReport(res.data);
    } catch (error) {
      console.error("Failed loading user report", error);
    } finally {
      setReportLoading(false);
    }
  };

  const handleProjectSelect = async (projectId) => {
    setSelectedProject(projectId);

    setUserReport(null);

    if (!projectId) {
      setProjectReport(null);

      return;
    }

    try {
      setReportLoading(true);

      const res = await fetchProjectReportApi(projectId);

      setProjectReport(res.data);
    } catch (error) {
      console.error("Failed loading project report", error);
    } finally {
      setReportLoading(false);
    }
  };

  if (loading) {
    return <LoadingReport />;
  }

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div ref={headerRef}>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a7a4c]/10 text-[#1a7a4c]">
            <FiBarChart2 className="text-lg" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#181d19]">
              Reports
            </h1>
            <p className="text-sm text-slate-500">
              Analyze users, projects and task performance
            </p>
          </div>
        </div>
      </div>

      {overview && (
        <>
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Overview
              </h2>
              <div className="flex-1 h-px bg-slate-200" />
            </div>
            <OverviewCards overview={overview} />
          </section>

          <section>
            <TopPMTable topProjectManagers={overview.topProjectManagers} />
          </section>
        </>
      )}

      {/* Selectors */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Detailed Reports
          </h2>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >
          <UserSelector
            users={users}
            selectedUser={selectedUser}
            onSelect={handleUserSelect}
          />

          <ProjectSelector
            projects={projects}
            selectedProject={selectedProject}
            onSelect={handleProjectSelect}
          />
        </div>
      </section>

      {/* Report Content */}
      <section className="space-y-6">
        {reportLoading && <LoadingReport />}

        {!reportLoading && userReport && (
          <UserReportCard report={userReport} />
        )}

        {!reportLoading && projectReport && (
          <ProjectReportCard report={projectReport} />
        )}

        {!userReport && !projectReport && !reportLoading && <EmptyReport />}
      </section>
    </div>
  );
}

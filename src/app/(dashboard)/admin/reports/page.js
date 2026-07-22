"use client";

import { useEffect, useState } from "react";

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
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>

        <p className="text-gray-500">
          Analyze users, projects and task performance
        </p>
      </div>

      {overview && (
        <>
          <OverviewCards overview={overview} />

          <TopPMTable data={overview.topProjectManagers} />
        </>
      )}

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

      {reportLoading && <LoadingReport />}

      {!reportLoading && userReport && <UserReportCard report={userReport} />}

      {!reportLoading && projectReport && (
        <ProjectReportCard report={projectReport} />
      )}

      {!userReport && !projectReport && !reportLoading && <EmptyReport />}
    </div>
  );
}

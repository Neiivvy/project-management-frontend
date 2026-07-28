"use client";

import { useEffect, useMemo, useState } from "react";
import useProjectStore from "@/store/useProjectStore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useRef } from "react";
import { FaTasks } from "react-icons/fa";

import {
  FiDownload,
  FiPrinter,
  FiCalendar,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiChevronDown,
  FiFolder,
  FiFlag,
  FiTrendingUp,
  FiAlertTriangle,
} from "react-icons/fi";
import useTaskStore from "@/store/useTaskStore";
import useUserStore from "@/store/useUserStore";

const dateRanges = ["Last 7 days", "Last 30 days", "This quarter", "All time"];

const toneStyles = {
  indigo: "bg-indigo-50 text-indigo-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-600",
};

const isWithinRange = (date, range) => {
  if (!date || range === "All time") return true;

  const today = new Date();
  const target = new Date(date);

  switch (range) {
    case "Last 7 days": {
      const last7 = new Date(today);
      last7.setDate(today.getDate() - 7);
      return target >= last7;
    }

    case "Last 30 days": {
      const last30 = new Date(today);
      last30.setDate(today.getDate() - 30);
      return target >= last30;
    }

    case "This quarter": {
      const quarterStart = new Date(
        today.getFullYear(),
        Math.floor(today.getMonth() / 3) * 3,
        1,
      );
      return target >= quarterStart;
    }

    case "All time":
    default:
      return true;
  }
};

export default function ProjectReportPage({ currentPage, projectsPerPage }) {
  const reportRef = useRef();
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const [range, setRange] = useState(dateRanges[1]);
  const [rangeOpen, setRangeOpen] = useState(false);
  const projects = useProjectStore((state) => state.projects);
  const tasks = useTaskStore((state) => state.tasks);

  useEffect(() => {
    fetchProjects();
    fetchTasks();
    fetchUsers();
  }, [fetchProjects, fetchTasks, fetchUsers]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      isWithinRange(project.createdAt, range),
    );
  }, [projects, range]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => isWithinRange(task.createdAt, range));
  }, [tasks, range]);

  const projectProgress = filteredProjects.map((project) => ({
    name: project.title,
    status: project.status,
    deadline: project.deadline,
    manager: project.manager?.name,
  }));

  const projectBreakdown = [
    {
      label: "Completed",
      value: filteredProjects.filter(
        (project) => project.status === "completed",
      ).length,
      tone: "bg-emerald-500",
    },

    {
      label: "In progress",
      value: filteredProjects.filter((project) => project.status === "active")
        .length,
      tone: "bg-amber-400",
    },

    {
      label: "Planning",
      value: filteredProjects.filter((project) => project.status === "planning")
        .length,
      tone: "bg-rose-500",
    },
  ];

  const projectTotal = projectBreakdown.reduce((sum, p) => sum + p.value, 0);

  const projectStats = useMemo(
    () => ({
      totalProjects: filteredProjects.length,
      completedProjects: filteredProjects.filter(
        (p) => p.status === "completed",
      ).length,
      activeProjects: filteredProjects.filter((p) => p.status === "active")
        .length,
      planningProject: filteredProjects.filter((p) => p.status === "planning")
        .length,
    }),
    [filteredProjects],
  );

  const projectMembers = [
    ...new Map(
      filteredProjects
        .flatMap((project) => project.teamMembers || [])
        .map((member) => [member._id, member]),
    ).values(),
  ];

  const teamPerformance = projectMembers.map((member) => {
    const assigned = filteredTasks.filter(
      (task) => task.assignedTo?._id === member._id,
    ).length;

    const completed = filteredTasks.filter(
      (task) =>
        task.assignedTo?._id === member._id && task.status === "Completed",
    ).length;

    return {
      _id: member._id,
      name: member.name,
      assigned,
      completed,
    };
  });

  const summary = [
    {
      label: "Total Projects",
      value: projectStats.totalProjects,
      icon: FiFolder,
      tone: "indigo",
    },
    {
      label: "Completed",
      value: projectStats.completedProjects,
      icon: FiCheckCircle,
      tone: "emerald",
    },
    {
      label: "Active",
      value: projectStats.activeProjects,
      icon: FiClock,
      tone: "amber",
    },
    {
      label: "Planning",
      value: projectStats.planningProject,
      icon: FaTasks,
      tone: "rose",
    },
  ];

  const overdueProjects = filteredProjects
    .filter((project) => {
      return (
        project.status !== "completed" &&
        project.deadline &&
        new Date(project.deadline) < new Date()
      );
    })
    .map((project) => {
      const daysOverdue = Math.floor(
        (new Date() - new Date(project.deadline)) / (1000 * 60 * 60 * 24),
      );

      return {
        ...project,
        daysOverdue,
      };
    });

  const upcomingDeadlines = [...filteredTasks]
    .filter((task) => {
      if (!task.deadline || task.status === "Completed") return false;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const due = new Date(task.deadline);
      due.setHours(0, 0, 0, 0);

      const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

      return diffDays >= 0 && diffDays <= 7;
    })
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5);
  console.log(upcomingDeadlines);

  const exportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;

    // ---- Theme ----
    const COLORS = {
      primary: [45, 106, 79], // blue-600
      primaryDark: [29, 78, 216], // blue-700
      slate: [51, 65, 85], // slate-700
      slateLight: [100, 116, 139], // slate-500
      bgLight: [241, 245, 249], // slate-100
      border: [226, 232, 240], // slate-200
      white: [255, 255, 255],
      success: [22, 163, 74],
      warning: [217, 119, 6],
      danger: [220, 38, 38],
    };

    const today = new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const checkPageBreak = (y, needed = 40) => {
      if (y + needed > pageHeight - 20) {
        doc.addPage();
        return 25;
      }
      return y;
    };

    const sectionTitle = (text, y) => {
      y = checkPageBreak(y, 26);
      doc.setFillColor(...COLORS.primary);
      doc.rect(margin, y - 3.5, 2.5, 5, "F"); // accent bar
      doc.setFont(undefined, "bold");
      doc.setFontSize(10);
      doc.setTextColor(...COLORS.slate);
      doc.text(text, margin + 6, y);
      doc.setFont(undefined, "normal");
      return y;
    };

    const tableTheme = {
      theme: "grid",
      styles: {
        fontSize: 8,
        cellPadding: 3,
        textColor: COLORS.slate,
        lineColor: COLORS.slateLight,
        lineWidth: 0.1,
        fillColor: COLORS.border,
      },
      headStyles: {
        fillColor: COLORS.primary,
        textColor: COLORS.white,
        fontStyle: "bold",
        fontSize: 8,
      },

      margin: { left: margin, right: margin },
    };

    // ================= HEADER BAND =================
    doc.setFillColor(...COLORS.primary);
    doc.rect(0, 0, pageWidth, 26, "F");

    doc.setTextColor(...COLORS.white);
    doc.setFontSize(17);
    doc.setFont(undefined, "bold");
    doc.text("Project Report", margin, 15);

    doc.setFontSize(8);
    doc.setFont(undefined, "normal");
    doc.text(`Generated on ${today}`, margin, 21);
    // ================= PROJECT MANAGER =================

    const managerNames = filteredProjects
      .map((p) => p.manager?.name || p.projectManager?.name)
      .filter(Boolean);

    doc.setFontSize(9);
    doc.setTextColor(...COLORS.slate);

    doc.text(
      `Project Manager: ${
        managerNames.length > 0
          ? [...new Set(managerNames)].join(", ")
          : "Not Assigned"
      }`,
      margin,
      35,
    );

    let y = 43;

    // ================= KPI SUMMARY CARDS =================
    const kpis = [
      {
        label: "Total Projects",
        value: projectStats.totalProjects,
        color: COLORS.primary,
      },
      {
        label: "Completed",
        value: projectStats.completedProjects,
        color: COLORS.success,
      },
      {
        label: "Active",
        value: projectStats.activeProjects,
        color: COLORS.warning,
      },
      {
        label: "Planning",
        value: projectStats.planningProject,
        color: COLORS.slateLight,
      },
    ];

    const cardGap = 4;
    const cardWidth =
      (pageWidth - margin * 2 - cardGap * (kpis.length - 1)) / kpis.length;
    const cardHeight = 20;

    kpis.forEach((kpi, i) => {
      const x = margin + i * (cardWidth + cardGap);

      doc.setFillColor(...COLORS.bgLight);
      doc.roundedRect(x, y, cardWidth, cardHeight, 2, 2, "F");

      doc.setFillColor(...kpi.color);
      doc.roundedRect(x, y, 2, cardHeight, 1, 1, "F"); // left accent strip

      doc.setTextColor(...COLORS.slate);
      doc.setFont(undefined, "bold");
      doc.setFontSize(12);
      doc.text(String(kpi.value), x + 7, y + 10);

      doc.setFont(undefined, "normal");
      doc.setFontSize(7);
      doc.setTextColor(...COLORS.slateLight);
      doc.text(kpi.label, x + 7, y + 16);
    });

    y += cardHeight + 10;

    // ================= STATUS BREAKDOWN =================
    y = sectionTitle("Project Status Breakdown", y);
    autoTable(doc, {
      ...tableTheme,
      startY: y + 4,
      head: [["Status", "Count"]],
      body: projectBreakdown.map((item) => [item.label, item.value]),
    });
    y = doc.lastAutoTable.finalY + 11;

    // ================= PROJECT PROGRESS =================
    y = sectionTitle("Projects", y);
    autoTable(doc, {
      ...tableTheme,
      startY: y + 4,
      head: [["Project", "Status", "Deadline"]],
      body: projectProgress.map((p) => [
        p.name,
        p.status,
        new Date(p.deadline).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      ]),
      columnStyles: { 1: { cellWidth: 28 } },
    });
    y = doc.lastAutoTable.finalY + 11;

    // ================= OVERDUE TASKS =================
    y = sectionTitle("Overdue Projects", y);
    autoTable(doc, {
      ...tableTheme,
      startY: y + 4,
      head: [["Project", "Days Overdue"]],
      body: overdueProjects.map((t) => [t.title, `${t.daysOverdue} days`]),
      didParseCell: (data) => {
        // highlight the "Days Overdue" column in red for emphasis
        if (data.section === "body" && data.column.index === 1) {
          data.cell.styles.textColor = COLORS.danger;
          data.cell.styles.fontStyle = "bold";
        }
      },
    });
    y = doc.lastAutoTable.finalY + 11;

    // ================= TEAM PERFORMANCE =================
    y = sectionTitle("Team Performance", y);
    autoTable(doc, {
      ...tableTheme,
      startY: y + 4,
      head: [["Member", "Completed", "Assigned"]],
      body: teamPerformance.map((m) => [m.name, m.completed, m.assigned]),
    });

    // ================= FOOTER (page number on every page) =================
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setTextColor(...COLORS.slateLight);
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth - margin,
        pageHeight - 10,
        { align: "right" },
      );
      doc.text("Project Report", margin, pageHeight - 10);
    }

    doc.save("Project-Report.pdf");
  };
  return (
    <div
      ref={reportRef}
      className="bg-slate-50 text-slate-900 mx-auto max-w-7xl px-4 py-2 sm:px-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Project Report
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Performance summary across all active projects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setRangeOpen((o) => !o)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <FiCalendar className="h-4 w-4 text-slate-400" />
              {range}
              <FiChevronDown className="h-4 w-4 text-slate-400" />
            </button>
            {rangeOpen && (
              <div className="absolute right-0 z-10 mt-2 w-44 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                {dateRanges.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRange(r);
                      setRangeOpen(false);
                    }}
                    className={`block w-full px-3.5 py-2 text-left text-sm hover:bg-slate-50 ${
                      r === range
                        ? "font-medium text-indigo-600"
                        : "text-slate-600"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={exportPDF}
            className="flex items-center gap-2 rounded-lg bg-[#2d6a4f] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#568f75]"
          >
            <FiDownload className="h-4 w-4" />
            Export PDF
          </button>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${toneStyles[s.tone]}`}
            >
              <s.icon className="h-4.5 w-4.5" />
            </span>
            <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">
              {s.value}
            </p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Task breakdown */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-1">
          <h2 className="text-sm font-semibold">Project status breakdown</h2>

          <div className="mt-5 flex justify-center">
            <DonutChart segments={projectBreakdown} total={projectTotal} />
          </div>

          <ul className="mt-5 space-y-2">
            {projectBreakdown.map((p) => (
              <li
                key={p.label}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-2 text-slate-600">
                  <span className={`h-2.5 w-2.5 rounded-full ${p.tone}`} />
                  {p.label}
                </span>
                <span className="font-medium tabular-nums text-slate-900">
                  {p.value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="text-sm font-semibold">Project progress</h2>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <FiTrendingUp className="h-3.5 w-3.5" />
              {range}
            </span>
          </div>
          <div
            className={`divide-y divide-slate-100 ${
              projectProgress.length > 5 ? "max-h-96 overflow-y-auto" : ""
            }`}
          >
            {projectProgress.map((p) => (
              <div key={p.name} className="px-5 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {p.name}
                  </p>

                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${p.status}`}
                  >
                    {p.status}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-3">
                  <div className="h-1.5 w-full rounded-full bg-slate-100">
                    <div
                      className="h-1.5 rounded-full bg-indigo-500"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Due{": "}
                  {new Date(p.deadline).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="text-sm font-semibold">Team performance</h2>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <FiUsers className="h-3.5 w-3.5" />
              {teamPerformance.length} members
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {teamPerformance.map((m) => {
              const rate = Math.round((m.completed / m.assigned) * 100);
              return (
                <div key={m.name} className="flex items-center gap-4 px-5 py-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                    {m.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      {m.name}
                    </p>
                  </div>
                  <div className="hidden w-32 sm:block">
                    <div className="h-1.5 w-full rounded-full bg-slate-100">
                      <div
                        className="h-1.5 rounded-full bg-emerald-500"
                        style={{ width: `${rate}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-16 shrink-0 text-right text-xs text-slate-500 tabular-nums">
                    {m.completed}/{m.assigned}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold">Upcoming Deadlines</h2>

          <div className="mt-4 divide-y divide-slate-100">
            {upcomingDeadlines.length > 0 ? (
              upcomingDeadlines.map((task) => {
                const daysLeft = Math.ceil(
                  (new Date(task.deadline) - new Date()) /
                    (1000 * 60 * 60 * 24),
                );

                return (
                  <div
                    key={task._id}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {task.title}
                      </p>

                      <p className="text-xs text-slate-400">
                        {task.projectId?.title || "No Project"}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        daysLeft <= 1
                          ? "bg-red-100 text-red-600"
                          : daysLeft <= 3
                            ? "bg-amber-100 text-amber-600"
                            : "bg-indigo-100 text-indigo-600"
                      }`}
                    >
                      {daysLeft === 0
                        ? "Today"
                        : daysLeft === 1
                          ? "Tomorrow"
                          : `${daysLeft} days`}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-sm text-slate-400">
                No upcoming deadlines 🎉
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 rounded-xl border border-rose-100 bg-white  w-183.75">
          <div className="flex items-center justify-between border-b border-rose-50 px-5 py-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <FiFlag className="h-4 w-4 text-rose-500" />
              Overdue Projects
            </h2>
            <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600">
              {overdueProjects.length} need attention
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {overdueProjects.map((t, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900">
                    {t.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {new Date(t.deadline).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">
                  <FiAlertTriangle className="h-3 w-3" />
                  {t.daysOverdue}d overdue
                </span>
              </div>
            ))}
            {overdueProjects.length === 0 && (
              <div className="flex items-center gap-2 px-5 py-8 text-sm text-slate-400">
                <FiCheckCircle className="h-4 w-4 text-emerald-500" />
                Nothing overdue — great work.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DonutChart({ segments = [], total = 0 }) {
  const radius = 52;
  const stroke = 16;
  const circumference = 2 * Math.PI * radius;

  const colorMap = {
    "bg-emerald-500": "#10b981",
    "bg-amber-400": "#fbbf24",
    "bg-rose-500": "#f43f5e",
  };

  if (!total || total === 0) {
    return (
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={stroke}
        />

        <text
          x="70"
          y="66"
          textAnchor="middle"
          className="fill-slate-900"
          style={{ fontSize: "22px" }}
        >
          0
        </text>

        <text
          x="70"
          y="86"
          textAnchor="middle"
          className="fill-slate-400"
          style={{ fontSize: "11px" }}
        >
          projects
        </text>
      </svg>
    );
  }

  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <g transform="rotate(-90 70 70)">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={stroke}
        />

        {segments.map((seg, index) => {
          const value = Number(seg.value) || 0;

          const fraction = value / total;

          const dash = fraction * circumference;

          const gap = circumference - dash;

          const offset = segments
            .slice(0, index)
            .reduce(
              (sum, item) =>
                sum + ((Number(item.value) || 0) / total) * circumference,
              0,
            );

          return (
            <circle
              key={seg.label}
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={colorMap[seg.tone] || "#6366f1"}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
        })}
      </g>

      <text
        x="70"
        y="66"
        textAnchor="middle"
        className="fill-slate-900"
        style={{ fontSize: "22px" }}
      >
        {total}
      </text>

      <text
        x="70"
        y="86"
        textAnchor="middle"
        className="fill-slate-400"
        style={{ fontSize: "11px" }}
      >
        projects
      </text>
    </svg>
  );
}

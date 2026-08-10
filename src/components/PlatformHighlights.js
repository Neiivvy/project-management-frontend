"use client";

import { motion } from "framer-motion";
import {
  FileText,
  BarChart3,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const highlights = [
  {
    id: "logs",
    icon: FileText,
    title: "Activity Logs",
    subtitle: "Complete audit trail",
    description:
      "Every action is recorded with timestamp, user, and context. Track who changed what, when, and why essential for compliance and accountability.",
    features: ["User action tracking", "Timestamped entries", "Filterable history"],
    visual: "logs",
  },
  {
    id: "reports",
    icon: BarChart3,
    title: "Reports & Analytics",
    subtitle: "Data-driven decisions",
    description:
      "Generate comprehensive reports on project health, team performance, and delivery metrics. Export to PDF or share directly with stakeholders.",
    features: ["Custom dashboards", "PDF export", "Team performance"],
    visual: "reports",
  },
  {
    id: "roles",
    icon: Shield,
    title: "Role-Based Access",
    subtitle: "Secure by design",
    description:
      "Define granular permissions for admins, project managers, and team members. Ensure the right people have access to the right information.",
    features: ["Granular permissions", "Role templates", "Access control"],
    visual: "roles",
  },
];

function LogsVisual() {
  const logs = [
    { action: "Task #142 created", user: "Project Manager.", time: "2m ago", type: "create" },
    { action: "Status changed to In Progress", user: "Nitika", time: "5m ago", type: "update" },
    { action: "Comment added on Project Co-Work", user: "Sagar", time: "8m ago", type: "comment" },
    { action: "File uploaded to Docs", user: "Shovit", time: "12m ago", type: "upload" },
  ];

  const typeColors = {
    create: "bg-[#498f70]",
    update: "bg-[#2d6a4f]",
    comment: "bg-[#3a7d5d]",
    upload: "bg-[#498f70]/70",
  };

  return (
    <div className="space-y-3">
      {logs.map((log) => (
        <div
          key={log.action}
          className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#D8E5DD]"
        >
          <div className={`h-2 w-2 rounded-full ${typeColors[log.type]}`} />
          <div className="flex-1 min-w-0">
            <div className="text-sm text-[#374151] truncate">{log.action}</div>
            <div className="text-xs text-[#6B7280]">{log.user} · {log.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReportsVisual() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-[#111827]">87%</div>
          <div className="text-xs text-[#6B7280]">On-time delivery</div>
        </div>
        <div className="h-10 w-10 rounded-lg bg-[#498f70]/10 flex items-center justify-center">
          <CheckCircle className="h-5 w-5 text-[#498f70]" />
        </div>
      </div>
      <div className="h-2 w-full rounded-full bg-[#EEF5F1] overflow-hidden">
        <div className="h-full w-[87%] rounded-full bg-linear-to-r from-[#498f70] to-[#3a7d5d]" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Active", value: "24", icon: Clock },
          { label: "Completed", value: "156", icon: CheckCircle },
          { label: "Overdue", value: "3", icon: AlertTriangle },
        ].map((stat) => (
          <div key={stat.label} className="p-3 rounded-lg bg-[#F7FAF8] border border-[#D8E5DD]/60">
            <stat.icon className="h-4 w-4 text-[#498f70] mb-1.5" />
            <div className="text-lg font-semibold text-[#111827]">{stat.value}</div>
            <div className="text-[10px] text-[#6B7280] uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RolesVisual() {
  const roles = [
    { name: "Admin", color: "bg-[#498f70]", access: "Full access" },
    { name: "Project Manager", color: "bg-[#2d6a4f]", access: "Manage projects" },
    { name: "Member", color: "bg-[#3a7d5d]", access: "Assigned tasks" },
  ];

  return (
    <div className="space-y-3">
      {roles.map((role) => (
        <div
          key={role.name}
          className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#D8E5DD]"
        >
          <div className={`h-8 w-8 rounded-lg ${role.color} flex items-center justify-center`}>
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-[#374151]">{role.name}</div>
            <div className="text-xs text-[#6B7280]">{role.access}</div>
          </div>
          <div className="h-2 w-2 rounded-full bg-[#498f70]" />
        </div>
      ))}
    </div>
  );
}

const visualComponents = {
  logs: LogsVisual,
  reports: ReportsVisual,
  roles: RolesVisual,
};

export default function PlatformHighlights() {
  return (
    <section className="py-24 bg-[#F7FAF8] px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <span className="text-sm font-bold tracking-widest uppercase text-[#498f70]">
            Platform Highlights
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-[#111827] tracking-tight">
            Built for real work
          </h2>
        </div>

        <div className="space-y-24">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            const VisualComponent = visualComponents[highlight.visual];
            const isReversed = index % 2 === 1;

            return (
              <div
                key={highlight.id}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  isReversed ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Text content */}
                <div className={isReversed ? "lg:col-start-2" : ""}>
                  <div className="inline-flex items-center gap-2 rounded-lg bg-[#498f70]/5 px-3 py-1.5 mb-4">
                    <Icon className="h-4 w-4 text-[#498f70]" />
                    <span className="text-xs font-semibold text-[#498f70] uppercase tracking-wider">
                      {highlight.subtitle}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-[#111827] tracking-tight mb-4">
                    {highlight.title}
                  </h3>
                  <p className="text-[#374151] leading-relaxed mb-6">
                    {highlight.description}
                  </p>
                  <ul className="space-y-2.5">
                    {highlight.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5">
                        <div className="h-5 w-5 rounded-full bg-[#498f70]/10 flex items-center justify-center shrink-0">
                          <svg
                            className="h-3 w-3 text-[#498f70]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-[#374151]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className={isReversed ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <div className="rounded-2xl bg-white border border-[#D8E5DD] p-6 shadow-lg shadow-[#498f70]/5">
                    <VisualComponent />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

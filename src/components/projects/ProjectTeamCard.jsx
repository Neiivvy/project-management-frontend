"use client";

import { Users, Mail } from "lucide-react";
import Avatar from "@/components/shared/Avatar";

function AvailabilityBadge({ availability }) {
  const available = availability === "available";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
        available
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-amber-50 text-amber-700 border border-amber-200"
      }`}
    >
      {available ? "Available" : "Busy"}
    </span>
  );
}

function RoleBadge({ role }) {
  const roleMap = {
    admin: "Admin",
    project_manager: "Project Manager",
    member: "Member",
  };

  return (
    <span className="rounded-full bg-[#0f5238]/10 px-2.5 py-1 text-[11px] font-medium text-[#0f5238] border border-[#0f5238]/20">
      {roleMap[role] || role}
    </span>
  );
}

export default function ProjectTeamCard({ team = [] }) {
  return (
    <section
      className="
        rounded-2xl
        border border-slate-100
        bg-white
        p-5
        shadow-sm
        sm:p-6
        transition-all duration-300
        hover:shadow-md
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f5238]/10 text-[#0f5238]">
            <Users size={16} />
          </div>

          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Team Members
          </h2>
        </div>

        <span className="rounded-full bg-[#0f5238]/10 px-3 py-1 text-xs font-semibold text-[#0f5238] border border-[#0f5238]/20">
          {team.length}
        </span>
      </div>

      {/* Empty */}

      {team.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-8 text-center transition-colors hover:border-slate-300">
          <p className="text-sm text-slate-500">
            No members have been assigned yet.
          </p>
        </div>
      )}

      {/* Members */}

      {team.length > 0 && (
        <div
          className="
            mt-5
            flex
            max-h-90
            flex-col
            gap-3
            overflow-y-auto
            pr-1
          "
        >
          {team.map((member) => (
            <div
              key={member.id}
              className="
                rounded-xl
                border border-slate-100
                p-4
                transition-all
                hover:border-slate-200
                hover:bg-slate-50/50
                hover:shadow-sm
              "
            >
              <div className="flex items-start gap-3">
                <Avatar
                  name={member.name}
                  src={member.avatar}
                  size={46}
                />

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-[#181d19]">
                    {member.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                      <Mail size={11} />
                    </div>

                    <span className="truncate">
                      {member.email || "No email"}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <RoleBadge role={member.role} />

                    <AvailabilityBadge
                      availability={member.availability}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

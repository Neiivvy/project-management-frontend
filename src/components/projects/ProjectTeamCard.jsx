"use client";

import { Users, Mail } from "lucide-react";
import Avatar from "@/components/shared/Avatar";

function AvailabilityBadge({ availability }) {
  const available = availability === "available";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
        available
          ? "bg-green-100 text-green-700"
          : "bg-orange-100 text-orange-700"
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
    <span className="rounded-full bg-[#eef7f2] px-2.5 py-1 text-[11px] font-medium text-[#0f5238]">
      {roleMap[role] || role}
    </span>
  );
}

export default function ProjectTeamCard({ team = [] }) {
  return (
    <section
      className="
        rounded-2xl
        border border-[#dbe6e1]
        bg-white
        p-5
        shadow-sm
        sm:p-6
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-[#40916c]" />

          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#66756e]">
            Team Members
          </h2>
        </div>

        <span className="rounded-full bg-[#eef7f2] px-3 py-1 text-xs font-semibold text-[#0f5238]">
          {team.length}
        </span>
      </div>

      {/* Empty */}

      {team.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-[#d7e3dd] bg-[#fafcfb] py-8 text-center">
          <p className="text-sm text-[#66756e]">
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
                border border-[#edf2ef]
                p-4
                transition-all
                hover:border-[#c8ddd3]
                hover:bg-[#fbfdfc]
              "
            >
              <div className="flex items-start gap-3">
                <Avatar
                  name={member.name}
                  src={member.avatar}
                  size={46}
                />

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-[#23312d]">
                    {member.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-xs text-[#66756e]">
                    <Mail size={13} />

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
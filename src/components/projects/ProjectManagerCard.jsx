"use client";

import { Briefcase, Mail, ShieldCheck } from "lucide-react";
import Avatar from "@/components/shared/Avatar";

export default function ProjectManagerCard({ manager }) {
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

      <div className="flex items-center gap-2">
        <Briefcase
          size={18}
          className="text-[#40916c]"
        />

        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#66756e]">
          Project Manager
        </h2>
      </div>

      {/* Manager */}

      <div className="mt-5 flex items-start gap-4">
        <Avatar
          name={manager?.name}
          src={manager?.avatar}
          size={58}
        />

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-[#23312d]">
            {manager?.name || "Unknown"}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-[#66756e]">
            <Mail size={15} />

            <span className="truncate">
              {manager?.email || "No email available"}
            </span>
          </div>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#eef7f2] px-3 py-1.5 text-xs font-semibold text-[#0f5238]">
            <ShieldCheck size={14} />
            Project Manager
          </div>
        </div>
      </div>
    </section>
  );
}
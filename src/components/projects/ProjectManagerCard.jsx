"use client";

import { Briefcase, Mail, ShieldCheck } from "lucide-react";
import Avatar from "@/components/shared/Avatar";

export default function ProjectManagerCard({ manager }) {
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

      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f5238]/10 text-[#0f5238]">
          <Briefcase
            size={16}
          />
        </div>

        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
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
          <h3 className="truncate text-base font-semibold text-[#181d19]">
            {manager?.name || "Unknown"}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
              <Mail size={13} />
            </div>

            <span className="truncate">
              {manager?.email || "No email available"}
            </span>
          </div>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0f5238]/10 px-3 py-1.5 text-xs font-semibold text-[#0f5238]">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#0f5238] text-white">
              <ShieldCheck size={12} />
            </div>
            Project Manager
          </div>
        </div>
      </div>
    </section>
  );
}

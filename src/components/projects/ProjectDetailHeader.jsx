"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectDetailHeader({ project }) {
  return (
    <section className="flex flex-col gap-3">
      <Link
        href="/admin/projects"
        className="
          inline-flex w-fit items-center gap-2
          text-sm font-medium text-slate-500
          transition-colors hover:text-[#0f5238]
        "
      >
        <ArrowLeft size={17} />
        Back to Projects
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f5238] to-[#2d6a4f] text-white text-lg font-bold shadow-lg shadow-[#0f5238]/20">
          {project.name?.charAt(0)?.toUpperCase() || "P"}
        </div>
        <div>
          <h1 className="wrap-break-word text-2xl font-bold text-[#181d19] sm:text-3xl">
            {project.name}
          </h1>
        </div>
      </div>
    </section>
  );
}

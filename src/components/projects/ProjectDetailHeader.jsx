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
          text-sm font-medium text-[#66756e]
          transition-colors hover:text-[#0f5238]
        "
      >
        <ArrowLeft size={17} />
        Back to Projects
      </Link>

      <div>
        <h1 className="wrap-break-word text-3xl font-semibold text-[#23312d] sm:text-4xl">
          {project.name}
        </h1>
      </div>
    </section>
  );
}
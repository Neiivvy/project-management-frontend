"use client";

import { FileText } from "lucide-react";

export default function ProjectOverviewCard({ description }) {
  const hasDescription =
    description && description.trim().length > 0;

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
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#800000]/10 text-[#800000]">
          <FileText
            size={16}
          />
        </div>

        <h2
          className="
            text-sm
            font-semibold
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          Project Overview
        </h2>
      </div>

      <div className="mt-5">

        {hasDescription ? (
          <p
            className="
              whitespace-pre-wrap
              wrap-break-word
              text-[15px]
              leading-7
              text-[#2f3a36]
            "
          >
            {description}
          </p>
        ) : (
          <div
            className="
              rounded-xl
              border
              border-dashed
              border-slate-200
              bg-slate-50/50
              px-4
              py-6
              text-center
              transition-colors
              hover:border-slate-300
            "
          >
            <p className="text-sm text-slate-500">
              No project description has been added yet.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

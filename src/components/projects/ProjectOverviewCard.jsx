"use client";

import { FileText } from "lucide-react";

export default function ProjectOverviewCard({ description }) {
  const hasDescription =
    description && description.trim().length > 0;

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
      <div className="flex items-center gap-2">
        <FileText
          size={18}
          className="text-[#40916c]"
        />

        <h2
          className="
            text-sm
            font-semibold
            uppercase
            tracking-wide
            text-[#66756e]
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
              border-[#d7e3dd]
              bg-[#f9fbfa]
              px-4
              py-6
              text-center
            "
          >
            <p className="text-sm text-[#66756e]">
              No project description has been added yet.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendLabel,
  accent = "green",
}) {
  const isUp = typeof trend === "number" && trend >= 0;

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border border-[#dbe6e1]
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-[#8fbda7]
        hover:shadow-md
      "
    >
      {/* subtle ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-8
          -top-8
          h-28
          w-28
          rounded-full
          bg-[#8fbda7]/20
          blur-3xl
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      <div className="relative flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wider text-[#66756e]">
            {label}
          </span>

          <span className="font-mono text-2xl font-semibold text-[#2f3a36] sm:text-3xl">
            {value}
          </span>
        </div>

        {Icon && (
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#0f5238]
              ring-1
              ring-[#40916c]/20
            "
          >
            <Icon
              size={18}
              className="text-white"
              strokeWidth={1.75}
            />
          </div>
        )}
      </div>

      {typeof trend === "number" && (
        <div className="relative mt-3 flex items-center gap-1 text-xs">
          <span
            className={`flex items-center gap-0.5 font-medium ${
              isUp
                ? "text-[#2d8a5a]"
                : "text-[#d95d39]"
            }`}
          >
            {isUp ? (
              <ArrowUpRight size={13} />
            ) : (
              <ArrowDownRight size={13} />
            )}

            {Math.abs(trend)}%
          </span>

          <span className="text-[#66756e]">
            {trendLabel || "vs last month"}
          </span>
        </div>
      )}
    </div>
  );
}
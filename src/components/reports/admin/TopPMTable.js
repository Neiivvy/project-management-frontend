"use client";

import { useEffect, useRef } from "react";
import { FiAward } from "react-icons/fi";

export default function TopPMTable({ topProjectManagers }) {
  if (!topProjectManagers || topProjectManagers.length === 0) {
    return (
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 mb-2">
            <FiAward className="text-xl" />
          </div>
          <p className="text-sm text-slate-500">
            No project manager data available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f5238]/10 text-[#0f5238]">
          <FiAward className="text-lg" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#181d19]">
            Top Project Managers
          </h2>
          <p className="text-xs text-slate-500">
            Ranked by number of projects managed
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="pb-3 pt-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="pb-3 pt-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Project Manager
              </th>
              <th className="pb-3 pt-1 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                Projects
              </th>
            </tr>
          </thead>

          <tbody>
            {topProjectManagers.map((pm, index) => (
              <PMRow
                key={index}
                pm={pm}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PMRow({ pm, index }) {
  const rowRef = useRef(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateX(-10px)";

    const timeout = setTimeout(() => {
      el.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";
      el.style.opacity = "1";
      el.style.transform = "translateX(0)";
    }, index * 80);

    return () => clearTimeout(timeout);
  }, [index]);

  const getRankStyle = (rank) => {
    if (rank === 0) return { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-600", icon: "1" };
    if (rank === 1) return { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-500", icon: "2" };
    if (rank === 2) return { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-600", icon: "3" };
    return { bg: "bg-slate-50", border: "border-slate-100", text: "text-slate-400", icon: String(rank + 1) };
  };

  const rankStyle = getRankStyle(index);

  return (
    <tr
      ref={rowRef}
      className="group border-b border-slate-50 last:border-none hover:bg-slate-50/50 transition-colors duration-200"
    >
      <td className="py-3.5 pr-4">
        <span
          className={`
            inline-flex items-center justify-center
            w-8 h-8 rounded-lg text-sm font-bold
            border ${rankStyle.bg} ${rankStyle.border} ${rankStyle.text}
          `}
        >
          {rankStyle.icon}
        </span>
      </td>

      <td className="py-3.5">
        <span className="font-medium text-[#181d19] group-hover:text-[#0f5238] transition-colors">
          {pm.pmName}
        </span>
      </td>

      <td className="py-3.5 text-right">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0f5238]/10 text-[#0f5238] text-sm font-semibold">
          {pm.projectCount}
          <span className="text-xs text-[#0f5238]/60">
            {pm.projectCount === 1 ? "project" : "projects"}
          </span>
        </span>
      </td>
    </tr>
  );
}

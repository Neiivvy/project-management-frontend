"use client";

import { FiBarChart2 } from "react-icons/fi";

export default function EmptyReport() {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center shadow-sm">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-[#3b82f6]/10 rounded-full blur-xl" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#3b82f6]/10 text-[#3b82f6]">
            <FiBarChart2 className="text-3xl" />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-[#181d19] mb-2">
          No Report Selected
        </h3>

        <p className="text-sm text-slate-500 max-w-sm">
          Select a user or project from the options above to view detailed report information and analytics.
        </p>

        <div className="flex items-center gap-2 mt-4 text-xs text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span>Choose from the dropdowns to get started</span>
        </div>
      </div>
    </div>
  );
}

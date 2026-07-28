"use client";

import { FiLoader } from "react-icons/fi";

export default function LoadingReport() {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-10 flex justify-center items-center shadow-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner with gradient */}
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-slate-100" />
          <div
            className="
              absolute inset-0
              h-12 w-12
              rounded-full
              border-4
              border-transparent
              border-t-[#0f5238]
              border-r-[#3b82f6]
              animate-spin
            "
          />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-[#181d19]">
            Loading report...
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Please wait while we fetch the data
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { FiRefreshCw } from "react-icons/fi";

export default function ActivityFilters({
  days,
  setDays,
  refresh,
  loading,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Date Filter */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-[#697268]">Time range:</label>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="rounded-xl border border-[#d9dfda] bg-white px-4 py-2.5 text-sm text-[#181d19] outline-none transition focus:border-[#0f5238] focus:ring-2 focus:ring-[#0f5238]/10"
        >
          <option value={1}>Today</option>
          <option value={7}>Last 7 Days</option>
          <option value={30}>Last 30 Days</option>
        </select>
      </div>

      {/* Refresh Button */}
      <button
        onClick={refresh}
        disabled={loading}
        className="flex items-center gap-2 rounded-xl bg-[#0f5238] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0c4530] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <FiRefreshCw size={16} className={loading ? "animate-spin" : ""} />
        {loading ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
}

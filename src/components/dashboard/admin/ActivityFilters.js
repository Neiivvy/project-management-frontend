"use client";

export default function ActivityFilters({
  days,
  setDays,
  refresh,
  loading,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="rounded-xl border border-[#d9dfda] bg-white px-4 py-2 text-sm text-[#181d19] outline-none transition focus:border-[#0f5238]"
      >
        <option value={1}>Today</option>
        <option value={7}>Last 7 Days</option>
        <option value={30}>Last 30 Days</option>
      </select>

      <button
        onClick={refresh}
        disabled={loading}
        className="rounded-xl bg-[#0f5238] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0c4530] disabled:opacity-60"
      >
        {loading ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
}
export default function ProgressBar({ percentage }) {
  const pct = Math.min(100, Math.max(0, percentage || 0));

  return (
    <div className=" bg-white border border-gray-100 rounded-2xl p-6 ">
      <div className=" flex items-end justify-between mb-3 ">
        <div>
          <h3 className=" font-semibold text-[#10231b] ">Overall Completion</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Across all tasks in this project
          </p>
        </div>

        <span className=" text-2xl font-bold text-[#0f5238] tabular-nums ">
          {pct}%
        </span>
      </div>

      <div className=" w-full bg-gray-100 rounded-full h-3 overflow-hidden ">
        <div
          className="h-3 rounded-full bg-linear-to-r from-[#0f5238] to-[#1a7a56] transition-[width] duration-700 ease-out "
          style={{
            width: `${pct}%`,
          }}
        />
      </div>
    </div>
  );
}

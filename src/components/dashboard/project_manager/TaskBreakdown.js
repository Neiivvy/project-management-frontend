import DonutChart from "./DonutChart";

export default function TaskBreakdown({ segments }) {
  const total = segments.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className="bg-white rounded-2xl border border-[#e3e8e4] shadow-sm animate-fade-in-up p-4 h-auto"
      style={{ animationDelay: "150ms" }}
    >
      <h2 className="font-semibold text-sm">Task Status Breakdown</h2>

      <div className="flex justify-center mt-5">
        <DonutChart segments={segments} total={total} />
      </div>

      <ul className="mt-5 space-y-2">
        {segments.map((item) => (
          <li key={item.label} className="flex justify-between text-sm">
            <span className="flex gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${item.tone}`} />

              {item.label}
            </span>

            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

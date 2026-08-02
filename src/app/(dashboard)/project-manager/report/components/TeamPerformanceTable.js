const AVATAR_PALETTE = [
  { bg: "#e8f2ee", text: "#0f5238" },
  { bg: "#faf1e2", text: "#a8711f" },
  { bg: "#ecedf9", text: "#4c4f9e" },
  { bg: "#fbeaea", text: "#b3413a" },
  { bg: "#e8f4f8", text: "#1f6b85" },
];

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function TeamPerformanceTable({ tasksByMember }) {
  const members = Object.entries(tasksByMember || {});

  return (
    <div className=" bg-white rounded-2xl border border-gray-100 p-6 ">
      <h2 className=" text-lg font-semibold text-[#10231b] mb-4 ">
        Team Performance
      </h2>

      {members.length === 0 ? (
        <div className=" flex flex-col items-center justify-center text-center py-16 ">
          <p className="text-gray-400 text-sm">No team data available yet</p>
        </div>
      ) : (
        <div className=" overflow-x-auto -mx-2 ">
          <table className=" w-full text-sm border-collapse ">
            <thead>
              <tr className=" text-gray-400 text-xs uppercase tracking-wide ">
                <th className="text-left font-medium py-2 px-2">Member</th>
                <th className="text-center font-medium py-2 px-2">Assigned</th>
                <th className="text-center font-medium py-2 px-2">Completed</th>
                <th className="text-left font-medium py-2 px-2 min-w-35">
                  Progress
                </th>
              </tr>
            </thead>

            <tbody>
              {members.map(([name, data], index) => {
                const pct = data.assigned
                  ? Math.round((data.completed / data.assigned) * 100)
                  : 0;
                const color = AVATAR_PALETTE[index % AVATAR_PALETTE.length];

                return (
                  <tr
                    key={name}
                    className=" border-t border-gray-100 hover:bg-gray-50/70 transition-colors "
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div
                          className=" flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold shrink-0 "
                          style={{
                            backgroundColor: color.bg,
                            color: color.text,
                          }}
                        >
                          {initials(name)}
                        </div>
                        <span className="font-medium text-[#10231b]">
                          {name}
                        </span>
                      </div>
                    </td>

                    <td className="text-center py-3 px-2 text-gray-600 tabular-nums">
                      {data.assigned}
                    </td>

                    <td className="text-center py-3 px-2 text-gray-600 tabular-nums">
                      {data.completed}
                    </td>

                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-2 rounded-full bg-[#0f5238] transition-[width] duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-500 w-9 text-right tabular-nums">
                          {pct}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

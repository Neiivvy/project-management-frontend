"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const STATUS_COLORS = {
  Completed: "#0F5238",
  "In Progress": "#D97706",
  Review: "#4F46E5",
  "To Do": "#94A3B8",
};

export default function TaskStatusChart({ report }) {
  const data = [
    {
      name: "Completed",
      value: report.completedTasks,
    },
    {
      name: "In Progress",
      value: report.inProgressTasks,
    },
    {
      name: "Review",
      value: report.reviewTasks,
    },
    {
      name: "To Do",
      value: report.todoTasks,
    },
  ].filter((item) => item.value > 0);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className=" bg-white rounded-2xl border border-gray-100 p-6 ">
      <h2 className=" text-lg font-semibold text-[#10231b] mb-4 ">
        Task Status
      </h2>

      {data.length === 0 ? (
        <div className=" flex flex-col items-center justify-center text-center py-16 ">
          <p className="text-gray-500 text-sm">No task data available yet</p>
        </div>
      ) : (
        <div className=" relative h-75 ">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={92}
                paddingAngle={2}
                cornerRadius={4}
              >
                {data.map((item) => (
                  <Cell
                    key={item.name}
                    fill={STATUS_COLORS[item.name]}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name) => [`${value} tasks`, name]}
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid #eee",
                  fontSize: 13,
                }}
              />

              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-sm text-gray-800">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className=" absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none ">
            <p className="text-2xl font-bold text-[#10231b] tabular-nums">
              {total}
            </p>
            <p className="text-2xs text-gray-700">Tasks</p>
          </div>
        </div>
      )}
    </div>
  );
}

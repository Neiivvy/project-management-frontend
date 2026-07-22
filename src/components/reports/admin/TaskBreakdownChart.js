"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TaskBreakdownChart({ data }) {
  if (!data) return null;

  const chartData = [
    {
      name: "Completed",
      value: data.completedTasks || 0,
    },
    {
      name: "In Progress",
      value: data.inProgressTasks || 0,
    },
    {
      name: "To Do",
      value: data.todoTasks || 0,
    },
    {
      name: "Review",
      value: data.reviewTasks || 0,
    },
  ];

  return (
    <div className="bg-gray-50 border rounded-xl p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Task Breakdown
      </h3>

      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
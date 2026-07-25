"use client";

import { useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CHART_COLORS = ["#0f5238", "#3b82f6", "#8b5cf6", "#f59e0b"];

export default function TaskBreakdownChart({ data }) {
  if (!data) return null;

  const chartData = [
    {
      name: "Completed",
      value: data.completedTasks || 0,
      color: CHART_COLORS[0],
    },
    {
      name: "In Progress",
      value: data.inProgressTasks || 0,
      color: CHART_COLORS[1],
    },
    {
      name: "To Do",
      value: data.todoTasks || 0,
      color: CHART_COLORS[2],
    },
    {
      name: "Review",
      value: data.reviewTasks || 0,
      color: CHART_COLORS[3],
    },
  ];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f5238]/10 text-[#0f5238]">
            <span className="text-sm">📊</span>
          </div>
          <h3 className="text-base font-semibold text-[#181d19]">
            Task Breakdown
          </h3>
        </div>

        {total > 0 && (
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            {total} total
          </span>
        )}
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b", fontWeight: 500 }}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b", fontWeight: 500 }}
            />
            <Tooltip
              cursor={{ fill: "#f8fafc", radius: 8 }}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                fontSize: "13px",
              }}
              formatter={(value) => [`${value} tasks`, ""]}
            />
            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  opacity={0.9}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-100">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-slate-600 font-medium">
              {item.name}
            </span>
            <span className="text-xs text-slate-400">
              ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

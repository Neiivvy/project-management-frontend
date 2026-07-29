import React from "react";

function DonutChart({ segments = [], total = 0 }) {
  const radius = 62;
  const stroke = 18;
  const size = 170;
  const center = size / 2;

  const circumference = 2 * Math.PI * radius;

  if (total === 0) {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={stroke}
        />

        <text
          x={center}
          y="80"
          textAnchor="middle"
          className="fill-slate-900 font-semibold"
          style={{
            fontSize: "26px",
          }}
        >
          0
        </text>

        <text
          x={center}
          y="105"
          textAnchor="middle"
          className="fill-slate-400"
          style={{
            fontSize: "12px",
          }}
        >
          total tasks
        </text>
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90 ${center} ${center})`}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={stroke}
        />

        {segments.map((segment, index) => {
          const value = Number(segment.value) || 0;

          const dash = (value / total) * circumference;

          const offset = segments.slice(0, index).reduce((sum, item) => {
            const itemValue = Number(item.value) || 0;

            return sum + (itemValue / total) * circumference;
          }, 0);

          return (
            <circle
              key={segment.label}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={segment.hex}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${circumference}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
        })}
      </g>

      <text
        x={center}
        y="80"
        textAnchor="middle"
        className="fill-slate-900 font-semibold"
        style={{
          fontSize: "26px",
        }}
      >
        {total}
      </text>

      <text
        x={center}
        y="105"
        textAnchor="middle"
        className="fill-slate-400"
        style={{
          fontSize: "15px",
        }}
      >
        Total Tasks
      </text>
    </svg>
  );
}

export default DonutChart;

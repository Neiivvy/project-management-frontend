"use client";

// Signature element: a growth-ring style radial progress indicator.
// Ties the "growth" idea of the greenish palette to project completion.
export default function ProgressRing({
  progress = 0,
  size = 46,
  strokeWidth = 4,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference -
    (Math.min(progress, 100) / 100) * circumference;

  const color =
    progress >= 100
      ? "#0f5238"
      : progress >= 50
      ? "#2d6a4f"
      : progress >= 20
      ? "#40916c"
      : "#6b7280";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>

      <span className="absolute font-mono text-[10px] font-semibold text-[#181d19]">
        {progress}%
      </span>
    </div>
  );
}

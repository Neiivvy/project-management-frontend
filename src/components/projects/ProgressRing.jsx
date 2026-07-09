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
      ? "#40916c"
      : progress >= 50
      ? "#52b788"
      : progress >= 20
      ? "#95d5b2"
      : "#d9a441";

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
          stroke="#dbe6e1"
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

      <span className="absolute font-mono text-[10px] font-semibold text-[#2f3a36]">
        {progress}%
      </span>
    </div>
  );
}
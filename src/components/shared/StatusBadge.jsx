"use client";

const STATUS_STYLES = {
  planning: {
    label: "Planning",
    dot: "bg-white",
    text: "text-white",
    bg: "bg-[#E0B84C]",
    ring: "ring-[#D4A017]",
    pulse: false,
  },

  active: {
    label: "Active",
    dot: "bg-white",
    text: "text-white",
    bg: "bg-[#3FA67B]",
    ring: "ring-[#3FA67B]",
    pulse: true,
  },

  completed: {
    label: "Completed",
    dot: "bg-white",
    text: "text-white",
    bg: "bg-[#207655]",
    ring: "ring-[#207655]",
    pulse: false,
  },
};

export default function StatusBadge({ status, size = "md" }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.planning;

  const sizeClasses =
    size === "sm"
      ? "text-[10px] px-2 py-0.5"
      : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ring-1 font-medium ${s.bg} ${s.ring} ${s.text} ${sizeClasses}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {s.pulse && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${s.dot} opacity-50`}
          />
        )}

        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${s.dot}`}
        />
      </span>

      {s.label}
    </span>
  );
}
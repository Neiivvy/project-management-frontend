"use client";

// Green palette with solid backgrounds for better visibility on light surfaces.
const PALETTE = [
  { bg: "bg-[#d9efe4]", ring: "ring-[#8bbfa6]", text: "text-[#1f4734]" },
  { bg: "bg-[#d3ebdf]", ring: "ring-[#7fb595]", text: "text-[#244d39]" },
  { bg: "bg-[#e2f3ea]", ring: "ring-[#90c8ae]", text: "text-[#204633]" },
  { bg: "bg-[#d5ede1]", ring: "ring-[#82b99f]", text: "text-[#214a36]" },
];

function hashName(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const SIZES = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-12 w-12 text-sm",
};

export default function Avatar({
  name,
  size = "md",
  status,
  className = "",
}) {
  const palette = PALETTE[hashName(name) % PALETTE.length];
  const sizeClasses = SIZES[size] || SIZES.md;

  return (
    <div className={`relative shrink-0 ${className}`}>
      <div
        title={name}
        className={`flex items-center justify-center rounded-full ring-1 font-semibold tracking-wide
        ${palette.bg}
        ${palette.ring}
        ${palette.text}
        ${sizeClasses}`}
      >
        {getInitials(name)}
      </div>

      {status && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white ${
            status === "active"
              ? "bg-[#16a34a] animate-pulse"
              : status === "pending"
              ? "bg-[#e1a941]"
              : "bg-[#afc3ba]"
          }`}
        />
      )}
    </div>
  );
}
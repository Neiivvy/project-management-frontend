"use client";

// Alternating palette: green, yellow, blue, orange, purple, maroon, teal.
const PALETTE = [
  { bg: "bg-[#1a7a4c]/15", ring: "ring-[#1a7a4c]/40", text: "text-[#1a7a4c]" },
  { bg: "bg-[#c9a000]/15", ring: "ring-[#c9a000]/40", text: "text-[#8a6d00]" },
  { bg: "bg-[#2563eb]/15", ring: "ring-[#2563eb]/40", text: "text-[#1e40af]" },
  { bg: "bg-[#c2410c]/15", ring: "ring-[#c2410c]/40", text: "text-[#9a3412]" },
  { bg: "bg-[#7c3aed]/15", ring: "ring-[#7c3aed]/40", text: "text-[#5b21b6]" },
  { bg: "bg-[#800000]/15", ring: "ring-[#800000]/40", text: "text-[#800000]" },
  { bg: "bg-[#0d7377]/15", ring: "ring-[#0d7377]/40", text: "text-[#0f5255]" },
];

const DARK_PALETTE = [
  { bg: "bg-[#1a7a4c]", ring: "ring-[#145d3a]", text: "text-white" },
  { bg: "bg-[#c9a000]", ring: "ring-[#997a00]", text: "text-white" },
  { bg: "bg-[#2563eb]", ring: "ring-[#1e40af]", text: "text-white" },
  { bg: "bg-[#c2410c]", ring: "ring-[#9a3412]", text: "text-white" },
  { bg: "bg-[#7c3aed]", ring: "ring-[#5b21b6]", text: "text-white" },
  { bg: "bg-[#800000]", ring: "ring-[#600000]", text: "text-white" },
  { bg: "bg-[#0d7377]", ring: "ring-[#0a5558]", text: "text-white" },
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
  variant = "light",
  paletteIndex,
}) {
  const colors = variant === "dark" ? DARK_PALETTE : PALETTE;

  const index =
    paletteIndex !== undefined
      ? paletteIndex % colors.length
      : hashName(name) % colors.length;

  const palette = colors[index];
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
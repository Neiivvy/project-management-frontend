"use client";

import { ShieldCheck, ClipboardList, User } from "lucide-react";

const ROLE_CONFIG = {
  Admin: {
    icon: ShieldCheck,
    text: "text-[#21563b]",
    bg: "bg-[#dcefe5]",
    ring: "ring-[#8fbda7]",
  },

  "Project Manager": {
    icon: ClipboardList,
    text: "text-[#2d4c40]",
    bg: "bg-[#eef7f2]",
    ring: "ring-[#c9ddd2]",
  },

  "Team Member": {
    icon: User,
    text: "text-[#41514b]",
    bg: "bg-[#f4f8f6]",
    ring: "ring-[#d8e5df]",
  },
};

export default function RoleBadge({ role }) {
  const cfg = ROLE_CONFIG[role] || ROLE_CONFIG["Team Member"];
  const Icon = cfg.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1
      text-xs font-medium ring-1 transition-colors
      ${cfg.bg}
      ${cfg.ring}
      ${cfg.text}`}
    >
      <Icon size={12} strokeWidth={2} />
      {role}
    </span>
  );
}
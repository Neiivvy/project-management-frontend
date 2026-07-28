"use client";

import { LayoutGrid, List } from "lucide-react";

export default function ViewToggle({ view, onChange }) {
  return (
    <div
      className="
        flex
        items-center
        gap-0.5
        rounded-xl
        border border-[#dbe6e1]
        bg-white
        p-1
      "
    >
      {[
        { key: "grid", icon: LayoutGrid, label: "Grid view" },
        { key: "list", icon: List, label: "List view" },
      ].map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          aria-label={label}
          className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 ${
            view === key
              ? "bg-[#0f5238] text-white shadow-sm"
              : "text-[#66756e] hover:bg-[#f7fbf9] hover:text-[#0f5238]"
          }`}
        >
          <Icon size={15} />
        </button>
      ))}
    </div>
  );
}
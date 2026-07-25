"use client";

import { Search, X } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 text-slate-500">
        <Search
          size={14}
        />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border border-slate-200
          bg-white
          py-2.5
          pl-10
          pr-9
          text-sm
          text-[#181d19]
          placeholder:text-slate-400
          outline-none
          transition-all
          duration-200
          hover:border-slate-300
          focus:border-[#0f5238]
          focus:ring-2
          focus:ring-[#0f5238]/15
        "
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            flex h-5 w-5 items-center justify-center
            rounded-md
            text-slate-400
            transition-colors
            hover:text-[#181d19]
            hover:bg-slate-100
          "
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

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
      <Search
        size={16}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a9892]"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border border-[#dbe6e1]
          bg-white
          py-2.5
          pl-10
          pr-9
          text-sm
          text-[#2f3a36]
          placeholder:text-[#8a9892]
          outline-none
          transition-all
          duration-200
          hover:border-[#bfd3ca]
          focus:border-[#40916c]
          focus:ring-2
          focus:ring-[#40916c]/15
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
            text-[#8a9892]
            transition-colors
            hover:text-[#2f3a36]
          "
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
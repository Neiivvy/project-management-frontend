"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}) {
  if (totalPages <= 1) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const pageNumbers = () => {
    const nums = [];
    const windowSize = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        Math.abs(i - page) <= windowSize
      ) {
        nums.push(i);
      } else if (nums[nums.length - 1] !== "...") {
        nums.push("...");
      }
    }

    return nums;
  };

  return (
    <div className="flex flex-col-reverse items-center justify-between gap-3 border-t border-[#e6efeb] px-1 pt-4 sm:flex-row">
      <p className="text-xs text-[#66756e]">
        Showing{" "}
        <span className="font-medium text-[#2f3a36]">
          {start}–{end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-[#2f3a36]">
          {totalItems}
        </span>
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          aria-label="Previous page"
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            text-[#66756e]
            transition-colors
            hover:bg-[#f7fbf9]
            hover:text-[#0f5238]
            disabled:cursor-not-allowed
            disabled:opacity-40
            disabled:hover:bg-transparent
            disabled:hover:text-[#66756e]
          "
        >
          <ChevronLeft size={16} />
        </button>

        {pageNumbers().map((n, i) =>
          n === "..." ? (
            <span
              key={`dots-${i}`}
              className="px-1 text-xs text-[#8a9892]"
            >
              …
            </span>
          ) : (
            <button
              key={n}
              onClick={() => onPageChange(n)}
              className={`h-8 min-w-8 rounded-lg px-2 text-xs font-medium transition-all duration-200 ${
                n === page
                  ? "bg-[#0f5238] text-white shadow-sm"
                  : "text-[#66756e] hover:bg-[#f7fbf9] hover:text-[#0f5238]"
              }`}
            >
              {n}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          aria-label="Next page"
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            text-[#66756e]
            transition-colors
            hover:bg-[#f7fbf9]
            hover:text-[#0f5238]
            disabled:cursor-not-allowed
            disabled:opacity-40
            disabled:hover:bg-transparent
            disabled:hover:text-[#66756e]
          "
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
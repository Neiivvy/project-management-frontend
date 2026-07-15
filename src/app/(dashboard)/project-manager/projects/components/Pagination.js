"use client";
import { useEffect } from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages, setCurrentPage]);
  if (totalPages <= 1) return null;

  const indexOfFirst = (currentPage - 1) * itemsPerPage + 1;
  const indexOfLast = Math.min(currentPage * itemsPerPage, totalItems);

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-2 shadow-sm md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-slate-600">
        Showing{" "}
        <span className="font-semibold text-[#0f5238]">
          {indexOfFirst}-{indexOfLast}
        </span>{" "}
        of <span className="font-semibold text-[#0f5238]">{totalItems}</span>{" "}
        projects
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${
            currentPage === 1
              ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
              : "border-slate-300 bg-white hover:border-[#0f5238] hover:bg-[#0f5238] hover:text-white"
          }`}
        >
          <FaChevronLeft />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`h-10 w-10 rounded-lg text-sm font-semibold transition ${
              currentPage === page
                ? "bg-[#0f5238] text-white shadow"
                : "border border-slate-300 bg-white text-slate-700 hover:border-[#0f5238] hover:bg-[#0f5238]/10"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${
            currentPage === totalPages
              ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
              : "border-slate-300 bg-white hover:border-[#0f5238] hover:bg-[#0f5238] hover:text-white"
          }`}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

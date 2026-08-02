"use client";

import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      
      <h1 className="text-6xl font-bold text-red-600">
        403
      </h1>

      <h2 className="text-2xl font-semibold mt-4">
        Forbidden
      </h2>

      <p className="text-gray-600 mt-2">
        You do not have permission to access this page.
      </p>


      <Link
        href="/"
        className="mt-6 px-5 py-2 bg-[#0f5238] text-white rounded-lg hover:bg-[#0b402c]"
      >
        Back to Home
      </Link>

    </div>
  );
}
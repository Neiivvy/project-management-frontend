"use client";

export default function EmptyReport() {
  return (
    <div className="bg-white border rounded-xl p-8 text-center">
      <h3 className="text-lg font-semibold text-gray-800">
        No Report Selected
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        Select a user or project to view detailed report information.
      </p>
    </div>
  );
}
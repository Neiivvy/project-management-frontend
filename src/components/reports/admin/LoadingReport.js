"use client";

export default function LoadingReport() {
  return (
    <div className="bg-white border rounded-xl p-8 flex justify-center items-center">
      <div className="flex flex-col items-center gap-3">
        <div
          className="
            h-8
            w-8
            rounded-full
            border-4
            border-gray-200
            border-t-green-600
            animate-spin
          "
        />

        <p className="text-sm text-gray-500">
          Loading report...
        </p>
      </div>
    </div>
  );
}
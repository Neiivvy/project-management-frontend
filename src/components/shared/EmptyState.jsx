"use client";

export default function EmptyState({
  icon: Icon,
  title,
  message,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">

      {Icon && (
        <div
          className="flex h-14 w-14 items-center justify-center
                     rounded-2xl
                     bg-[#0f5238]/45
                     ring-1 ring-[#40916c]/40"
        >
          <Icon
            size={22}
            className="text-[#d8ebe2]"
            strokeWidth={1.5}
          />
        </div>
      )}

      <div className="space-y-1">

        <p className="text-sm font-semibold text-[#edf8f2]">
          {title}
        </p>

        {message && (
          <p className="text-xs text-[#b7cbc1]">
            {message}
          </p>
        )}

      </div>

      {action}
    </div>
  );
}
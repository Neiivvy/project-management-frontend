"use client";

export default function EmptyState({
  icon: Icon,
  title,
  message,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">

      {Icon && (
        <div
          className="flex h-14 w-14 items-center justify-center
                     rounded-2xl
                     bg-slate-100
                     text-slate-400
                     border border-slate-200"
        >
          <Icon
            size={22}
            strokeWidth={1.5}
          />
        </div>
      )}

      <div className="space-y-1">

        <p className="text-sm font-semibold text-[#181d19]">
          {title}
        </p>

        {message && (
          <p className="text-xs text-slate-500">
            {message}
          </p>
        )}

      </div>

      {action}
    </div>
  );
}

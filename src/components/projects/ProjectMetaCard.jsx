"use client";

import { Calendar, CalendarPlus, Flag, Activity } from "lucide-react";

function MetaRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-slate-50 last:border-none">
      <span className="flex items-center gap-2 text-sm text-slate-500">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-slate-500">
          <Icon size={13} />
        </div>
        {label}
      </span>

      <span className="text-sm font-medium text-[#181d19]">{value}</span>
    </div>
  );
}

function formatDate(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ProjectMetaCard({
  createdAt,
  dueDate,
  status,
  priority,
}) {
  return (
    <section
      className="
        flex flex-col
        rounded-2xl
        border border-slate-100
        bg-white
        p-5
        shadow-sm
        sm:p-6
        transition-all duration-300
        hover:shadow-md
      "
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f5238]/10 text-[#0f5238]">
          <Activity size={16} />
        </div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Details
        </h2>
      </div>

      <div>
        <MetaRow icon={CalendarPlus} label="Created" value={formatDate(createdAt)} />
        <MetaRow icon={Calendar} label="Due date" value={formatDate(dueDate)} />
        <MetaRow icon={Activity} label="Status" value={status} />
        <MetaRow icon={Flag} label="Priority" value={priority} />
      </div>
    </section>
  );
}

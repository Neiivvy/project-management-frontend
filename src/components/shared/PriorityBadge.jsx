"use client";

import { Calendar, CalendarPlus, Flag, Activity } from "lucide-react";

function MetaRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <span className="flex items-center gap-2 text-sm text-[#66756e]">
        <Icon size={15} className="text-[#40916c]" />
        {label}
      </span>

      <span className="text-sm font-medium text-[#23312d]">{value}</span>
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
        border border-[#dbe6e1]
        bg-white
        p-5
        shadow-sm
        sm:p-6
      "
    >
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[#66756e]">
        Details
      </h2>

      <div className="mt-2 divide-y divide-[#eef2f0]">
        <MetaRow icon={CalendarPlus} label="Created" value={formatDate(createdAt)} />
        <MetaRow icon={Calendar} label="Due date" value={formatDate(dueDate)} />
        <MetaRow icon={Activity} label="Status" value={status} />
        <MetaRow icon={Flag} label="Priority" value={priority} />
      </div>
    </section>
  );
}
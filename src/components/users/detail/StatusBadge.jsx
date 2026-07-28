const STATUS_STYLES = {
  "To Do": "bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1]/50",
  "In Progress": "bg-[#dbeafe] text-[#1e40af] border border-[#93c5fd]/40",
  Review: "bg-[#fef3c7] text-[#92400e] border border-[#fcd34d]/40",
  Completed: "bg-[#dcfce7] text-[#166534] border border-[#86efac]/40",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status] || STATUS_STYLES["To Do"]}`}>
      {status}
    </span>
  );
}
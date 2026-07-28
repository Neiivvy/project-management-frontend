const PRIORITY_STYLES = {
  Low: "bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1]/50",
  Medium: "bg-[#fef3c7] text-[#92400e] border border-[#fcd34d]/40",
  High: "bg-[#fee2e2] text-[#991b1b] border border-[#fca5a5]/40",
};

export default function PriorityBadge({ priority }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${PRIORITY_STYLES[priority] || PRIORITY_STYLES.Medium}`}>
      {priority}
    </span>
  );
}
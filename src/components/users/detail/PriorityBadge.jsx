const PRIORITY_STYLES = {
  Low: "bg-[#eef2f0] text-[#5b6b64]",
  Medium: "bg-[#fdf3e4] text-[#b3720b]",
  High: "bg-[#fdeceb] text-[#c03a2b]",
};

export default function PriorityBadge({ priority }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${PRIORITY_STYLES[priority] || PRIORITY_STYLES.Medium}`}>
      {priority}
    </span>
  );
}
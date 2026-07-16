const STATUS_STYLES = {
  "To Do": "bg-[#eef2f0] text-[#5b6b64]",
  "In Progress": "bg-[#eaf3fb] text-[#2563a8]",
  Review: "bg-[#fdf3e4] text-[#b3720b]",
  Completed: "bg-[#e7f5ee] text-[#1d6d45]",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status] || STATUS_STYLES["To Do"]}`}>
      {status}
    </span>
  );
}
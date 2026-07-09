const MOCK_ROLES = [
  { label: "Members", value: 68, color: "#0f5238" },
  { label: "Project Managers", value: 22, color: "#2d6a4f" },
  { label: "Admins", value: 10, color: "#95d4b3" },
];

export default function RoleDistribution() {
  return (
    <div className="bg-white rounded-2xl border border-[#e3e8e4] shadow-sm p-5 animate-fade-in-up" style={{ animationDelay: "250ms" }}>
      <h2 className="font-semibold text-[#181d19] mb-4">Role Distribution</h2>
      <div className="space-y-4">
        {MOCK_ROLES.map((role) => (
          <div key={role.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#404943] font-medium">{role.label}</span>
              <span className="text-[#8a938c]">{role.value}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#ecefe9] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${role.value}%`, backgroundColor: role.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
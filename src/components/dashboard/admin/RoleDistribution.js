"use client";

export default function RoleDistribution({ summary }) {
  if (!summary) return null;

  const adminCount = 1;

  const total =
    summary.members +
    summary.projectManagers +
    adminCount;

  const roles = [
    {
      label: "Members",
      count: summary.members,
      percent: Math.round((summary.members / total) * 100),
      color: "#0f5238",
    },
    {
      label: "Project Managers",
      count: summary.projectManagers,
      percent: Math.round(
        (summary.projectManagers / total) * 100
      ),
      color: "#2d6a4f",
    },
    {
      label: "Admins",
      count: adminCount,
      percent: Math.round((adminCount / total) * 100),
      color: "#95d4b3",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#e3e8e4] shadow-sm p-5 animate-fade-in-up">
      <h2 className="font-semibold text-[#181d19] mb-4">
        Role Distribution
      </h2>

      <div className="space-y-4">
        {roles.map((role) => (
          <div key={role.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-[#404943]">
                {role.label}
              </span>

              <span className="text-[#8a938c]">
                {role.count} ({role.percent}%)
              </span>
            </div>

            <div className="h-2 rounded-full bg-[#ecefe9] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${role.percent}%`,
                  backgroundColor: role.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
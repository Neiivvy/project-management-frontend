import Link from "next/link";
import { FiUserPlus, FiFolderPlus, FiShield, FiFileText } from "react-icons/fi";

const ACTIONS = [
  { label: "Manage Users", icon: FiUserPlus, route: "/admin/users" },
  { label: "View Projects", icon: FiFolderPlus, route: "/admin/projects" },
  { label: "Manage Roles", icon: FiShield, route: "/admin/roles" },
  { label: "Generate Report", icon: FiFileText, route: "/admin/reports" },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl border border-[#e3e8e4] shadow-sm p-5 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
      <h2 className="font-semibold text-[#181d19] mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {ACTIONS.map(({ label, icon: Icon, route }) => (
          <Link
            key={route}
            href={route}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-[#e3e8e4] py-4 text-center hover:bg-[#f2f6f3] hover:border-[#0f5238]/30 transition-colors"
          >
            <Icon size={18} className="text-[#0f5238]" />
            <span className="text-xs font-medium text-[#404943]">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
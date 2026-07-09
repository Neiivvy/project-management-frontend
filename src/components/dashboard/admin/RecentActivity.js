"use client";

import { Link } from "lucide-react";
import { FiUserPlus, FiFolderPlus, FiCheckCircle, FiShield } from "react-icons/fi";

const ACTIVITY_ICONS = {
  user_added: { icon: FiUserPlus, color: "#0f5238" },
  project_created: { icon: FiFolderPlus, color: "#2d6a4f" },
  task_completed: { icon: FiCheckCircle, color: "#40916c" },
  role_changed: { icon: FiShield, color: "#b08900" },
};

// Placeholder data — wire up to your API later
const MOCK_ACTIVITY = [
  { id: 1, type: "user_added", text: "New user Sita Rai registered", time: "5m ago" },
  { id: 2, type: "role_changed", text: "Ramesh Thapa promoted to Project Manager", time: "1h ago" },
  { id: 3, type: "project_created", text: "New project 'Khana Sanskriti Revamp' created", time: "3h ago" },
  { id: 4, type: "task_completed", text: "Task 'Auth flow QA' marked complete", time: "Yesterday" },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl border border-[#e3e8e4] shadow-sm animate-fade-in-up" style={{ animationDelay: "150ms" }}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#ecefe9]">
        <h2 className="font-semibold text-[#181d19]">Recent Activity</h2>
        <Link href="/admin/activity" className="text-xs font-medium text-[#0f5238] hover:underline">
          View all
        </Link>
      </div>

      <ul className="divide-y divide-[#ecefe9]">
        {MOCK_ACTIVITY.map((item) => {
          const { icon: Icon, color } = ACTIVITY_ICONS[item.type];
          return (
            <li key={item.id} className="flex items-start gap-3 px-5 py-4">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${color}1a`, color }}
              >
                <Icon size={16} />
              </span>
              <div className="flex-1">
                <p className="text-sm text-[#181d19]">{item.text}</p>
                <p className="text-xs text-[#8a938c] mt-0.5">{item.time}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
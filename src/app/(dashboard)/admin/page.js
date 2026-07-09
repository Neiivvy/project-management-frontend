"use client";

import useAuthStore from "@/store/authStore";
import { FiUsers, FiFolder, FiUserCheck, FiFileText } from "react-icons/fi";
import StatCard from "@/components/dashboard/admin/StatCard";
import RecentActivity from "@/components/dashboard/admin/RecentActivity";
import QuickActions from "@/components/dashboard/admin/QuickActions";
import RoleDistribution from "@/components/dashboard/admin/RoleDistribution";

export default function AdminPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-[#181d19]">
          Welcome back, {user?.name}
        </h1>
        <p className="mt-1 text-[#697268]">
          Here&apos;s what&apos;s happening across Project Clarity today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard icon={FiUsers} label="Total Users" value={248} trend={8} color="#0f5238" delay={0} />
        <StatCard icon={FiFolder} label="Active Projects" value={34} trend={4} color="#2d6a4f" delay={80} />
        <StatCard icon={FiUserCheck} label="Project Managers" value={19} trend={2} color="#40916c" delay={160} />
        <StatCard icon={FiFileText} label="Reports Generated" value={57} trend={-3} color="#b08900" delay={240} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <RoleDistribution />
        </div>
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuthStore from "@/store/authStore";
import {
  getDashboardRoute,
  getPanelTitle,
  getSidebarItems,
} from "@/utils/auth";

export default function Sidebar() {
  const pathName = usePathname();
  const user = useAuthStore((state) => state.user);

  const dashboardRoute = getDashboardRoute(user?.role);
  const panelTitle = getPanelTitle(user?.role);
  const navItems = getSidebarItems(user?.role);

  return (
    <aside className="hidden md:flex w-70 h-screen sticky left-0 top-0 flex-col bg-white shadow-sm p-4 gap-2">
      <Link href={dashboardRoute} className="mb-6 block">
        <div className="flex items-center gap-3 px-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2d6a4f] text-white font-bold">
            PC
          </span>

          <div>
            <h1 className="font-bold text-[#181d19]">
              Project Clarity
            </h1>

            <p className="text-xs text-[#404943]">
              {panelTitle}
            </p>
          </div>
        </div>
      </Link>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathName === item.route ||
            (item.route !== dashboardRoute &&
              pathName.startsWith(item.route));

          return (
            <Link
              key={item.route}
              href={item.route}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-[#dce5df] text-[#0f5238] font-semibold"
                  : "text-[#404943] hover:bg-[#e6e9e3]"
              }`}
            >
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
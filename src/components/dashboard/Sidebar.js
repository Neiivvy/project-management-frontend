"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import {
  getDashboardRoute,
  getPanelTitle,
  getSidebarItems,
} from "@/utils/auth";

export default function Sidebar() {
  const pathname = usePathname();

  const user = useAuthStore((state) => state.user);

  const dashboardRoute = getDashboardRoute(user?.role);
  const panelTitle = getPanelTitle(user?.role);
  const navItems = getSidebarItems(user?.role);

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <aside className="hidden md:flex w-72 h-screen sticky top-0 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}

      <div className="border-b border-slate-200 p-6">
        <Link href={dashboardRoute} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2d6a4f] text-white ">
            PC
          </div>

          <div>
            <h1 className="text-lg  text-[#181d19]">Project Clarity</h1>

            <p className="text-xs text-slate-500">{panelTitle}</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const active =
              pathname === item.route ||
              (item.route !== dashboardRoute &&
                pathname.startsWith(item.route));

            return (
              <Link
                key={item.route}
                href={item.route}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  active
                    ? "bg-[#0f5238] text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100 hover:text-[#0f5238]"
                }`}
              >
                <span
                  className={`text-lg ${
                    active ? "text-white" : "text-slate-500"
                  }`}
                >
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

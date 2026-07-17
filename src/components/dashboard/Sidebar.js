"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTimes } from "react-icons/fa";

import useAuthStore from "@/store/useAuthStore";
import {
  getDashboardRoute,
  getPanelTitle,
  getSidebarItems,
} from "@/utils/auth";

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  const user = useAuthStore((state) => state.user);

  const dashboardRoute = getDashboardRoute(user?.role);
  const panelTitle = getPanelTitle(user?.role);
  const navItems = getSidebarItems(user?.role);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Overlay */}

      <div
        onClick={closeSidebar}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          bg-white
          border-r border-slate-200
          flex flex-col
          transition-transform duration-300 ease-in-out

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:sticky
          md:top-0
          md:translate-x-0
        `}
      >
        {/* Mobile Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-6 md:hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2d6a4f] text-white">
              CW
            </div>

            <div>
              <h1 className="text-lg text-[#181d19]">
                Co Work
              </h1>

              <p className="text-xs text-slate-500">
                {panelTitle}
              </p>
            </div>
          </div>

          <button
            onClick={closeSidebar}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <FaTimes />
          </button>
        </div>

        {/* Desktop Header */}

        <div className="hidden border-b border-slate-200 p-6 md:block">
          <Link
            href={dashboardRoute}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0f5238] text-white">
             CW
            </div>

            <div>
              <h1 className="text-lg text-[#181d19]">
                Co Work
              </h1>

              <p className="text-xs text-slate-500">
                {panelTitle}
              </p>
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
                  onClick={closeSidebar}
                  className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                    active
                      ? "bg-[#0f5238] text-white shadow-lg"
                      : "text-slate-600 hover:bg-slate-100 hover:text-[#0f5238]"
                  }`}
                >
                  <span
                    className={`text-lg ${
                      active
                        ? "text-white"
                        : "text-slate-500"
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
    </>
  );
}
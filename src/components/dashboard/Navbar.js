"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import useNotificationStore from "@/store/admin/useNotificationStore";
import { ROLE } from "@/constants/roles";

import {
  FaSearch,
  FaBell,
  FaChevronDown,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

import NotificationPanel from "./NotificationPanel";

export default function Navbar({ setIsOpen }) {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const { isNotificationOpen, setIsNotificationOpen, unreadCount } =
    useNotificationStore();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  const getProfileRoute = () => {
    switch (user?.role) {
      case ROLE.ADMIN:
        return "/admin/profile";

      case ROLE.PROJECT_MANAGER:
        return "/project-manager/profile";

      case ROLE.MEMBER:
        return "/member/profile";

      default:
        return "/";
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8 shadow-sm">
      {/* Left */}

      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Hamburger */}

        <button
          onClick={() => setIsOpen(true)}
          className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white transition hover:bg-slate-100"
        >
          <FaBars className="text-slate-700" />
        </button>

        {/* Search */}

        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-[#bfc9c1] bg-white py-2 pl-11 pr-4 focus:border-[#0f5238] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20 transition-all"
          />
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-2 md:gap-5">
        <div className="hidden text-right md:block">
          <p className="text-sm font-medium text-slate-700">{today}</p>
        </div>

        {/* Notification — available to all roles */}

        <div className="relative">
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative rounded-xl bg-slate-100 p-3 transition hover:bg-slate-200"
          >
            <FaBell className="text-slate-600" />

            {unreadCount > 0 && (
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
            )}
          </button>

          <NotificationPanel />
        </div>

        {/* Profile */}

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 md:px-3 py-2 transition hover:bg-slate-50"
          >
            <div className="hidden text-right lg:block">
              <p className="text-[#181d19]">{user?.name}</p>

              <p className="text-xs capitalize text-slate-500">
                {user?.role?.replaceAll("_", " ")}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0f5238] text-white">
              {initials}
            </div>

            <FaChevronDown
              className={`text-sm text-slate-500 transition ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-56 sm:w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div className="border-b bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f5238] text-white">
                    {initials}
                  </div>

                  <div>
                    <h3>{user?.name}</h3>

                    <p className="text-sm capitalize text-slate-500">
                      {user?.role?.replaceAll("_", " ")}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  router.push(getProfileRoute());
                }}
                className="flex w-full items-center gap-3 px-5 py-4 transition hover:bg-slate-100"
              >
                <FaUserCircle />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-5 py-4 text-red-600 transition hover:bg-red-50"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

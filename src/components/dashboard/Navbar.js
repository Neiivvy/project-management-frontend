"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

import {
  FaSearch,
  FaBell,
  FaChevronDown,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Navbar() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

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
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
      {/* Left */}

      <div className="flex items-center gap-8">
        <div className="relative w-full max-w-md">
          {" "}
          <input
            type="text"
            placeholder="Search tasks, projects..."
            className="w-full pl-4 pr-4 py-2 bg-white border border-[#bfc9c1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20 focus:border-[#0f5238] transition-all"
          />{" "}
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">
        <div className="hidden text-right md:block">
          <p className="text-sm font-medium text-slate-700">{today}</p>
        </div>

        {/* Notification */}

        <button className="relative rounded-xl bg-slate-100 p-3 transition hover:bg-slate-200">
          <FaBell className="text-slate-600" />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50"
          >
            <div className="hidden text-right lg:block">
              <p className="font-semibold text-[#181d19]">{user?.name}</p>

              <p className="text-xs capitalize text-slate-500">
                {user?.role?.replaceAll("_", " ")}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0f5238] font-bold text-white">
              {initials}
            </div>

            <FaChevronDown
              className={`text-sm text-slate-500 transition ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div className="border-b bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f5238] font-bold text-white">
                    {initials}
                  </div>

                  <div>
                    <h3 className="font-semibold">{user?.name}</h3>

                    <p className="text-sm capitalize text-slate-500">
                      {user?.role?.replaceAll("_", " ")}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  // router.push("/profile");
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

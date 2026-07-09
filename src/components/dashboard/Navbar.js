"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function Navbar() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const initials = user?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="w-full h-16 sticky top-0 z-40 bg-white border-b border-[#bfc9c1] px-6 flex justify-between items-center">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search tasks, projects..."
          className="w-full pl-4 pr-4 py-2 bg-white border border-[#bfc9c1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20 focus:border-[#0f5238] transition-all"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="hover:bg-[#ecefe9] rounded-full p-2 transition-all">
          🔔
        </button>

        <div className="h-8 w-px bg-[#bfc9c1]" />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 hover:bg-[#ecefe9] rounded-lg px-2 py-1 transition"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#181d19]">
                {user?.name}
              </p>

              <p className="text-xs capitalize text-[#404943]">
                {user?.role.replace("_", " ")}
              </p>
            </div>

            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#95d4b3] text-[#0f5238] font-bold">
              {initials}
            </span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl border border-[#d9dfdb] bg-white shadow-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-[#ecefe9]">
                <p className="font-semibold text-[#181d19]">
                  {user?.name}
                </p>
                <p className="text-sm text-[#404943] capitalize">
                  {user?.role.replace("_", " ")}
                </p>
              </div>

              <button
                className="w-full text-left px-4 py-3 hover:bg-[#ecefe9] transition"
                onClick={() => {
                  setOpen(false);
                  // router.push("/profile");
                }}
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
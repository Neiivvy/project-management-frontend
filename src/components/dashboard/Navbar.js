"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import useNotificationStore from "@/store/admin/useNotificationStore";
import useUsersStore from "@/store/admin/useUsersStore";
import useProjectStore from "@/store/admin/useProjectStore";
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
  const pathname = usePathname();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const { isNotificationOpen, setIsNotificationOpen, unreadCount } =
    useNotificationStore();

  const { users, fetchUsers } = useUsersStore();
  const { projects, fetchProjects } = useProjectStore();

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const isAdminRoute = pathname?.startsWith("/admin");

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
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isAdminRoute) {
      if (users.length === 0) {
        fetchUsers();
      }
      if (projects.length === 0) {
        fetchProjects();
      }
    }
  }, [isAdminRoute, users.length, projects.length, fetchUsers, fetchProjects]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const filteredUsers = useMemo(() => {
    if (!isAdminRoute || !searchQuery.trim()) return [];
    const query = searchQuery.trim().toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(query) ||
        u.email?.toLowerCase().includes(query)
    );
  }, [isAdminRoute, searchQuery, users]);

  const filteredProjects = useMemo(() => {
    if (!isAdminRoute || !searchQuery.trim()) return [];
    const query = searchQuery.trim().toLowerCase();
    return projects.filter((p) => p.title?.toLowerCase().includes(query));
  }, [isAdminRoute, searchQuery, projects]);

  const hasResults = filteredUsers.length > 0 || filteredProjects.length > 0;

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsSearchOpen(value.trim().length > 0);
  };

  const handleUserClick = (userId) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    router.push(`/admin/users/${userId}`);
  };

  const handleProjectClick = (projectId) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    router.push(`/admin/projects/${projectId}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

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

        <div className="relative flex-1 max-w-md" ref={searchInputRef}>
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (isAdminRoute && searchQuery.trim().length > 0) {
                setIsSearchOpen(true);
              }
            }}
            className="w-full rounded-lg border border-[#bfc9c1] bg-white py-2 pl-11 pr-4 focus:border-[#0f5238] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20 transition-all"
          />

          {isAdminRoute && isSearchOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl z-50">
              {!hasResults ? (
                <div className="p-4 text-sm text-slate-500 text-center">
                  No results found
                </div>
              ) : (
                <div className="p-2">
                  {filteredUsers.length > 0 && (
                    <div className="mb-2">
                      <p className="px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Users
                      </p>
                      {filteredUsers.slice(0, 5).map((u) => (
                        <button
                          key={u._id}
                          onClick={() => handleUserClick(u._id)}
                          className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <p className="text-sm font-medium text-[#181d19]">
                            {u.name}
                          </p>
                          <p className="text-xs text-slate-500">{u.email}</p>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredProjects.length > 0 && (
                    <div>
                      <p className="px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Projects
                      </p>
                      {filteredProjects.slice(0, 5).map((p) => (
                        <button
                          key={p._id}
                          onClick={() => handleProjectClick(p._id)}
                          className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <p className="text-sm font-medium text-[#181d19]">
                            {p.title}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
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

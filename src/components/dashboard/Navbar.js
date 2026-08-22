"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import useAuthStore from "@/store/useAuthStore";
import useNotificationStore from "@/store/admin/useNotificationStore";
import useUsersStore from "@/store/admin/useUsersStore";
import useProjectStore from "@/store/admin/useProjectStore";

import { getMyProjects } from "@/api/projects";
import { getMyTasks } from "@/api/tasks";

import { ROLE } from "@/constants/roles";

import {
  FaSearch,
  FaBell,
  FaChevronDown,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaHome,
  FaFolder,
  FaTasks,
  FaUsers,
  FaUser,
  FaChartLine,
  FaFileAlt,
  FaShieldAlt,
  FaHistory,
  FaEnvelope,
} from "react-icons/fa";

import NotificationPanel from "./NotificationPanel";

export default function Navbar({ setIsOpen }) {
  const router = useRouter();

  /* =====================================================
     AUTH
  ===================================================== */

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  /* =====================================================
     NOTIFICATIONS
  ===================================================== */

  const { isNotificationOpen, setIsNotificationOpen, unreadCount } =
    useNotificationStore();

  /* =====================================================
     STORES
  ===================================================== */

  const { users, fetchUsers } = useUsersStore();

  const { projects: adminProjects, fetchProjects } = useProjectStore();

  /* =====================================================
     STATES
  ===================================================== */

  const [open, setOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [memberProjects, setMemberProjects] = useState([]);

  const [memberTasks, setMemberTasks] = useState([]);

  const [memberDataLoading, setMemberDataLoading] = useState(false);

  const [memberDataError, setMemberDataError] = useState("");

  /* =====================================================
     REFS
  ===================================================== */

  const dropdownRef = useRef(null);

  const searchInputRef = useRef(null);

  /* =====================================================
     ROLE
  ===================================================== */

  const isAdmin = user?.role === ROLE.ADMIN;

  const isProjectManager = user?.role === ROLE.PROJECT_MANAGER;

  const isMember = user?.role === ROLE.MEMBER;

  /*
   * Admin + PM can search users.
   *
   * Member cannot search all users.
   */
  const canSearchUsers = isAdmin || isProjectManager;

  /* =====================================================
     INITIALS
  ===================================================== */

  const initials =
    user?.name
      ?.split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  /* =====================================================
     ROLE LABEL
  ===================================================== */

  const getRoleLabel = (role) => {
    switch (role) {
      case ROLE.ADMIN:
        return "Admin";

      case ROLE.PROJECT_MANAGER:
        return "Project Manager";

      case ROLE.MEMBER:
        return "Member";

      default:
        return (
          role
            ?.replaceAll("_", " ")
            ?.replace(/\b\w/g, (char) => char.toUpperCase()) || "User"
        );
    }
  };

  /* =====================================================
     PROFILE ROUTE
  ===================================================== */

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

  /* =====================================================
     DASHBOARD
  ===================================================== */

  const getDashboardRoute = () => {
    switch (user?.role) {
      case ROLE.ADMIN:
        return "/admin";

      case ROLE.PROJECT_MANAGER:
        return "/project-manager";

      case ROLE.MEMBER:
        return "/member";

      default:
        return "/";
    }
  };

  /* =====================================================
     PROJECTS
  ===================================================== */

  const getProjectsRoute = () => {
    switch (user?.role) {
      case ROLE.ADMIN:
        return "/admin/projects";

      case ROLE.PROJECT_MANAGER:
        return "/project-manager/projects";

      case ROLE.MEMBER:
        return "/member/projects";

      default:
        return "/";
    }
  };

  /* =====================================================
     TASKS
  ===================================================== */

  const getTasksRoute = () => {
    switch (user?.role) {
      case ROLE.ADMIN:
        return "/admin/tasks";

      case ROLE.PROJECT_MANAGER:
        return "/project-manager/tasks";

      case ROLE.MEMBER:
        return "/member/tasks";

      default:
        return "/";
    }
  };

  /* =====================================================
     TEAM / USERS
  ===================================================== */

  const getTeamRoute = () => {
    switch (user?.role) {
      case ROLE.ADMIN:
        return "/admin/users";

      case ROLE.PROJECT_MANAGER:
        return "/project-manager/members";

      case ROLE.MEMBER:
        return "/member/team";

      default:
        return "/";
    }
  };

  /* =====================================================
     PM TASK PROGRESS
  ===================================================== */

  const getTaskProgressRoute = () => {
    if (isProjectManager) {
      return "/project-manager/progress";
    }

    return "/";
  };

  /* =====================================================
     REPORTS
  ===================================================== */

  const getReportRoute = () => {
    switch (user?.role) {
      case ROLE.ADMIN:
        return "/admin/reports";

      case ROLE.PROJECT_MANAGER:
        return "/project-manager/reports";

      default:
        return "/";
    }
  };

  /* =====================================================
     ADMIN ROLES & PERMISSIONS
  ===================================================== */

  const getRolesPermissionRoute = () => {
    if (isAdmin) {
      return "/admin/roles-permissions";
    }

    return "/";
  };

  /* =====================================================
     ADMIN ACTIVITY
  ===================================================== */

  const getActivityRoute = () => {
    if (isAdmin) {
      return "/admin/activity";
    }

    return "/";
  };

  /* =====================================================
     ADMIN CONTACT
  ===================================================== */

  const getContactRoute = () => {
    if (isAdmin) {
      return "/admin/contact";
    }

    return "/";
  };

  /* =====================================================
     NOTIFICATIONS
  ===================================================== */

  const getNotificationsRoute = () => {
    switch (user?.role) {
      case ROLE.ADMIN:
        return "/admin/notifications";

      case ROLE.PROJECT_MANAGER:
        return "/project-manager/notifications";

      case ROLE.MEMBER:
        return "/member/notifications";

      default:
        return "/";
    }
  };

  /* =====================================================
     MEMBER PROJECT ROUTE
  ===================================================== */

  const getMemberProjectRoute = (id) => {
    return `/member/projects/${id}`;
  };

  /* =====================================================
     MEMBER TASK ROUTE
  ===================================================== */

  const getMemberTaskRoute = (id) => {
    return `/member/tasks/${id}`;
  };

  /* =====================================================
     ADMIN / PM PROJECT ROUTE
  ===================================================== */

  const getProjectSearchRoute = (id) => {
    if (isAdmin) {
      return `/admin/projects/${id}`;
    }

    if (isProjectManager) {
      return `/project-manager/projects/${id}`;
    }

    return "/";
  };

  /* =====================================================
     ADMIN / PM USER ROUTE
  ===================================================== */

  const getUserSearchRoute = (id) => {
    if (isAdmin) {
      return `/admin/users/${id}`;
    }

    if (isProjectManager) {
      return `/project-manager/team/${id}`;
    }

    return "/";
  };

  /* =====================================================
     CLOSE DROPDOWNS
  ===================================================== */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }

      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =====================================================
     LOAD USERS
     
     ADMIN + PM ONLY
  ===================================================== */

  useEffect(() => {
    if (!canSearchUsers) return;

    if (users.length > 0) return;

    fetchUsers();
  }, [canSearchUsers, users.length, fetchUsers]);

  /* =====================================================
     LOAD PROJECTS
     
     ADMIN + PM ONLY
     
     IMPORTANT:
     Keep dependency array FIXED.
  ===================================================== */

  useEffect(() => {
    if (!isAdmin && !isProjectManager) {
      return;
    }

    if (adminProjects.length > 0) {
      return;
    }

    fetchProjects();
  }, [isAdmin, isProjectManager, adminProjects.length, fetchProjects]);

  /* =====================================================
     LOAD MEMBER PROJECTS + TASKS
  ===================================================== */

  useEffect(() => {
    if (!isMember) return;

    let cancelled = false;

    const loadMemberSearchData = async () => {
      try {
        setMemberDataLoading(true);
        setMemberDataError("");

        const [projectsResponse, tasksResponse] = await Promise.all([
          getMyProjects(),
          getMyTasks(),
        ]);

        if (cancelled) return;

        const projectsData = projectsResponse?.data?.data || [];

        const tasksData = tasksResponse?.data?.data || [];

        setMemberProjects(Array.isArray(projectsData) ? projectsData : []);

        setMemberTasks(Array.isArray(tasksData) ? tasksData : []);
      } catch (error) {
        if (cancelled) return;

        console.error("Member search data error:", error);

        setMemberDataError(
          error?.response?.data?.message || "Failed to load search data",
        );

        setMemberProjects([]);
        setMemberTasks([]);
      } finally {
        if (!cancelled) {
          setMemberDataLoading(false);
        }
      }
    };

    loadMemberSearchData();

    return () => {
      cancelled = true;
    };
  }, [isMember]);

  /* =====================================================
     TODAY
  ===================================================== */

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  /* =====================================================
     MEMBER PROJECT SEARCH
  ===================================================== */

  const filteredMemberProjects = useMemo(() => {
    if (!isMember) return [];

    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    return memberProjects.filter((project) => {
      const title = String(project?.title || "").toLowerCase();

      const description = String(project?.description || "").toLowerCase();

      const status = String(project?.status || "").toLowerCase();

      return (
        title.includes(query) ||
        description.includes(query) ||
        status.includes(query)
      );
    });
  }, [isMember, searchQuery, memberProjects]);

  /* =====================================================
     MEMBER TASK SEARCH
  ===================================================== */

  const filteredMemberTasks = useMemo(() => {
    if (!isMember) return [];

    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    return memberTasks.filter((task) => {
      const title = String(task?.title || "").toLowerCase();

      const description = String(task?.description || "").toLowerCase();

      const status = String(task?.status || "").toLowerCase();

      const priority = String(task?.priority || "").toLowerCase();

      const projectTitle =
        typeof task?.projectId === "object"
          ? String(task?.projectId?.title || "").toLowerCase()
          : "";

      return (
        title.includes(query) ||
        description.includes(query) ||
        status.includes(query) ||
        priority.includes(query) ||
        projectTitle.includes(query)
      );
    });
  }, [isMember, searchQuery, memberTasks]);

  /* =====================================================
     USER SEARCH
     
     ADMIN:
       admin + pm + member

     PM:
       pm + member

     MEMBER:
       none
  ===================================================== */

  const filteredUsers = useMemo(() => {
    if (!canSearchUsers) return [];

    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    let allowedRoles = [];

    if (isAdmin) {
      allowedRoles = [ROLE.ADMIN, ROLE.PROJECT_MANAGER, ROLE.MEMBER];
    } else if (isProjectManager) {
      allowedRoles = [ROLE.PROJECT_MANAGER, ROLE.MEMBER];
    }

    return users.filter((u) => {
      if (!allowedRoles.includes(u?.role)) {
        return false;
      }

      const name = String(u?.name || "").toLowerCase();

      const email = String(u?.email || "").toLowerCase();

      const username = String(u?.username || "").toLowerCase();

      const role = String(u?.role || "").toLowerCase();

      const roleLabel = role.replaceAll("_", " ");

      return (
        name.includes(query) ||
        email.includes(query) ||
        username.includes(query) ||
        roleLabel.includes(query)
      );
    });
  }, [canSearchUsers, isAdmin, isProjectManager, searchQuery, users]);

  /* =====================================================
     PROJECT SEARCH
     
     ADMIN + PM
  ===================================================== */

  const filteredAdminProjects = useMemo(() => {
    if (!isAdmin && !isProjectManager) {
      return [];
    }

    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    return adminProjects.filter((project) => {
      const title = String(project?.title || "").toLowerCase();

      const description = String(project?.description || "").toLowerCase();

      const status = String(project?.status || "").toLowerCase();

      return (
        title.includes(query) ||
        description.includes(query) ||
        status.includes(query)
      );
    });
  }, [isAdmin, isProjectManager, searchQuery, adminProjects]);

  /* =====================================================
     NAVIGATION ITEMS
     
     IMPORTANT:
     PAGES ARE ROLE BASED.
     
     MEMBER:
       Dashboard
       Projects
       Tasks
       Team
       Profile

     PM:
       Dashboard
       Projects
       Tasks
       Members
       Task Progress
       Reports
       Profile

     ADMIN:
       Dashboard
       Users
       Roles & Permissions
       Projects
       Activity
       Contact
       Reports
       Profile
  ===================================================== */

  const navigationItems = useMemo(() => {
    if (isMember) {
      return [
        {
          id: "dashboard",
          title: "Dashboard",
          description: "Open dashboard",
          icon: FaHome,
          route: "/member",
        },
        {
          id: "projects",
          title: "Projects",
          description: "View your projects",
          icon: FaFolder,
          route: "/member/projects",
        },
        {
          id: "tasks",
          title: "Tasks",
          description: "View your tasks",
          icon: FaTasks,
          route: "/member/tasks",
        },
        {
          id: "team",
          title: "Team",
          description: "View team members",
          icon: FaUsers,
          route: "/member/team",
        },
        {
          id: "profile",
          title: "Profile",
          description: "View your profile",
          icon: FaUser,
          route: "/member/profile",
        },
      ];
    }

    if (isProjectManager) {
      return [
        {
          id: "dashboard",
          title: "Dashboard",
          description: "Open dashboard",
          icon: FaHome,
          route: "/project-manager",
        },
        {
          id: "projects",
          title: "Projects",
          description: "Manage projects",
          icon: FaFolder,
          route: "/project-manager/projects",
        },
        {
          id: "tasks",
          title: "Tasks",
          description: "Manage tasks",
          icon: FaTasks,
          route: "/project-manager/tasks",
        },
        {
          id: "members",
          title: "Members",
          description: "Manage project members",
          icon: FaUsers,
          route: "/project-manager/members",
        },
        {
          id: "task-progress",
          title: "Task Progress",
          description: "View task progress",
          icon: FaChartLine,
          route: "/project-manager/progress",
        },
        {
          id: "reports",
          title: "Reports",
          description: "View project reports",
          icon: FaFileAlt,
          route: "/project-manager/report",
        },
        {
          id: "profile",
          title: "Profile",
          description: "View your profile",
          icon: FaUser,
          route: "/project-manager/profile",
        },
      ];
    }

    if (isAdmin) {
      return [
        {
          id: "dashboard",
          title: "Dashboard",
          description: "Open dashboard",
          icon: FaHome,
          route: "/admin",
        },
        {
          id: "users",
          title: "Users",
          description: "Manage users",
          icon: FaUsers,
          route: "/admin/users",
        },
        {
          id: "roles-permissions",
          title: "Roles & Permissions",
          description: "Manage roles and permissions",
          icon: FaShieldAlt,
          route: "/admin/roles",
        },
        {
          id: "projects",
          title: "Projects",
          description: "Manage all projects",
          icon: FaFolder,
          route: "/admin/projects",
        },
        {
          id: "activity",
          title: "Activity",
          description: "View system activity",
          icon: FaHistory,
          route: "/admin/activity",
        },
        {
          id: "contact",
          title: "Contact",
          description: "Manage contact messages",
          icon: FaEnvelope,
          route: "/admin/contact",
        },
        {
          id: "reports",
          title: "Reports",
          description: "View system reports",
          icon: FaFileAlt,
          route: "/admin/reports",
        },
        {
          id: "profile",
          title: "Profile",
          description: "View your profile",
          icon: FaUser,
          route: "/admin/profile",
        },
      ];
    }

    return [];
  }, [isAdmin, isProjectManager, isMember]);

  /* =====================================================
     PAGE SEARCH
     
     PAGES COME FIRST.
  ===================================================== */

  const filteredNavigation = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    return navigationItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, navigationItems]);

  /* =====================================================
     RESULTS
  ===================================================== */

  const hasResults =
    filteredNavigation.length > 0 ||
    filteredUsers.length > 0 ||
    filteredAdminProjects.length > 0 ||
    filteredMemberProjects.length > 0 ||
    filteredMemberTasks.length > 0;

  /* =====================================================
     SEARCH
  ===================================================== */

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearchQuery(value);

    setIsSearchOpen(value.trim().length > 0);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  /* =====================================================
     NAVIGATION
  ===================================================== */

  const handleNavigationClick = (route) => {
    clearSearch();
    router.push(route);
  };

  const handleMemberProjectClick = (id) => {
    clearSearch();
    router.push(`/member/projects/${id}`);
  };

  const handleMemberTaskClick = (id) => {
    clearSearch();
    router.push(`/member/tasks/${id}`);
  };

  const handleUserClick = (id) => {
    clearSearch();

    if (isAdmin) {
      router.push(`/admin/users/${id}`);
      return;
    }

    if (isProjectManager) {
      router.push(`/project-manager/team/${id}`);
    }
  };

  const handleAdminProjectClick = (id) => {
    clearSearch();

    if (isAdmin) {
      router.push(`/admin/projects/${id}`);
      return;
    }

    if (isProjectManager) {
      router.push(`/project-manager/projects/${id}`);
    }
  };

  /* =====================================================
     KEYBOARD
  ===================================================== */

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      clearSearch();
      return;
    }

    if (e.key !== "Enter") {
      return;
    }

    /*
     * PAGES FIRST
     */
    if (filteredNavigation.length === 1) {
      handleNavigationClick(filteredNavigation[0].route);
      return;
    }

    /*
     * USERS
     */
    if (filteredUsers.length === 1) {
      handleUserClick(filteredUsers[0]._id);
      return;
    }

    /*
     * PROJECTS
     */
    if (filteredAdminProjects.length === 1) {
      handleAdminProjectClick(filteredAdminProjects[0]._id);
      return;
    }

    /*
     * MEMBER PROJECT
     */
    if (filteredMemberProjects.length === 1) {
      handleMemberProjectClick(filteredMemberProjects[0]._id);
      return;
    }

    /*
     * MEMBER TASK
     */
    if (filteredMemberTasks.length === 1) {
      handleMemberTaskClick(filteredMemberTasks[0]._id);
    }
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  /* =====================================================
     OUTSIDE CLICK
  ===================================================== */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }

      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-8">
      {/* =================================================
          LEFT
      ================================================= */}

      <div className="flex flex-1 items-center gap-4">
        {/* MOBILE MENU */}

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white transition hover:bg-slate-100 md:hidden"
        >
          <FaBars className="text-slate-700" />
        </button>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="relative max-w-md flex-1" ref={searchInputRef}>
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder={
              isMember ? "Search your projects and tasks..." : "Search..."
            }
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (searchQuery.trim().length > 0) {
                setIsSearchOpen(true);
              }
            }}
            className="w-full rounded-lg border border-[#bfc9c1] bg-white py-2 pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition-all focus:border-[#0f5238] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20"
          />

          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-125 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
              {/* MEMBER LOADING */}

              {isMember && memberDataLoading && (
                <div className="p-5 text-center">
                  <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-[#0f5238]" />

                  <p className="text-sm text-slate-500">
                    Loading your projects and tasks...
                  </p>
                </div>
              )}

              {/* MEMBER ERROR */}

              {isMember && !memberDataLoading && memberDataError && (
                <div className="p-5 text-center">
                  <p className="text-sm font-medium text-red-600">
                    Unable to load search data
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {memberDataError}
                  </p>
                </div>
              )}

              {/* NO RESULTS */}

              {!memberDataLoading && !memberDataError && !hasResults && (
                <div className="p-6 text-center">
                  <FaSearch className="mx-auto mb-3 text-2xl text-slate-300" />

                  <p className="text-sm font-medium text-slate-700">
                    No results found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try another name, project, task, or page.
                  </p>
                </div>
              )}

              {/* RESULTS */}

              {!memberDataLoading && !memberDataError && hasResults && (
                <div className="p-2">
                  {/* =================================================
                          1. PAGES FIRST
                      ================================================= */}

                  {filteredNavigation.length > 0 && (
                    <div className="mb-3">
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Pages
                      </p>

                      {filteredNavigation.slice(0, 8).map((item) => {
                        const Icon = item.icon;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleNavigationClick(item.route)}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-emerald-50"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                              <Icon />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-[#181d19]">
                                {item.title}
                              </p>

                              <p className="truncate text-xs text-slate-500">
                                {item.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* =================================================
                          2. USERS
                      ================================================= */}

                  {filteredUsers.length > 0 && (
                    <div className="mb-3">
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Users
                      </p>

                      {filteredUsers.slice(0, 7).map((u) => (
                        <button
                          key={u._id}
                          type="button"
                          onClick={() => handleUserClick(u._id)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-emerald-50"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0f5238] text-sm font-medium text-white">
                            {u.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-[#181d19]">
                              {u.name || "Unknown User"}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                              {u.email}
                            </p>
                          </div>

                          <span
                            className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-medium ${
                              u.role === ROLE.ADMIN
                                ? "bg-purple-100 text-purple-700"
                                : u.role === ROLE.PROJECT_MANAGER
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {getRoleLabel(u.role)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* =================================================
                          3. MEMBER PROJECTS
                      ================================================= */}

                  {filteredMemberProjects.length > 0 && (
                    <div className="mb-3">
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        My Projects
                      </p>

                      {filteredMemberProjects.slice(0, 5).map((project) => (
                        <button
                          key={project._id}
                          type="button"
                          onClick={() => handleMemberProjectClick(project._id)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-emerald-50"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#0f5238]">
                            <FaFolder />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-[#181d19]">
                              {project.title || "Untitled Project"}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                              {project.description ||
                                project.status ||
                                "Assigned project"}
                            </p>
                          </div>

                          {project.status && (
                            <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] capitalize text-slate-500">
                              {project.status}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* =================================================
                          4. MEMBER TASKS
                      ================================================= */}

                  {filteredMemberTasks.length > 0 && (
                    <div className="mb-3">
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        My Tasks
                      </p>

                      {filteredMemberTasks.slice(0, 7).map((task) => {
                        const projectTitle =
                          typeof task?.projectId === "object"
                            ? task?.projectId?.title
                            : "";

                        return (
                          <button
                            key={task._id}
                            type="button"
                            onClick={() => handleMemberTaskClick(task._id)}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-emerald-50"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                              <FaTasks />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-[#181d19]">
                                {task.title || "Untitled Task"}
                              </p>

                              <p className="truncate text-xs text-slate-500">
                                {projectTitle
                                  ? `Project: ${projectTitle}`
                                  : task.description || "Assigned task"}
                              </p>
                            </div>

                            {task.status && (
                              <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] capitalize text-slate-500">
                                {task.status}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* =================================================
                          5. PROJECTS
                      ================================================= */}

                  {filteredAdminProjects.length > 0 && (
                    <div>
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Projects
                      </p>

                      {filteredAdminProjects.slice(0, 5).map((project) => (
                        <button
                          key={project._id}
                          type="button"
                          onClick={() => handleAdminProjectClick(project._id)}
                          className="w-full rounded-lg px-3 py-3 text-left transition-colors hover:bg-emerald-50"
                        >
                          <p className="text-sm font-medium text-[#181d19]">
                            {project.title}
                          </p>

                          {project.description && (
                            <p className="truncate text-xs text-slate-500">
                              {project.description}
                            </p>
                          )}

                          {project.status && (
                            <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-1 text-[10px] capitalize text-slate-500">
                              {project.status}
                            </span>
                          )}
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

      {/* =================================================
          RIGHT
      ================================================= */}

      <div className="flex items-center gap-2 md:gap-5">
        {/* DATE */}

        <div className="hidden text-right md:block">
          <p className="text-sm font-medium text-slate-700">{today}</p>
        </div>

        {/* NOTIFICATIONS */}

        <div className="relative">
          <button
            type="button"
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

        {/* PROFILE */}

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-2 transition hover:bg-slate-50 md:px-3"
          >
            <div className="hidden text-right lg:block">
              <p className="text-[#181d19]">{user?.name || "User"}</p>

              <p className="text-xs capitalize text-slate-500">
                {getRoleLabel(user?.role)}
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

          {/* PROFILE MENU */}

          {open && (
            <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:w-60">
              <div className="border-b bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f5238] text-white">
                    {initials}
                  </div>

                  <div>
                    <h3>{user?.name || "User"}</h3>

                    <p className="text-sm text-slate-500">
                      {getRoleLabel(user?.role)}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
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
                type="button"
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

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
  FaCog,
  FaUser,
} from "react-icons/fa";

import NotificationPanel from "./NotificationPanel";

export default function Navbar({ setIsOpen }) {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const {
    isNotificationOpen,
    setIsNotificationOpen,
    unreadCount,
  } = useNotificationStore();

  /*
   * Admin stores
   * These are ONLY used for admin search.
   */
  const { users, fetchUsers } = useUsersStore();
  const {
    projects: adminProjects,
    fetchProjects,
  } = useProjectStore();

  /* ================================
     BASIC STATES
  ================================= */

  const [open, setOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  /* ================================
     MEMBER DATA
  ================================= */

  const [memberProjects, setMemberProjects] =
    useState([]);

  const [memberTasks, setMemberTasks] =
    useState([]);

  const [memberDataLoading, setMemberDataLoading] =
    useState(false);

  const [memberDataError, setMemberDataError] =
    useState("");

  /* ================================
     ROLE
  ================================= */

  const isAdmin =
    user?.role === ROLE.ADMIN;

  const isMember =
    user?.role === ROLE.MEMBER;

  /* ================================
     INITIALS
  ================================= */

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  /* ================================
     PROFILE ROUTE
  ================================= */

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

  /* ================================
     MEMBER PROJECT ROUTE
  ================================= */

  const getMemberProjectRoute = (id) => {
    return `/member/projects/${id}`;
  };

  /* ================================
     MEMBER TASK ROUTE
  ================================= */

  const getMemberTaskRoute = (id) => {
    return `/member/tasks/${id}`;
  };

  /* ================================
     GENERAL ROUTES
  ================================= */

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

  const getTeamRoute = () => {
    switch (user?.role) {
      case ROLE.ADMIN:
        return "/admin/users";

      case ROLE.PROJECT_MANAGER:
        return "/project-manager/team";

      case ROLE.MEMBER:
        return "/member/team";

      default:
        return "/";
    }
  };

  const getSettingsRoute = () => {
    switch (user?.role) {
      case ROLE.ADMIN:
        return "/admin/settings";

      case ROLE.PROJECT_MANAGER:
        return "/project-manager/settings";

      case ROLE.MEMBER:
        return "/member/settings";

      default:
        return "/";
    }
  };

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

  /* ================================
     CLOSE DROPDOWNS
  ================================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }

      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* ================================
     LOAD ADMIN DATA
     
     ONLY ADMIN
  ================================= */

  useEffect(() => {
    if (!isAdmin) return;

    if (users.length === 0) {
      fetchUsers();
    }

    if (adminProjects.length === 0) {
      fetchProjects();
    }
  }, [
    isAdmin,
    users.length,
    adminProjects.length,
    fetchUsers,
    fetchProjects,
  ]);

  /* ================================
     LOAD REAL MEMBER DATA

     MongoDB:
     Projects -> getMyProjects()
     Tasks    -> getMyTasks()

     These APIs use the logged-in
     member's authentication token.
  ================================= */

  useEffect(() => {
    if (!isMember) return;

    let cancelled = false;

    const loadMemberSearchData = async () => {
      try {
        setMemberDataLoading(true);
        setMemberDataError("");

        const [
          projectsResponse,
          tasksResponse,
        ] = await Promise.all([
          getMyProjects(),
          getMyTasks(),
        ]);

        if (cancelled) return;

        /*
         * Your Member Projects page already
         * confirms projects are returned as:
         *
         * response.data.data
         */
        const projectsData =
          projectsResponse?.data?.data || [];

        /*
         * Your backend returns:
         *
         * { success: true, count, data: tasks }
         */
        const tasksData =
          tasksResponse?.data?.data || [];

        setMemberProjects(
          Array.isArray(projectsData)
            ? projectsData
            : []
        );

        setMemberTasks(
          Array.isArray(tasksData)
            ? tasksData
            : []
        );

        console.log(
          "MEMBER SEARCH PROJECTS:",
          projectsData
        );

        console.log(
          "MEMBER SEARCH TASKS:",
          tasksData
        );
      } catch (error) {
        if (cancelled) return;

        console.error(
          "Member search data error:",
          error
        );

        setMemberDataError(
          error?.response?.data?.message ||
            "Failed to load search data"
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

  /* ================================
     LOGOUT
  ================================= */

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  /* ================================
     TODAY
  ================================= */

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "short",
      day: "numeric",
    }
  );

  /* =================================================
     MEMBER PROJECT SEARCH
  ================================================= */

  const filteredMemberProjects = useMemo(() => {
    if (!isMember) return [];

    const query =
      searchQuery.trim().toLowerCase();

    if (!query) return [];

    return memberProjects.filter((project) => {
      const title =
        project?.title || "";

      const description =
        project?.description || "";

      const status =
        project?.status || "";

      return (
        title.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query) ||
        status.toLowerCase().includes(query)
      );
    });
  }, [
    isMember,
    searchQuery,
    memberProjects,
  ]);

  /* =================================================
     MEMBER TASK SEARCH
  ================================================= */

  const filteredMemberTasks = useMemo(() => {
    if (!isMember) return [];

    const query =
      searchQuery.trim().toLowerCase();

    if (!query) return [];

    return memberTasks.filter((task) => {
      const title =
        task?.title || "";

      const description =
        task?.description || "";

      const status =
        task?.status || "";

      const priority =
        task?.priority || "";

      /*
       * Backend populates projectId
       * with the project title.
       */
      const projectTitle =
        typeof task?.projectId === "object"
          ? task?.projectId?.title || ""
          : "";

      return (
        title.toLowerCase().includes(query) ||
        description
          .toLowerCase()
          .includes(query) ||
        status.toLowerCase().includes(query) ||
        priority.toLowerCase().includes(query) ||
        projectTitle
          .toLowerCase()
          .includes(query)
      );
    });
  }, [
    isMember,
    searchQuery,
    memberTasks,
  ]);

  /* =================================================
     ADMIN USER SEARCH
  ================================================= */

  const filteredUsers = useMemo(() => {
    if (!isAdmin) return [];

    const query =
      searchQuery.trim().toLowerCase();

    if (!query) return [];

    return users.filter((u) => {
      const name = u?.name || "";
      const email = u?.email || "";
      const username =
        u?.username || "";

      return (
        name.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query) ||
        username.toLowerCase().includes(query)
      );
    });
  }, [
    isAdmin,
    searchQuery,
    users,
  ]);

  /* =================================================
     ADMIN PROJECT SEARCH
  ================================================= */

  const filteredAdminProjects = useMemo(() => {
    if (!isAdmin) return [];

    const query =
      searchQuery.trim().toLowerCase();

    if (!query) return [];

    return adminProjects.filter((project) => {
      const title =
        project?.title || "";

      const description =
        project?.description || "";

      const status =
        project?.status || "";

      return (
        title.toLowerCase().includes(query) ||
        description
          .toLowerCase()
          .includes(query) ||
        status.toLowerCase().includes(query)
      );
    });
  }, [
    isAdmin,
    searchQuery,
    adminProjects,
  ]);

  /* =================================================
     PAGE SEARCH
  ================================================= */

  const navigationItems = useMemo(() => {
    return [
      {
        id: "dashboard",
        title: "Dashboard",
        description: "Open dashboard",
        icon: FaHome,
        route: getDashboardRoute(),
      },

      {
        id: "projects",
        title: "Projects",
        description: "View projects",
        icon: FaFolder,
        route: getProjectsRoute(),
      },

      {
        id: "tasks",
        title: "Tasks",
        description: "View tasks",
        icon: FaTasks,
        route: getTasksRoute(),
      },

      {
        id: "team",
        title: "Team",
        description: "View team members",
        icon: FaUsers,
        route: getTeamRoute(),
      },

      {
        id: "settings",
        title: "Settings",
        description: "Manage settings",
        icon: FaCog,
        route: getSettingsRoute(),
      },

      {
        id: "profile",
        title: "Profile",
        description: "View your profile",
        icon: FaUser,
        route: getProfileRoute(),
      },

      {
        id: "notifications",
        title: "Notifications",
        description: "View notifications",
        icon: FaBell,
        route: getNotificationsRoute(),
      },
    ];
  }, [user?.role]);

  const filteredNavigation = useMemo(() => {
    const query =
      searchQuery.trim().toLowerCase();

    if (!query) return [];

    return navigationItems.filter((item) => {
      return (
        item.title
          .toLowerCase()
          .includes(query) ||
        item.description
          .toLowerCase()
          .includes(query)
      );
    });
  }, [
    searchQuery,
    navigationItems,
  ]);

  /* ================================
     HAS RESULTS
  ================================= */

  const hasResults =
    filteredNavigation.length > 0 ||
    filteredMemberProjects.length > 0 ||
    filteredMemberTasks.length > 0 ||
    filteredUsers.length > 0 ||
    filteredAdminProjects.length > 0;

  /* ================================
     SEARCH CHANGE
  ================================= */

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearchQuery(value);

    if (value.trim().length > 0) {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  };

  /* ================================
     CLEAR SEARCH
  ================================= */

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  /* ================================
     NAVIGATION CLICK
  ================================= */

  const handleNavigationClick = (route) => {
    clearSearch();
    router.push(route);
  };

  /* ================================
     MEMBER PROJECT CLICK
  ================================= */

  const handleMemberProjectClick = (
    projectId
  ) => {
    clearSearch();

    router.push(
      getMemberProjectRoute(projectId)
    );
  };

  /* ================================
     MEMBER TASK CLICK
  ================================= */

  const handleMemberTaskClick = (taskId) => {
    clearSearch();

    router.push(
      getMemberTaskRoute(taskId)
    );
  };

  /* ================================
     ADMIN USER CLICK
  ================================= */

  const handleUserClick = (userId) => {
    clearSearch();

    router.push(
      `/admin/users/${userId}`
    );
  };

  /* ================================
     ADMIN PROJECT CLICK
  ================================= */

  const handleAdminProjectClick = (
    projectId
  ) => {
    clearSearch();

    router.push(
      `/admin/projects/${projectId}`
    );
  };

  /* ================================
     KEYBOARD
  ================================= */

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      clearSearch();
      return;
    }

    if (e.key === "Enter") {
      /*
       * If exactly one task result exists,
       * open that task.
       */
      if (filteredMemberTasks.length === 1) {
        handleMemberTaskClick(
          filteredMemberTasks[0]._id
        );
        return;
      }

      /*
       * If exactly one project result exists,
       * open that project.
       */
      if (
        filteredMemberProjects.length === 1
      ) {
        handleMemberProjectClick(
          filteredMemberProjects[0]._id
        );
        return;
      }

      /*
       * If exactly one page exists,
       * open that page.
       */
      if (
        filteredNavigation.length === 1
      ) {
        handleNavigationClick(
          filteredNavigation[0].route
        );
      }
    }
  };

  /* ================================
     RENDER
  ================================= */

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8 shadow-sm">

      {/* ============================
          LEFT
      ============================ */}

      <div className="flex items-center gap-4 flex-1">

        {/* MOBILE MENU */}

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white transition hover:bg-slate-100"
        >
          <FaBars className="text-slate-700" />
        </button>

        {/* ============================
            SEARCH
        ============================ */}

        <div
          className="relative flex-1 max-w-md"
          ref={searchInputRef}
        >

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder={
              isMember
                ? "Search your projects and tasks..."
                : "Search..."
            }
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (
                searchQuery.trim().length > 0
              ) {
                setIsSearchOpen(true);
              }
            }}
            className="w-full rounded-lg border border-[#bfc9c1] bg-white py-2 pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#0f5238] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20 transition-all"
          />

          {/* ============================
              RESULTS
          ============================ */}

          {isSearchOpen &&
            searchQuery.trim().length > 0 && (

              <div className="absolute top-full left-0 right-0 mt-2 max-h-[500px] overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl z-50">

                {/* LOADING */}

                {isMember &&
                  memberDataLoading && (
                    <div className="p-5 text-center">

                      <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-[#0f5238]" />

                      <p className="text-sm text-slate-500">
                        Loading your projects and tasks...
                      </p>

                    </div>
                  )}

                {/* ERROR */}

                {isMember &&
                  !memberDataLoading &&
                  memberDataError && (
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

                {!memberDataLoading &&
                  !memberDataError &&
                  !hasResults && (

                    <div className="p-6 text-center">

                      <FaSearch className="mx-auto mb-3 text-2xl text-slate-300" />

                      <p className="text-sm font-medium text-slate-700">
                        No results found
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Try another project or task name.
                      </p>

                    </div>
                  )}

                {/* RESULTS */}

                {!memberDataLoading &&
                  !memberDataError &&
                  hasResults && (

                    <div className="p-2">

                      {/* ======================
                          MEMBER PROJECTS
                      ======================= */}

                      {filteredMemberProjects.length >
                        0 && (

                        <div className="mb-3">

                          <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            My Projects
                          </p>

                          {filteredMemberProjects
                            .slice(0, 5)
                            .map((project) => (

                              <button
                                key={project._id}
                                type="button"
                                onClick={() =>
                                  handleMemberProjectClick(
                                    project._id
                                  )
                                }
                                className="flex w-full items-center gap-3 px-3 py-3 rounded-lg text-left hover:bg-emerald-50 transition-colors"
                              >

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#0f5238]">
                                  <FaFolder />
                                </div>

                                <div className="min-w-0 flex-1">

                                  <p className="truncate text-sm font-medium text-[#181d19]">
                                    {project.title ||
                                      "Untitled Project"}
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

                      {/* ======================
                          MEMBER TASKS
                      ======================= */}

                      {filteredMemberTasks.length >
                        0 && (

                        <div className="mb-3">

                          <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            My Tasks
                          </p>

                          {filteredMemberTasks
                            .slice(0, 7)
                            .map((task) => {

                              const projectTitle =
                                typeof task?.projectId ===
                                "object"
                                  ? task?.projectId?.title
                                  : "";

                              return (
                                <button
                                  key={task._id}
                                  type="button"
                                  onClick={() =>
                                    handleMemberTaskClick(
                                      task._id
                                    )
                                  }
                                  className="flex w-full items-center gap-3 px-3 py-3 rounded-lg text-left hover:bg-emerald-50 transition-colors"
                                >

                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <FaTasks />
                                  </div>

                                  <div className="min-w-0 flex-1">

                                    <p className="truncate text-sm font-medium text-[#181d19]">
                                      {task.title ||
                                        "Untitled Task"}
                                    </p>

                                    <p className="truncate text-xs text-slate-500">
                                      {projectTitle
                                        ? `Project: ${projectTitle}`
                                        : task.description ||
                                          "Assigned task"}
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

                      {/* ======================
                          PAGES
                      ======================= */}

                      {filteredNavigation.length >
                        0 && (

                        <div className="mb-3">

                          <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Pages
                          </p>

                          {filteredNavigation
                            .slice(0, 5)
                            .map((item) => {

                              const Icon =
                                item.icon;

                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() =>
                                    handleNavigationClick(
                                      item.route
                                    )
                                  }
                                  className="flex w-full items-center gap-3 px-3 py-3 rounded-lg text-left hover:bg-emerald-50 transition-colors"
                                >

                                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                                    <Icon />
                                  </div>

                                  <div>

                                    <p className="text-sm font-medium text-[#181d19]">
                                      {item.title}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                      {item.description}
                                    </p>

                                  </div>

                                </button>
                              );
                            })}

                        </div>
                      )}

                      {/* ======================
                          ADMIN USERS
                      ======================= */}

                      {filteredUsers.length >
                        0 && (

                        <div className="mb-3">

                          <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Users
                          </p>

                          {filteredUsers
                            .slice(0, 5)
                            .map((u) => (

                              <button
                                key={u._id}
                                type="button"
                                onClick={() =>
                                  handleUserClick(
                                    u._id
                                  )
                                }
                                className="w-full text-left px-3 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
                              >

                                <p className="text-sm font-medium text-[#181d19]">
                                  {u.name}
                                </p>

                                <p className="text-xs text-slate-500">
                                  {u.email}
                                </p>

                              </button>

                            ))}

                        </div>
                      )}

                      {/* ======================
                          ADMIN PROJECTS
                      ======================= */}

                      {filteredAdminProjects.length >
                        0 && (

                        <div>

                          <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Projects
                          </p>

                          {filteredAdminProjects
                            .slice(0, 5)
                            .map((project) => (

                              <button
                                key={project._id}
                                type="button"
                                onClick={() =>
                                  handleAdminProjectClick(
                                    project._id
                                  )
                                }
                                className="w-full text-left px-3 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
                              >

                                <p className="text-sm font-medium text-[#181d19]">
                                  {project.title}
                                </p>

                                {project.description && (
                                  <p className="truncate text-xs text-slate-500">
                                    {
                                      project.description
                                    }
                                  </p>
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

      {/* ============================
          RIGHT
      ============================ */}

      <div className="flex items-center gap-2 md:gap-5">

        {/* DATE */}

        <div className="hidden text-right md:block">

          <p className="text-sm font-medium text-slate-700">
            {today}
          </p>

        </div>

        {/* NOTIFICATIONS */}

        <div className="relative">

          <button
            type="button"
            onClick={() =>
              setIsNotificationOpen(
                !isNotificationOpen
              )
            }
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

        <div
          className="relative"
          ref={dropdownRef}
        >

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 md:px-3 py-2 transition hover:bg-slate-50"
          >

            <div className="hidden text-right lg:block">

              <p className="text-[#181d19]">
                {user?.name || "Member"}
              </p>

              <p className="text-xs capitalize text-slate-500">
                {user?.role?.replaceAll(
                  "_",
                  " "
                ) || "Member"}
              </p>

            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0f5238] text-white">
              {initials}
            </div>

            <FaChevronDown
              className={`text-sm text-slate-500 transition ${
                open
                  ? "rotate-180"
                  : ""
              }`}
            />

          </button>

          {/* PROFILE MENU */}

          {open && (

            <div className="absolute right-0 mt-3 w-56 sm:w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

              <div className="border-b bg-slate-50 p-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f5238] text-white">
                    {initials}
                  </div>

                  <div>

                    <h3>
                      {user?.name ||
                        "Member"}
                    </h3>

                    <p className="text-sm capitalize text-slate-500">
                      {user?.role?.replaceAll(
                        "_",
                        " "
                      ) ||
                        "Member"}
                    </p>

                  </div>

                </div>

              </div>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  router.push(
                    getProfileRoute()
                  );
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
};
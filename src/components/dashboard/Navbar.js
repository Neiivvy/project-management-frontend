"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import useAuthStore from "@/store/useAuthStore";
import useNotificationStore from "@/store/admin/useNotificationStore";
import useUsersStore from "@/store/admin/useUsersStore";
import useProjectStore from "@/store/admin/useProjectStore";

import { getMyProjects } from "@/api/projects";
import { getMyTasks } from "@/api/tasks";
import { getTasks } from "@/api/taskApi";

import { ROLE } from "@/constants/roles";

import {
  FaSearch,
  FaBell,
  FaChevronDown,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaFolder,
  FaTasks,
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
     ADMIN STORES
     ADMIN SEARCH REMAINS UNCHANGED
  ===================================================== */

  const { users, fetchUsers } = useUsersStore();

  const { projects: adminProjects, fetchProjects } = useProjectStore();

  /* =====================================================
     STATES
  ===================================================== */

  const [open, setOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  /*
   * MEMBER DATA
   */

  const [memberProjects, setMemberProjects] = useState([]);

  const [memberTasks, setMemberTasks] = useState([]);

  const [memberDataLoading, setMemberDataLoading] = useState(false);

  const [memberDataError, setMemberDataError] = useState("");

  /*
   * PM DATA
   */

  const [pmProjects, setPmProjects] = useState([]);

  const [pmTasks, setPmTasks] = useState([]);

  const [pmDataLoading, setPmDataLoading] = useState(false);

  const [pmDataError, setPmDataError] = useState("");

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
     ADMIN LOAD USERS
     ADMIN ONLY
  ===================================================== */

  useEffect(() => {
    if (!isAdmin) return;

    if (users.length > 0) return;

    fetchUsers();
  }, [isAdmin, users.length, fetchUsers]);

  /* =====================================================
     ADMIN LOAD PROJECTS
     ADMIN ONLY
  ===================================================== */

  useEffect(() => {
    if (!isAdmin) return;

    if (adminProjects.length > 0) return;

    fetchProjects();
  }, [isAdmin, adminProjects.length, fetchProjects]);

  /* =====================================================
     LOAD MEMBER PROJECTS + TASKS
     MEMBER ONLY
  ===================================================== */

  useEffect(() => {
    if (!isMember) return;

    let cancelled = false;

    const loadMemberData = async () => {
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

        console.error("Member navbar search error:", error);

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

    loadMemberData();

    return () => {
      cancelled = true;
    };
  }, [isMember]);

  /* =====================================================
     LOAD PM PROJECTS + TASKS

     IMPORTANT:
     getMyProjects() = PM projects

     getTasks() = all tasks returned based on PM permission

     Then filter tasks by PM project IDs.
  ===================================================== */

  useEffect(() => {
    if (!isProjectManager) return;

    let cancelled = false;

    const loadPmData = async () => {
      try {
        setPmDataLoading(true);

        setPmDataError("");

        const [projectsResponse, tasksData] = await Promise.all([
          getMyProjects(),
          getTasks(),
        ]);

        if (cancelled) return;

        const projects = projectsResponse?.data?.data || [];

        const allTasks = Array.isArray(tasksData) ? tasksData : [];

        /*
         * Get IDs of projects owned by
         * the logged-in PM.
         */

        const pmProjectIds = projects.map((project) => String(project._id));

        /*
         * Keep only tasks whose projectId
         * belongs to one of PM's projects.
         */

        const filteredTasks = allTasks.filter((task) => {
          const taskProjectId =
            typeof task?.projectId === "object"
              ? task?.projectId?._id
              : task?.projectId;

          return pmProjectIds.includes(String(taskProjectId));
        });

        console.log("PM Projects:", projects);

        console.log("All PM Accessible Tasks:", allTasks);

        console.log("Filtered PM Tasks:", filteredTasks);

        setPmProjects(Array.isArray(projects) ? projects : []);

        setPmTasks(filteredTasks);
      } catch (error) {
        if (cancelled) return;

        console.error("PM navbar search error:", error);

        setPmDataError(
          error?.response?.data?.message || "Failed to load PM search data",
        );

        setPmProjects([]);

        setPmTasks([]);
      } finally {
        if (!cancelled) {
          setPmDataLoading(false);
        }
      }
    };

    loadPmData();

    return () => {
      cancelled = true;
    };
  }, [isProjectManager]);

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
     PM PROJECT SEARCH
  ===================================================== */

  const filteredPmProjects = useMemo(() => {
    if (!isProjectManager) return [];

    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    return pmProjects.filter((project) => {
      const title = String(project?.title || "").toLowerCase();

      const description = String(project?.description || "").toLowerCase();

      const status = String(project?.status || "").toLowerCase();

      return (
        title.includes(query) ||
        description.includes(query) ||
        status.includes(query)
      );
    });
  }, [isProjectManager, searchQuery, pmProjects]);

  /* =====================================================
     PM TASK SEARCH

     Searches:
     - task title
     - description
     - status
     - priority
     - project title
  ===================================================== */

  const filteredPmTasks = useMemo(() => {
    if (!isProjectManager) return [];

    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    return pmTasks.filter((task) => {
      const title = String(task?.title || "").toLowerCase();

      const description = String(task?.description || "").toLowerCase();

      const status = String(task?.status || "").toLowerCase();

      const priority = String(task?.priority || "").toLowerCase();

      let projectTitle = "";

      /*
       * If projectId is populated
       */

      if (typeof task?.projectId === "object") {
        projectTitle = String(task?.projectId?.title || "").toLowerCase();
      }

      /*
       * If projectId is only an ID,
       * find project from PM projects.
       */

      if (!projectTitle && task?.projectId) {
        const projectId =
          typeof task.projectId === "object"
            ? task.projectId?._id
            : task.projectId;

        const project = pmProjects.find(
          (p) => String(p._id) === String(projectId),
        );

        projectTitle = String(project?.title || "").toLowerCase();
      }

      return (
        title.includes(query) ||
        description.includes(query) ||
        status.includes(query) ||
        priority.includes(query) ||
        projectTitle.includes(query)
      );
    });
  }, [isProjectManager, searchQuery, pmTasks, pmProjects]);

  /* =====================================================
     ADMIN USER SEARCH
     ADMIN ONLY
  ===================================================== */

  const filteredUsers = useMemo(() => {
    if (!isAdmin) return [];

    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    return users.filter((u) => {
      const name = String(u?.name || "").toLowerCase();

      const email = String(u?.email || "").toLowerCase();

      const username = String(u?.username || "").toLowerCase();

      const role = String(u?.role || "")
        .replaceAll("_", " ")
        .toLowerCase();

      return (
        name.includes(query) ||
        email.includes(query) ||
        username.includes(query) ||
        role.includes(query)
      );
    });
  }, [isAdmin, searchQuery, users]);

  /* =====================================================
     ADMIN PROJECT SEARCH
     ADMIN ONLY
  ===================================================== */

  const filteredAdminProjects = useMemo(() => {
    if (!isAdmin) return [];

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
  }, [isAdmin, searchQuery, adminProjects]);

  /* =====================================================
     RESULTS
  ===================================================== */

  const hasResults =
    filteredUsers.length > 0 ||
    filteredAdminProjects.length > 0 ||
    filteredMemberProjects.length > 0 ||
    filteredMemberTasks.length > 0 ||
    filteredPmProjects.length > 0 ||
    filteredPmTasks.length > 0;

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
     PROJECT CLICK
  ===================================================== */

  const handleProjectClick = (id) => {
    clearSearch();

    if (isAdmin) {
      router.push(`/admin/projects/${id}`);
      return;
    }

    if (isProjectManager) {
      router.push(`/project-manager/projects/${id}`);
      return;
    }

    if (isMember) {
      router.push(`/member/projects/${id}`);
    }
  };

  /* =====================================================
     TASK CLICK
  ===================================================== */

  const handleTaskClick = (id) => {
    clearSearch();

    if (isProjectManager) {
      router.push(`/project-manager/tasks/${id}`);
      return;
    }

    if (isMember) {
      router.push(`/member/tasks/${id}`);
    }
  };

  /* =====================================================
     USER CLICK
     ADMIN ONLY
  ===================================================== */

  const handleUserClick = (id) => {
    clearSearch();

    router.push(`/admin/users/${id}`);
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

    if (filteredUsers.length === 1) {
      handleUserClick(filteredUsers[0]._id);

      return;
    }

    if (filteredAdminProjects.length === 1) {
      handleProjectClick(filteredAdminProjects[0]._id);

      return;
    }

    if (filteredPmProjects.length === 1) {
      handleProjectClick(filteredPmProjects[0]._id);

      return;
    }

    if (filteredPmTasks.length === 1) {
      handleTaskClick(filteredPmTasks[0]._id);

      return;
    }

    if (filteredMemberProjects.length === 1) {
      handleProjectClick(filteredMemberProjects[0]._id);

      return;
    }

    if (filteredMemberTasks.length === 1) {
      handleTaskClick(filteredMemberTasks[0]._id);
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
     SEARCH PLACEHOLDER
  ===================================================== */

  const searchPlaceholder = isAdmin
    ? "Search users and projects..."
    : isProjectManager
      ? "Search your projects and tasks..."
      : "Search your projects and tasks...";

  /* =====================================================
     LOADING
  ===================================================== */

  const isLoading =
    (isMember && memberDataLoading) || (isProjectManager && pmDataLoading);

  const error = isMember
    ? memberDataError
    : isProjectManager
      ? pmDataError
      : "";

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-8">
      {/* ================= LEFT ================= */}

      <div className="flex flex-1 items-center gap-4">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white transition hover:bg-slate-100 md:hidden"
        >
          <FaBars className="text-slate-700" />
        </button>

        {/* ================= SEARCH ================= */}

        <div className="relative max-w-md flex-1" ref={searchInputRef}>
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder={searchPlaceholder}
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
              {/* ================= LOADING ================= */}

              {isLoading && (
                <div className="p-5 text-center">
                  <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-[#0f5238]" />

                  <p className="text-sm text-slate-500">
                    Loading search data...
                  </p>
                </div>
              )}

              {/* ================= ERROR ================= */}

              {!isLoading && error && (
                <div className="p-5 text-center">
                  <p className="text-sm font-medium text-red-600">
                    Unable to load search data
                  </p>

                  <p className="mt-1 text-xs text-slate-500">{error}</p>
                </div>
              )}

              {/* ================= NO RESULTS ================= */}

              {!isLoading && !error && !hasResults && (
                <div className="p-6 text-center">
                  <FaSearch className="mx-auto mb-3 text-2xl text-slate-300" />

                  <p className="text-sm font-medium text-slate-700">
                    No results found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try another project or task.
                  </p>
                </div>
              )}

              {/* ================= RESULTS ================= */}

              {!isLoading && !error && hasResults && (
                <div className="p-2">
                  {/* =====================================
                          ADMIN USERS
                      ===================================== */}

                  {isAdmin && filteredUsers.length > 0 && (
                    <div className="mb-3">
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Users
                      </p>

                      {filteredUsers.slice(0, 7).map((u) => (
                        <button
                          key={u._id}
                          type="button"
                          onClick={() => handleUserClick(u._id)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-emerald-50"
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
                        </button>
                      ))}
                    </div>
                  )}

                  {/* =====================================
                          ADMIN PROJECTS
                      ===================================== */}

                  {isAdmin && filteredAdminProjects.length > 0 && (
                    <div>
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Projects
                      </p>

                      {filteredAdminProjects.slice(0, 7).map((project) => (
                        <button
                          key={project._id}
                          type="button"
                          onClick={() => handleProjectClick(project._id)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-emerald-50"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0f5238]">
                            <FaFolder />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {project.title}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                              {project.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* =====================================
                          PM PROJECTS
                          ONLY PM PROJECT LIST
                      ===================================== */}

                  {isProjectManager && filteredPmProjects.length > 0 && (
                    <div className="mb-3">
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        My Projects
                      </p>

                      {filteredPmProjects.slice(0, 7).map((project) => (
                        <button
                          key={project._id}
                          type="button"
                          onClick={() => handleProjectClick(project._id)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-emerald-50"
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
                                "Project"}
                            </p>
                          </div>

                          {project.status && (
                            <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[10px] capitalize text-slate-500">
                              {project.status}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* =====================================
                          PM TASKS
                          ONLY TASKS OF PM PROJECTS
                      ===================================== */}

                  {isProjectManager && filteredPmTasks.length > 0 && (
                    <div>
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        My Tasks
                      </p>

                      {filteredPmTasks.slice(0, 7).map((task) => {
                        const projectId =
                          typeof task?.projectId === "object"
                            ? task?.projectId?._id
                            : task?.projectId;

                        const project = pmProjects.find(
                          (p) => String(p._id) === String(projectId),
                        );

                        const projectTitle =
                          typeof task?.projectId === "object"
                            ? task?.projectId?.title || project?.title
                            : project?.title;

                        return (
                          <button
                            key={task._id}
                            type="button"
                            onClick={() => handleTaskClick(task._id)}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-emerald-50"
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
                                  : task.description || "Task"}
                              </p>
                            </div>

                            {task.status && (
                              <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[10px] capitalize text-slate-500">
                                {task.status}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* =====================================
                          MEMBER PROJECTS
                      ===================================== */}

                  {isMember && filteredMemberProjects.length > 0 && (
                    <div className="mb-3">
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        My Projects
                      </p>

                      {filteredMemberProjects.slice(0, 5).map((project) => (
                        <button
                          key={project._id}
                          type="button"
                          onClick={() => handleProjectClick(project._id)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-emerald-50"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#0f5238]">
                            <FaFolder />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {project.title}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                              {project.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* =====================================
                          MEMBER TASKS
                      ===================================== */}

                  {isMember && filteredMemberTasks.length > 0 && (
                    <div>
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        My Tasks
                      </p>

                      {filteredMemberTasks.slice(0, 7).map((task) => (
                        <button
                          key={task._id}
                          type="button"
                          onClick={() => handleTaskClick(task._id)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-emerald-50"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <FaTasks />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {task.title}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                              {task.description}
                            </p>
                          </div>
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

      {/* ================= RIGHT ================= */}

      <div className="flex items-center gap-2 md:gap-5">
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

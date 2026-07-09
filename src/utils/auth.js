import { ROLE } from "@/constants/roles";

export const getDashboardRoute = (role) => {
  switch (role) {
    case ROLE.ADMIN:
      return "/admin";

    case ROLE.PROJECT_MANAGER:
      return "/project-manager";

    case ROLE.MEMBER:
    default:
      return "/member";
  }
};

export const getPanelTitle = (role) => {
  switch (role) {
    case ROLE.ADMIN:
      return "Admin Panel";

    case ROLE.PROJECT_MANAGER:
      return "Project Manager Panel";

    case ROLE.MEMBER:
    default:
      return "Member Panel";
  }
};

export const getSidebarItems = (role) => {
  switch (role) {
    case ROLE.ADMIN:
      return [
        { label: "Dashboard", route: "/admin" },
        { label: "Users", route: "/admin/users" },
        { label: "Projects", route: "/admin/projects" },
        { label: "Settings", route: "/admin/settings" },
      ];

    case ROLE.PROJECT_MANAGER:
      return [
        { label: "Dashboard", route: "/project-manager" },
        { label: "Projects", route: "/project-manager/projects" },
        { label: "Tasks", route: "/project-manager/tasks" },
        { label: "Team", route: "/project-manager/team" },
        { label: "Reports", route: "/project-manager/reports" },
        { label: "Settings", route: "/project-manager/settings" },
      ];

    case ROLE.MEMBER:
    default:
      return [
        { label: "Dashboard", route: "/member" },
        { label: "Projects", route: "/member/projects" },
        { label: "Tasks", route: "/member/tasks" },
        { label: "Team", route: "/member/team" },
        { label: "Settings", route: "/member/settings" },
      ];
  }
};
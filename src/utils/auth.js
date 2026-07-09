import { ROLE } from "@/constants/roles";
import {
  FaHome,
  FaFolderOpen,
  FaTasks,
  FaUsers,
  FaUserFriends,
  FaChartLine,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

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
        { label: "Dashboard", route: "/admin", icon: <FaHome /> },
        { label: "Users", route: "/admin/users", icon: <FaUsers /> },
        { label: "Projects", route: "/admin/projects", icon: <FaFolderOpen /> },
        { label: "Settings", route: "/admin/settings", icon: <FaCog /> },
      ];

    case ROLE.PROJECT_MANAGER:
      return [
        { label: "Dashboard", route: "/project-manager", icon: <FaHome /> },
        {
          label: "Projects",
          route: "/project-manager/projects",
          icon: <FaFolderOpen />,
        },
        { label: "Tasks", route: "/project-manager/task", icon: <FaTasks /> },
        { label: "Team", route: "/project-manager/team", icon: <FaUsers /> },
        {
          label: "Members",
          route: "/project-manager/members",
          icon: <FaUserFriends />,
        },
        {
          label: "Task Progress",
          route: "/project-manager/progress",
          icon: <FaChartLine />,
        },
        {
          label: "Reports",
          route: "/project-manager/report",
          icon: <FaChartBar />,
        },
      ];

    case ROLE.MEMBER:
    default:
      return [
        { label: "Dashboard", route: "/member", icon: <FaHome /> },
        {
          label: "Projects",
          route: "/member/projects",
          icon: <FaFolderOpen />,
        },
        { label: "Tasks", route: "/member/tasks", icon: <FaTasks /> },
        { label: "Team", route: "/member/team", icon: <FaUsers /> },
        { label: "Settings", route: "/member/settings", icon: <FaCog /> },
      ];
  }
};

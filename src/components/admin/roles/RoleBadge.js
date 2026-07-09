import React from "react";
import { ROLE } from "@/constants/roles";

const ROLE_LABELS = {
  [ROLE.ADMIN]: "Admin",
  [ROLE.PROJECT_MANAGER]: "Project Manager",
  [ROLE.MEMBER]: "Team Member",
};

const RoleBadge = ({ role }) => {
  const isPM = role === ROLE.PROJECT_MANAGER;
  const isAdmin = role === ROLE.ADMIN;

  const styles = isPM
    ? "bg-[#40916c]/10 text-[#0f5238] border border-[#40916c]/30"
    : isAdmin
    ? "bg-gray-900/5 text-gray-900 border border-gray-300"
    : "bg-gray-100 text-gray-600 border border-gray-200";

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles}`}>
      {ROLE_LABELS[role] || role}
    </span>
  );
};

export default RoleBadge;
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
    ? "bg-gradient-to-r from-[#0f5238] to-[#1a6b4a] text-white border border-[#0f5238]/30 shadow-sm"
    : isAdmin
    ? "bg-gradient-to-r from-[#1e293b] to-[#334155] text-white border border-[#1e293b]/30 shadow-sm"
    : "bg-gradient-to-r from-[#40916c]/20 to-[#d9efe4] text-[#0f5238] border border-[#40916c]/30";

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 hover:shadow-md ${styles}`}>
      {isPM && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
        </svg>
      )}
      {isAdmin && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
        </svg>
      )}
      {!isPM && !isAdmin && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      )}
      {ROLE_LABELS[role] || role}
    </span>
  );
};

export default RoleBadge;
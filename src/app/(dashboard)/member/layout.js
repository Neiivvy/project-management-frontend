"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { ROLE } from "@/constants/roles";

export default function MemberLayout({ children }) {
  return (
    <ProtectedRoute
      allowedRoles={[
        ROLE.MEMBER
      ]}
    >
      {children}
    </ProtectedRoute>
  );
}
"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { ROLE } from "@/constants/roles";

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={[ROLE.ADMIN]}>{children}</ProtectedRoute>
  );
}

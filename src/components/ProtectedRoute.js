"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  useEffect(() => {
    // If user is logged in but does not have permission
    if (
      isAuthenticated &&
      user &&
      allowedRoles.length > 0 &&
      !allowedRoles.includes(user.role)
    ) {
      router.replace("/forbidden");
    }
  }, [
    user,
    isAuthenticated,
    allowedRoles,
    router,
  ]);


  // While checking authentication / loading user data
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">
          Loading...
        </p>
      </div>
    );
  }


  // Stop rendering the protected page
  // while redirecting to forbidden
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return null;
  }


  return children;
}
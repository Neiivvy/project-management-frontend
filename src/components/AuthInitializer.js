"use client";

import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";

export default function AuthInitializer() {
  const refreshUser = useAuthStore((state) => state.refreshUser);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return null;
}
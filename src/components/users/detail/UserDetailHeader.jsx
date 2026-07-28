"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import RoleBadge from "@/components/users/RoleBadge";

export default function UserDetailHeader({ user, onBack }) {
  const router = useRouter();

  if (!user) return null;

  const handleBack = () => {
    if (onBack) onBack();
    else router.back();
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#d0e8dc] bg-linear-to-br from-white to-[#f0faf4] p-5 shadow-[0_1px_3px_rgba(16,24,20,0.06)] sm:p-6">
      <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-[#0f5238] to-[#40916c]" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Left: Back + Title */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleBack}
            className="group inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[#375948]
                       transition-colors duration-200 hover:text-[#1d6d45]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to Users
          </button>

          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-[#05110a] sm:text-3xl">
              {user.name}
            </h1>
            <p className="text-sm text-[#66756e]">{user.email}</p>
          </div>
        </div>

        {/* Quick Info Strip */}
        <div className="flex flex-wrap gap-3">
          <RoleBadge role={user.role} />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e7f5ee] px-3 py-1.5 text-xs font-medium text-[#1a7a4c]">
            Joined{" "}
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}
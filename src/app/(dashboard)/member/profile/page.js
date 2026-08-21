"use client";

import {
  FaUser,
  FaEnvelope,
  FaAt,
  FaBriefcase,
  FaShieldAlt,
} from "react-icons/fa";

import useAuthStore from "@/store/useAuthStore";

export default function MemberProfilePage() {
  const user = useAuthStore((state) => state.user);

  const name = user?.name || "Member";
  const email = user?.email || "member@test.com";
  const role = user?.role || "Member";
  const username = user?.username || "member";
  const department = user?.department || "Development";

  const initials =
    name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "M";

  const formattedRole = role
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <main className="min-h-screen bg-[#f5f8f6] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#123d2b]">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-[#dce8e1] bg-white shadow-sm">

          {/* Green Header */}
          <div className="h-32 bg-[#0f5238]" />

          {/* Profile Information */}
          <div className="px-6 pb-7 md:px-8">

            <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end">

              {/* Avatar */}
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#176b4b] text-3xl font-bold text-white shadow-md">
                {initials}
              </div>

              {/* Name */}
              <div className="pb-2">
                <h2 className="text-2xl font-bold text-[#173e2c]">
                  {name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {formattedRole}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />

                  <span className="text-sm font-medium text-green-600">
                    Active
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mt-6 rounded-2xl border border-[#dce8e1] bg-white p-6 shadow-sm md:p-8">

          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#173e2c]">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your basic account information
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">

            {/* Full Name */}
            <InfoItem
              icon={<FaUser />}
              label="Full Name"
              value={name}
            />

            {/* Email */}
            <InfoItem
              icon={<FaEnvelope />}
              label="Email Address"
              value={email}
            />

            {/* Username */}
            <InfoItem
              icon={<FaAt />}
              label="Username"
              value={`@${username}`}
            />

            {/* Department */}
            <InfoItem
              icon={<FaBriefcase />}
              label="Department"
              value={department}
            />

            {/* Role */}
            <InfoItem
              icon={<FaShieldAlt />}
              label="Role"
              value={formattedRole}
            />

          </div>
        </div>

        {/* Account Status */}
        <div className="mt-6 rounded-2xl border border-[#dce8e1] bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-[#173e2c]">
            Account Status
          </h2>

          <div className="mt-5 flex items-center justify-between rounded-xl bg-[#f0f8f3] px-5 py-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d9f0e2] text-[#176b4b]">
                <FaShieldAlt />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#173e2c]">
                  Account
                </p>

                <p className="text-xs text-slate-500">
                  Your account is currently active
                </p>
              </div>

            </div>

            <span className="rounded-full bg-[#d9f0e2] px-4 py-1.5 text-xs font-semibold text-[#176b4b]">
              Active
            </span>

          </div>
        </div>

      </div>
    </main>
  );
}


/* ============================================================
   INFORMATION ITEM
============================================================ */

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#e1ebe5] bg-[#fafcfb] p-4 transition hover:border-[#b8d8c5]">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#e4f3ea] text-[#176b4b]">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold text-[#173e2c]">
          {value}
        </p>

      </div>

    </div>
  );
}
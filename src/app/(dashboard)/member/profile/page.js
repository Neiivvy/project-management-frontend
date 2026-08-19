"use client";

import useAuthStore from "@/store/useAuthStore";

export default function MemberProfilePage() {
  const user = useAuthStore((state) => state.user);

  const name = user?.name || "Member";
  const email = user?.email || "member@test.com";
  const role = user?.role || "Member";
  const username = user?.username || "member";
  const department = user?.department || "Development";

  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e6f7ed] via-[#f7fcf8] to-[#d8f0e2] p-5 md:p-8">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0d5c40] text-xl text-white shadow-lg">
              👤
            </div>

            <div>
              <h1 className="text-3xl font-bold text-[#123d2b]">
                My Profile
              </h1>

              <p className="mt-1 text-sm text-[#718077]">
                You can view your account information here
              </p>
            </div>

          </div>
        </div>

        {/* PROFILE CARD */}
        <div className="overflow-hidden rounded-[28px] border border-[#c8e1d1] bg-white shadow-[0_20px_50px_rgba(20,91,60,0.12)]">

          {/* COVER */}
          <div className="relative h-40 overflow-hidden bg-gradient-to-r from-[#073d2b] via-[#0d5c40] to-[#2d8060]">

            {/* Decorative circles */}
            <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[35px] border-white/5" />

            <div className="absolute right-40 top-8 h-28 w-28 rounded-full bg-[#91d6aa]/10" />

            <div className="absolute -bottom-24 left-1/3 h-52 w-52 rounded-full border-[25px] border-white/5" />

            {/* Dots */}
            <div className="absolute right-10 bottom-8 flex gap-2">
              <span className="h-2 w-2 rounded-full bg-[#a8dfba]/50" />
              <span className="h-2 w-2 rounded-full bg-[#a8dfba]/30" />
              <span className="h-2 w-2 rounded-full bg-[#a8dfba]/20" />
            </div>

            {/* Cover text */}
            <div className="absolute left-7 top-7">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#b6d8c3]">
                Member Account
              </p>
            </div>

          </div>

          {/* PROFILE INFO */}
          <div className="px-6 pb-7 md:px-9">

            <div className="-mt-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

              {/* USER */}
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">

                {/* AVATAR */}
                <div className="relative">

                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-[6px] border-white bg-gradient-to-br from-[#08734c] via-[#0d5c40] to-[#174b38] text-4xl font-bold text-white shadow-[0_12px_30px_rgba(13,92,64,0.35)]">
                    {initials}
                  </div>

                  {/* Online dot */}
                  <span className="absolute bottom-3 right-3 h-6 w-6 rounded-full border-4 border-white bg-[#22a05a]" />

                </div>

                {/* NAME */}
                <div className="pb-2">

                  <h2 className="text-2xl font-bold text-[#123d2b]">
                    {name}
                  </h2>

                  <p className="mt-1 text-sm text-[#718077]">
                    {role}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">

                    <span className="rounded-full bg-[#e3f5ea] px-3 py-1 text-xs font-semibold text-[#17623f]">
                      ● Active
                    </span>

                    <span className="rounded-full bg-[#edf3ff] px-3 py-1 text-xs font-semibold text-[#4169a1]">
                      {department}
                    </span>

                  </div>

                </div>

              </div>

              {/* ROLE */}
              <div className="rounded-2xl border border-[#c8e5d2] bg-gradient-to-br from-[#effaf3] to-[#e2f5e9] px-6 py-4 shadow-sm">

                <p className="text-xs uppercase tracking-wide text-[#718077]">
                  Account Role
                </p>

                <p className="mt-1 text-lg font-bold text-[#126044]">
                  {role}
                </p>

              </div>

            </div>

          </div>
        </div>

        {/* PERSONAL INFORMATION */}
        <div className="mt-8 rounded-[25px] border border-[#d2e6d9] bg-white p-6 shadow-[0_12px_35px_rgba(45,106,79,0.08)] md:p-8">

          {/* TITLE */}
          <div className="mb-7 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dff5e7] to-[#ccebd8] text-xl shadow-sm">
                👤
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#173e2c]">
                  Personal Information
                </h2>

                <p className="text-xs text-[#718077]">
                  Your basic member information
                </p>
              </div>

            </div>

            <div className="hidden rounded-full bg-[#edf8f1] px-3 py-1 text-xs font-medium text-[#27704f] sm:block">
              Member
            </div>

          </div>

          {/* INFORMATION CARDS */}
          <div className="grid gap-5 md:grid-cols-2">

            {/* NAME */}
            <div className="group relative overflow-hidden rounded-2xl border border-[#dcece2] bg-gradient-to-br from-[#f7fcf9] to-[#edf8f1] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#a9d5b8] hover:shadow-[0_10px_25px_rgba(45,106,79,0.10)]">

              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#b7dfc5]/20" />

              <div className="relative flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#d9f0e2] text-lg text-[#17623f]">
                  👤
                </div>

                <div className="min-w-0">

                  <p className="text-xs font-semibold uppercase tracking-wider text-[#718077]">
                    Full Name
                  </p>

                  <p className="mt-1 truncate text-base font-bold text-[#173e2c]">
                    {name}
                  </p>

                </div>

              </div>

            </div>

            {/* EMAIL */}
            <div className="group relative overflow-hidden rounded-2xl border border-[#dcece2] bg-gradient-to-br from-[#f7fcf9] to-[#edf8f1] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#a9d5b8] hover:shadow-[0_10px_25px_rgba(45,106,79,0.10)]">

              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#b7dfc5]/20" />

              <div className="relative flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e4efff] text-lg text-[#42699d]">
                  ✉
                </div>

                <div className="min-w-0">

                  <p className="text-xs font-semibold uppercase tracking-wider text-[#718077]">
                    Email
                  </p>

                  <p className="mt-1 break-all text-base font-bold text-[#173e2c]">
                    {email}
                  </p>

                </div>

              </div>

            </div>

            {/* USERNAME */}
            <div className="group relative overflow-hidden rounded-2xl border border-[#dcece2] bg-gradient-to-br from-[#f7fcf9] to-[#edf8f1] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#a9d5b8] hover:shadow-[0_10px_25px_rgba(45,106,79,0.10)]">

              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#b7dfc5]/20" />

              <div className="relative flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0e8ff] text-lg font-bold text-[#7951a8]">
                  @
                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-[#718077]">
                    Username
                  </p>

                  <p className="mt-1 text-base font-bold text-[#173e2c]">
                    {username}
                  </p>

                </div>

              </div>

            </div>

            {/* DEPARTMENT */}
            <div className="group relative overflow-hidden rounded-2xl border border-[#dcece2] bg-gradient-to-br from-[#f7fcf9] to-[#edf8f1] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#a9d5b8] hover:shadow-[0_10px_25px_rgba(45,106,79,0.10)]">

              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#b7dfc5]/20" />

              <div className="relative flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff0dc] text-lg text-[#bd7c2b]">
                  💼
                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-[#718077]">
                    Department
                  </p>

                  <p className="mt-1 text-base font-bold text-[#173e2c]">
                    {department}
                  </p>

                </div>

              </div>

            </div>

          </div>
        </div>

        {/* ACCOUNT INFORMATION */}
        <div className="mt-8 rounded-[25px] border border-[#d2e6d9] bg-white p-6 shadow-[0_12px_35px_rgba(45,106,79,0.08)] md:p-8">

          <div className="mb-6 flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dff5e7] to-[#ccebd8] text-xl">
              ⚙️
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#173e2c]">
                Account Information
              </h2>

              <p className="text-xs text-[#718077]">
                Your account details
              </p>
            </div>

          </div>

          <div className="overflow-hidden rounded-2xl border border-[#dcece2]">

            {/* ROLE */}
            <div className="flex items-center justify-between gap-4 bg-gradient-to-r from-[#f5fbf7] to-[#edf8f1] px-5 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#dff2e7] text-[#17623f]">
                  ✓
                </div>

                <span className="text-sm font-medium text-[#718077]">
                  Account Role
                </span>

              </div>

              <span className="rounded-full bg-[#dff3e7] px-4 py-1.5 text-xs font-bold text-[#17623f]">
                {role}
              </span>

            </div>

            {/* USERNAME */}
            <div className="flex items-center justify-between gap-4 border-t border-[#e1ece5] bg-white px-5 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0e8ff] font-bold text-[#7951a8]">
                  @
                </div>

                <span className="text-sm font-medium text-[#718077]">
                  Username
                </span>

              </div>

              <span className="text-sm font-bold text-[#173e2c]">
                {username}
              </span>

            </div>

            {/* EMAIL */}
            <div className="flex items-center justify-between gap-4 border-t border-[#e1ece5] bg-gradient-to-r from-[#f5fbf7] to-[#edf8f1] px-5 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e4efff] text-[#42699d]">
                  ✉
                </div>

                <span className="text-sm font-medium text-[#718077]">
                  Email
                </span>

              </div>

              <span className="max-w-[60%] break-all text-right text-sm font-bold text-[#173e2c]">
                {email}
              </span>

            </div>

          </div>
        </div>

        {/* BOTTOM SPACE */}
        <div className="h-8" />

      </div>
    </main>
  );
}
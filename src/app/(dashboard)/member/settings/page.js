"use client";

import useAuthStore from "@/store/useAuthStore";

export default function MemberSettingsPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <main className="min-h-screen bg-[#eaf7ef] p-8">

      <div className="max-w-xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#123524]">
            Settings
          </h1>

          <p className="text-sm text-[#527565] mt-2">
            view your profile information and account 
          </p>
        </div>

        {/* Settings Card */}
        <div
          className="
            bg-[#f4fbf6]
            rounded-3xl
            border
            border-[#c7e3d1]
            shadow-[0_5px_20px_rgba(30,90,55,0.08)]
            p-7
          "
        >

          {/* Card Header */}
          <div className="mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#123524]">
                Profile
              </h2>

              <p className="text-sm text-[#668273] mt-1">
                Your account information
              </p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-4">

            {/* Name */}
            <div className="bg-[#eaf7ef] border border-[#d5e9dc] rounded-xl p-4">
              <label className="text-xs font-semibold text-[#668273] uppercase tracking-wide">
                Name
              </label>

              <p className="text-[#123524] font-semibold mt-1">
                {user?.name || "—"}
              </p>
            </div>

            {/* Email */}
            <div className="bg-[#eaf7ef] border border-[#d5e9dc] rounded-xl p-4">
              <label className="text-xs font-semibold text-[#668273] uppercase tracking-wide">
                Email
              </label>

              <p className="text-[#123524] font-semibold mt-1">
                {user?.email || "—"}
              </p>
            </div>

            {/* Role */}
            <div className="bg-[#eaf7ef] border border-[#d5e9dc] rounded-xl p-4">
              <label className="text-xs font-semibold text-[#668273] uppercase tracking-wide">
                Role
              </label>

              <p className="text-[#123524] font-semibold capitalize mt-1">
                {user?.role?.replace("_", " ") || "—"}
              </p>
            </div>

          </div>

        </div>

        {/* Information */}
        <div className="mt-5 px-1">
          <p className="text-xs text-[#668273]">
            Your profile information you can see here.
          </p>
        </div>

      </div>
    </main>
  );
}
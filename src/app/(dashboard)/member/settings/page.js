"use client";

import useAuthStore from "@/store/useAuthStore";

export default function MemberSettingsPage() {
  const user = useAuthStore((state) => state.user);

  return (
        <main className="flex-1 p-8 max-w-xl">
          <h1 className="text-2xl font-bold text-[#181d19] mb-6">Settings</h1>

          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <div>
              <label className="text-xs font-medium text-[#404943]">Name</label>
              <p className="text-[#181d19] font-medium">{user?.name || "—"}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-[#404943]">Email</label>
              <p className="text-[#181d19] font-medium">{user?.email || "—"}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-[#404943]">Role</label>
              <p className="text-[#181d19] font-medium capitalize">
                {user?.role?.replace("_", " ") || "—"}
              </p>
            </div>
          </div>

          <p className="text-xs text-[#404943] mt-4">
            Profile editing isn&apos;t available yet — the update endpoint on the backend is currently admin-only.
          </p>
        </main>
  );
}
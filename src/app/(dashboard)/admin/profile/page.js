"use client";

import useAuthStore from "@/store/useAuthStore";

import Avatar from "@/components/shared/Avatar";
import RoleBadge from "@/components/users/RoleBadge";

export default function AdminProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <div className="p-8 text-gray-500">
        No profile data available.
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-2xl font-bold text-[#181d19]">My Profile</h1>
      <p className="mt-1 text-[#697268]">
        View your personal information and account details.
      </p>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <section className="rounded-2xl border border-[#d0e8dc] bg-linear-to-b from-[#f0faf4] to-white p-6 shadow-[0_1px_2px_rgba(16,24,20,0.04)] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(15,82,56,0.12)] hover:border-[#40916c]/30 animate-green-glow">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#1a7a4c] opacity-10 blur-lg scale-125 animate-pulse" />
                <div className="scale-125 relative">
                  <Avatar name={user.name} size="lg" variant="dark" />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#05110a]">
                  {user.name}
                </h2>
                <p className="text-sm text-[#66756e]">{user.email}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                <RoleBadge role={user.role} />
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                    user.availability === "available"
                      ? "bg-[#e7f5ee] text-[#1d6d45]"
                      : "bg-[#f4eaea] text-[#8a3b3b]"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      user.availability === "available"
                        ? "bg-[#1d6d45]"
                        : "bg-[#8a3b3b]"
                    }`}
                  />
                  {user.availability === "available" ? "Available" : "Not Available"}
                </span>
              </div>
            </div>

            <div className="mt-6 border-t border-[#eef2f0] pt-4">
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#66756e]">Member since</span>
                  <span className="font-medium text-[#2f3a36]">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#66756e]">Role</span>
                  <span className="font-medium text-[#2f3a36] capitalize">
                    {user.role?.replaceAll("_", " ")}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Details Card */}
        <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <section className="rounded-2xl border border-[#d0e8dc] bg-linear-to-b from-[#f0faf4] to-white p-6 shadow-[0_1px_2px_rgba(16,24,20,0.04)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_4px_20px_rgba(15,82,56,0.12)] hover:border-[#40916c]/30 animate-green-glow">
            {/* Green accent bar */}
            <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-[#0f5238] to-[#40916c] rounded-l-2xl" />

            <h3 className="text-base font-semibold text-[#05110a] mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#1a7a4c] animate-pulse" />
              Account Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group rounded-xl border border-transparent hover:border-[#e3ece8] hover:bg-[#f7faf8] p-3 -m-3 transition-all duration-200">
                <label className="block text-xs text-[#66756e] mb-1">
                  Full Name
                </label>
                <p className="text-sm font-medium text-[#2f3a36] group-hover:text-[#0f5238] transition-colors">
                  {user.name || "—"}
                </p>
              </div>

              <div className="group rounded-xl border border-transparent hover:border-[#e3ece8] hover:bg-[#f7faf8] p-3 -m-3 transition-all duration-200">
                <label className="block text-xs text-[#66756e] mb-1">
                  Email Address
                </label>
                <p className="text-sm font-medium text-[#2f3a36] group-hover:text-[#0f5238] transition-colors">
                  {user.email || "—"}
                </p>
              </div>

              <div className="group rounded-xl border border-transparent hover:border-[#e3ece8] hover:bg-[#f7faf8] p-3 -m-3 transition-all duration-200">
                <label className="block text-xs text-[#66756e] mb-1">
                  Role
                </label>
                <p className="text-sm font-medium text-[#2f3a36] capitalize group-hover:text-[#0f5238] transition-colors">
                  {user.role?.replaceAll("_", " ") || "—"}
                </p>
              </div>

              <div className="group rounded-xl border border-transparent hover:border-[#e3ece8] hover:bg-[#f7faf8] p-3 -m-3 transition-all duration-200">
                <label className="block text-xs text-[#66756e] mb-1">
                  Status
                </label>
                <p className="text-sm font-medium text-[#2f3a36] capitalize group-hover:text-[#0f5238] transition-colors">
                  {user.availability || "—"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

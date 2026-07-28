import Avatar from "@/components/shared/Avatar";
import RoleBadge from "@/components/users/RoleBadge";

export default function UserProfileCard({ user }) {
  if (!user) return null;
  const isAvailable = user.availability === "available";

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#d0e8dc] bg-gradient-to-br from-[#f0faf4] to-white p-5 shadow-[0_1px_3px_rgba(16,24,20,0.06)] sm:p-6 transition-all duration-300 hover:shadow-[0_4px_16px_rgba(15,82,56,0.1)]">
      {/* Green accent bar */}
      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#0f5238] to-[#40916c] rounded-l-2xl" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar
              name={user.name}
              size="lg"
              variant="dark"
            />
            <span
              className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-white ${
                isAvailable ? "bg-[#1a7a4c]" : "bg-[#8a3b3b]"
              }`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold text-[#05110a] sm:text-xl">
              {user.name}
            </h1>
            <p className="text-sm text-[#66756e]">{user.email}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <RoleBadge role={user.role} />
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
              isAvailable
                ? "bg-[#e7f5ee] text-[#1a7a4c]"
                : "bg-[#f4eaea] text-[#8a3b3b]"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isAvailable ? "bg-[#1a7a4c]" : "bg-[#8a3b3b]"
              }`}
            />
            {isAvailable ? "Available" : "Not Available"}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#eef2f0] pt-4 text-xs text-[#6b7b74]">
        <div className="flex items-center gap-1.5">
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
        <div className="flex items-center gap-1.5">
          <span className="text-[#66756e]">Role</span>
          <span className="font-medium text-[#2f3a36] capitalize">
            {user.role?.replaceAll("_", " ") || "—"}
          </span>
        </div>
      </div>
    </section>
  );
}
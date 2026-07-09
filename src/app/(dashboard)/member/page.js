
"use client";
import useAuthStore from "@/store/authStore";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

export default function MemberPage() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="flex min-h-screen bg-[#f7f6f6]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-[#181d19]">
            Welcome, {user?.name}
          </h1>
        </main>
      </div>
    </div>
  );
}
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

export default function ManagerLayout({ children }) {
  return (
    <>
      <div className="flex min-h-screen bg-[#f7f6f6]">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </>
  );
}

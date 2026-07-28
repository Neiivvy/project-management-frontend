"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import { getMyProjects } from "@/api/projects";

export default function MemberCalendarPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProjects()
      .then((res) => {
        const withDeadlines = res.data.data
          .filter((p) => p.deadline)
          .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        setEvents(withDeadlines);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f7f6f6]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-[#181d19] mb-6">Calendar</h1>

          {loading && <p className="text-[#404943]">Loading...</p>}

          {!loading && (
            <div className="bg-white rounded-xl shadow-sm divide-y">
              {events.length === 0 && (
                <p className="p-6 text-sm text-[#404943]">No upcoming deadlines.</p>
              )}
              {events.map((p) => (
                <div key={p._id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-[#181d19]">{p.title}</p>
                    <p className="text-xs text-[#404943]">Project deadline</p>
                  </div>
                  <span className="text-sm text-[#2d6a4f] font-medium">
                    {new Date(p.deadline).toLocaleDateString(undefined, {
                      weekday: "short", month: "short", day: "numeric", year: "numeric",
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
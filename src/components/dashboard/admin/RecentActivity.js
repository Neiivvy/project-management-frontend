"use client";

import { useEffect } from "react";
import Link from "next/link";
import useActivityStore from "@/store/admin/useActivityStore";
import ActivityItem from "./ActivityItem";

export default function RecentActivity() {
  const {
    activities,
    isLoading,
    fetchActivities,
  } = useActivityStore();

  useEffect(() => {
    fetchActivities(7, 5);
  }, [fetchActivities]);

  return (
    <div
      className="bg-white rounded-2xl border border-[#e3e8e4] shadow-sm animate-fade-in-up"
      style={{ animationDelay: "150ms" }}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#ecefe9]">
        <h2 className="font-semibold text-[#181d19]">
          Recent Activity
        </h2>

        <Link
          href="/admin/activity"
          className="text-xs font-medium text-[#0f5238] hover:underline"
        >
          View all
        </Link>
      </div>

      {isLoading ? (
        <div className="px-5 py-8 text-sm text-[#697268]">
          Loading activity...
        </div>
      ) : activities.length === 0 ? (
        <div className="px-5 py-8 text-sm text-[#697268]">
          No recent activity found.
        </div>
      ) : (
        <div className="divide-y divide-[#ecefe9]">
          {activities.map((activity) => (
            <ActivityItem
              key={activity._id}
              activity={activity}
            />
          ))}
        </div>
      )}
    </div>
  );
}
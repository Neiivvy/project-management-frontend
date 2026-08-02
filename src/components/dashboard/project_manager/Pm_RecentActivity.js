"use client";

import { useEffect } from "react";
import Link from "next/link";
import useActivityStore from "@/store/admin/useActivityStore";
import ActivityCard from "./Pm_ActivityCard";

export default function RecentActivityPm() {
  const { activities, isLoading, fetchActivities } = useActivityStore();

  useEffect(() => {
    fetchActivities(7, 4);
  }, [fetchActivities]);

  return (
    <div
      className="bg-white rounded-2xl border border-[#e3e8e4] shadow-sm animate-fade-in-up"
      style={{ animationDelay: "150ms" }}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#ecefe9]">
        <h2 className="font-semibold text-[#181d19]">Recent Activity</h2>

        <Link
          href="/project-manager/activity"
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
        <div className="p-5 space-y-0">
          {activities.map((activity, index) => (
            <ActivityCard
              key={activity._id}
              activity={activity}
              isFirst={index === 0}
              isLast={index === activities.length - 1}
              paletteIndex={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

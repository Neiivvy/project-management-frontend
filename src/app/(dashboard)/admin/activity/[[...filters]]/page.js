"use client";

import { useEffect, useState } from "react";

import useActivityStore from "@/store/admin/useActivityStore";

import ActivityItem from "@/components/dashboard/admin/ActivityItem";
import ActivityFilters from "@/components/dashboard/admin/ActivityFilters";

export default function ActivityPage() {
  const [days, setDays] = useState(30);

  const {
    activities,
    isLoading,
    error,
    fetchActivities,
  } = useActivityStore();

  useEffect(() => {
    fetchActivities(days, 50);
  }, [days, fetchActivities]);

  const handleRefresh = () => {
    fetchActivities(days, 50);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-[#181d19]">
          Activity
        </h1>

        <p className="mt-1 text-[#697268]">
          View recent actions happening across Co-Work.
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <ActivityFilters
          days={days}
          setDays={setDays}
          refresh={handleRefresh}
          loading={isLoading}
        />
      </div>

      {/* Activity Feed */}
      <div className="overflow-hidden rounded-2xl border border-[#e3e8e4] bg-white shadow-sm animate-fade-in-up">
        {isLoading ? (
          <div className="py-14 text-center text-[#697268]">
            Loading activity...
          </div>
        ) : error ? (
          <div className="py-14 text-center text-red-500">
            {error}
          </div>
        ) : activities.length === 0 ? (
          <div className="py-14 text-center">
            <h3 className="text-lg font-semibold text-[#181d19]">
              No activity found
            </h3>

            <p className="mt-2 text-sm text-[#697268]">
              There are no recorded activities for this period.
            </p>
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
    </div>
  );
}
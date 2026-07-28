"use client";

import { useEffect, useState } from "react";

import useActivityStore from "@/store/admin/useActivityStore";

import ActivityFilters from "@/components/dashboard/admin/ActivityFilters";
import ActivityTimeline from "@/components/dashboard/admin/ActivityTimeline";

export default function ActivityPage() {
  const [days, setDays] = useState(30);
  const [category, setCategory] = useState("all");

  const {
    activities,
    isLoading,
    error,
    fetchActivities,
  } = useActivityStore();

  useEffect(() => {
    fetchActivities(days, 50, category);
  }, [days, category, fetchActivities]);

  const handleRefresh = () => {
    fetchActivities(days, 50, category);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#181d19] tracking-tight">
              Activity Log
            </h1>
            <p className="mt-2 text-[#697268]">
              Track all actions happening across your workspace in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#e3e8e4] shadow-sm p-4 lg:p-5 animate-fade-in-up">
        <ActivityFilters
          days={days}
          setDays={setDays}
          category={category}
          setCategory={setCategory}
          refresh={handleRefresh}
          loading={isLoading}
        />
      </div>

      {/* Activity Timeline */}
      <div className="animate-fade-in-up">
        {isLoading ? (
          <div className="bg-white rounded-2xl border border-[#e3e8e4] shadow-sm p-14 text-center">
            <div className="inline-flex items-center gap-2 text-[#697268]">
              <div className="w-5 h-5 border-2 border-[#0f5238] border-t-transparent rounded-full animate-spin" />
              <span>Loading activities...</span>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-14 text-center">
            <p className="text-red-500 font-medium">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-4 px-4 py-2 bg-[#1a7a4c] text-white rounded-xl text-sm font-medium hover:bg-[#145d3a] transition"
            >
              Try Again
            </button>
          </div>
        ) : activities.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e3e8e4] shadow-sm p-14 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#f2f6f3] rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#0f5238]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#181d19]">
              No activity found
            </h3>
            <p className="mt-2 text-sm text-[#697268] max-w-md mx-auto">
              There are no recorded activities for this period. Try adjusting your time range or check back later.
            </p>
          </div>
        ) : (
          <ActivityTimeline activities={activities} />
        )}
      </div>
    </div>
  );
}

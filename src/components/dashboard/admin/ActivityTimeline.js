"use client";

import { useMemo } from "react";
import { FiCalendar } from "react-icons/fi";
import ActivityCard from "./ActivityCard";

function getDateLabel(date) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const activityDate = new Date(date);
  const activityDay = new Date(activityDate.getFullYear(), activityDate.getMonth(), activityDate.getDate());

  if (activityDay.getTime() === today.getTime()) {
    return "Today";
  }
  if (activityDay.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }
  if (activityDate > new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)) {
    return "This Week";
  }
  return activityDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: activityDate.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

function groupActivitiesByDate(activities) {
  const groups = {};
  
  activities.forEach((activity) => {
    const dateLabel = getDateLabel(activity.createdAt);
    if (!groups[dateLabel]) {
      groups[dateLabel] = [];
    }
    groups[dateLabel].push(activity);
  });

  // Sort groups by date (most recent first)
  const sortedGroups = Object.entries(groups).sort((a, b) => {
    const dateOrder = ["Today", "Yesterday", "This Week"];
    const aIndex = dateOrder.indexOf(a[0]);
    const bIndex = dateOrder.indexOf(b[0]);
    
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return 0;
  });

  return sortedGroups;
}

export default function ActivityTimeline({ activities }) {
  const groupedActivities = useMemo(() => {
    if (!activities || activities.length === 0) return [];
    return groupActivitiesByDate(activities);
  }, [activities]);

  if (groupedActivities.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {groupedActivities.map(([dateLabel, items], groupIndex) => (
        <div key={dateLabel} className="animate-fade-in-up" style={{ animationDelay: `${groupIndex * 150}ms` }}>
          {/* Date Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0f5238] text-white rounded-full">
              <FiCalendar size={14} />
              <span className="text-sm font-semibold">{dateLabel}</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-r from-[#e3e8e4] to-transparent" />
            <span className="text-xs text-[#8a938c] font-medium">
              {items.length} {items.length === 1 ? "activity" : "activities"}
            </span>
          </div>

          {/* Activity Cards */}
          <div className="space-y-0">
            {items.map((activity, index) => (
             <ActivityCard
  key={activity._id}
  activity={activity}
  isFirst={index === 0}
  isLast={index === items.length - 1}
  paletteIndex={index}
/>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

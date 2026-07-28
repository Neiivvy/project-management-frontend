"use client";

import { useEffect, useState } from "react";

export default function StatCard({ icon: Icon, label, value, trend, color = "#0f5238", delay = 0 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf;
    const duration = 800;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <div
      className="bg-white rounded-2xl p-5 border border-[#e3e8e4] shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}1a`, color }}
        >
          <Icon size={20} />
        </span>
        {trend !== undefined && (
          <span
            className={`text-xs font-semibold ${
              trend >= 0 ? "text-[#0f5238]" : "text-red-500"
            }`}
          >
            {trend >= 0 ? "+" : ""}
            {trend}%
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-bold text-[#181d19]">{display}</p>
      <p className="text-sm text-[#697268] mt-1">{label}</p>
    </div>
  );
}
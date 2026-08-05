"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import pmImage from "@/assets/images/pm.png";
import adminImg from "@/assets/images/admin.jpg";
import teamImg from "@/assets/images/member.jpg";

const items = [
  {
    label: "FOR ADMINS",
    description:
      "Manage users, oversee projects, monitor activity logs, and control platform access with role-based permissions.",
    image: adminImg,
  },
  {
    label: "FOR PROJECT MANAGERS",
    description:
      "Create projects, assign tasks, track progress, and manage team collaboration from one workspace.",
    image: pmImage,
  },
  {
    label: "FOR TEAM MEMBERS",
    description:
      "View assigned tasks, update progress, collaborate through comments, and stay on top of daily work.",
    image: teamImg,
  },
];

export default function Solutions() {
  const [hovered, setHovered] = useState(0);
  const [direction, setDirection] = useState("right");
  const prevIndex = useRef(0);

  const handleHover = (index) => {
    setDirection(index < prevIndex.current ? "right" : "left");
    prevIndex.current = index;
    setHovered(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction === "right" ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction === "right" ? -40 : 40,
      opacity: 0,
    }),
  };

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <span className="text-sm font-bold tracking-widest uppercase text-[#0f5238]">
            Solutions
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-[#111827] tracking-tight">
            Built for the whole team
          </h2>
          <p className="mt-4 text-[#374151] max-w-2xl">
            Every role gets the tools, visibility, and controls it needs to
            contribute effectively.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Role tabs */}
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={item.label}
                onMouseEnter={() => handleHover(index)}
                onFocus={() => handleHover(index)}
                tabIndex={0}
                role="button"
                className={`group relative flex gap-4 p-5 rounded-xl cursor-pointer transition-all duration-300 outline-none ${
                  hovered === index
                    ? "bg-[#F7FAF8] border border-[#0f5238]/20 shadow-sm"
                    : "bg-transparent border border-transparent hover:bg-[#F7FAF8]/50"
                }`}
              >
                {/* Active indicator */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-1 rounded-full transition-all duration-300 ${
                      hovered === index
                        ? "h-8 bg-[#0f5238]"
                        : "h-4 bg-[#D8E5DD] group-hover:h-6 group-hover:bg-[#0f5238]/40"
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    className={`text-sm font-bold tracking-wide transition-colors duration-300 ${
                      hovered === index
                        ? "text-[#0f5238]"
                        : "text-[#374151] group-hover:text-[#0f5238]"
                    }`}
                  >
                    {item.label}
                  </h4>
                  <p
                    className={`mt-1.5 text-sm leading-relaxed transition-all duration-300 ${
                      hovered === index
                        ? "text-[#374151]"
                        : "text-[#6B7280] group-hover:text-[#374151]"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Hover arrow */}
                <div
                  className={`self-center transition-all duration-300 ${
                    hovered === index
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2"
                  }`}
                >
                  <svg
                    className="h-4 w-4 text-[#0f5238]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Image display */}
          <div className="relative h-80 sm:h-95 lg:h-105 w-full rounded-2xl border border-[#D8E5DD] overflow-hidden bg-[#F7FAF8] shadow-lg">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={hovered}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={items[hovered].image}
                  alt={items[hovered].label}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority={hovered === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

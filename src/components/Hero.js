"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import pmImage from "@/assets/images/pm.png";
import adminImg from "@/assets/images/admin.jpg";
import teamImg from "@/assets/images/member.jpg";

const slides = [
  { id: "admin", image: adminImg, alt: "Admin dashboard view" },
  { id: "pm", image: pmImage, alt: "Project manager dashboard view" },
  { id: "team", image: teamImg, alt: "Team member dashboard view" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isFirstLoad) {
      const timer = setTimeout(() => {
        setIsFirstLoad(false);
      }, 100);
      return () => clearTimeout(timer);
    }

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [isFirstLoad]);

  const handleSlideChange = (index) => {
    if (index === current) return;
    setCurrent(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 1,
    }),
  };

  return (
    <section className="relative overflow-hidden bg-white min-h-150 sm:min-h-175 lg:min-h-187.5">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence custom={1} mode="popLayout">
          {slides.map(
            (slide, index) =>
              index === current && (
                <motion.div
                  key={slide.id}
                  custom={1}
                  variants={isFirstLoad ? {} : slideVariants}
                  initial={isFirstLoad ? false : "enter"}
                  animate="center"
                  exit={isFirstLoad ? false : "exit"}
                  transition={
                    isFirstLoad
                      ? { duration: 0 }
                      : { duration: 2, ease: "easeInOut" }
                  }
                  className="absolute inset-0"
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => handleSlideChange(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === current
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`View ${slide.alt}`}
          />
        ))}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white border border-white/20"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            Project Management Platform
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
          >
            Collaborative
            <br />
            <span className="text-white/90">Project Hub</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg text-white/80 leading-relaxed max-w-lg"
          >
            Plan, track, and deliver work together. One workspace for
            projects, tasks, teams, and reports.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#498f70] shadow-lg hover:bg-[#F7FAF8] transition-all hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all"
            >
              See How It Works
            </Link>
          </motion.div>

          {/* Mini metrics */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex items-center gap-8"
          >
            <div>
              <div className="text-2xl font-bold text-white">Role based</div>
              <div className="text-xs text-white/60 mt-0.5">Different roles</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <div className="text-2xl font-bold text-white">Manage</div>
              <div className="text-xs text-white/60 mt-0.5">Project and Tasks</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <div className="text-2xl font-bold text-white">Track</div>
              <div className="text-xs text-white/60 mt-0.5">Activities</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

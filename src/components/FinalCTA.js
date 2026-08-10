"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-white px-6">
      <div className="mx-auto max-w-3xl">
        <div className="relative rounded-3xl bg-[#498f70] px-8 py-16 sm:px-16 sm:py-20 text-center overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08)_0%,transparent_60%)]" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
              Join teams that plan, track, and deliver work with Co-Work.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-[#498f70] shadow-lg hover:shadow-xl transition-all hover:bg-[#F7FAF8]"
              >
                Create your workspace
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

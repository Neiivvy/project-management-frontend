"use client";

import { motion } from "framer-motion";
import {
  FolderPlus,
  UserPlus,
  ListChecks,
  TrendingUp,
  FileBarChart,
} from "lucide-react";

const steps = [
  {
    icon: FolderPlus,
    title: "Create Project",
    description: "Set up a new project with goals, timeline, and team.",
  },
  {
    icon: UserPlus,
    title: "Assign Team",
    description: "Add members and define roles and responsibilities.",
  },
  {
    icon: ListChecks,
    title: "Manage Tasks",
    description: "Break work into tasks, set priorities and deadlines.",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Monitor real-time progress and identify blockers.",
  },
  {
    icon: FileBarChart,
    title: "Generate Reports",
    description: "Export insights and share results with stakeholders.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Workflow() {
  return (
    <section className="py-24 bg-white px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold tracking-widest uppercase text-[#498f70]">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-[#111827] tracking-tight">
            From planning to delivery
          </h2>
          <p className="mt-4 text-[#374151] max-w-2xl mx-auto">
            A clear, repeatable process that keeps your team aligned from
            kickoff to completion.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {/* Desktop: horizontal flow */}
          <div className="hidden lg:flex items-start justify-between gap-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex-1 flex flex-col items-center">
                <motion.div
                  variants={itemVariants}
                  className="relative w-full"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="h-14 w-14 rounded-2xl bg-[#498f70] text-white flex items-center justify-center shadow-lg shadow-[#498f70]/20 mb-4">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-semibold text-[#111827] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed max-w-40">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector arrow */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] flex items-center">
                      <div className="h-px flex-1 bg-[#D8E5DD]" />
                      <svg
                        className="h-4 w-4 text-[#D8E5DD] -ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Mobile: vertical flow */}
          <div className="lg:hidden flex flex-col gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-xl bg-[#498f70] text-white flex items-center justify-center shadow-lg shadow-[#498f70]/20 shrink-0">
                    <step.icon className="h-5 w-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-px h-8 bg-[#D8E5DD] mt-2" />
                  )}
                </div>
                <div className="pb-2">
                  <h3 className="text-sm font-semibold text-[#111827] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

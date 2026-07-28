import { Register_route } from "@/constants/routes";
import Link from "next/link";
import {
  FiClipboard,
  FiUsers,
  FiCheckSquare,
  FiTrendingUp,
  FiArrowRight,
  FiPlay,
  FiLayers,
  FiCalendar,
  FiBell,
  FiPieChart,
  FiShield,
  FiRepeat,
} from "react-icons/fi";
import { HiOutlineSparkles, HiOutlineRocketLaunch } from "react-icons/hi2";

const steps = [
  {
    number: "01",
    icon: FiClipboard,
    color: "text-green-600",
    bg: "bg-green-50",
    title: "Create Your Project",
    description:
      "Set up a workspace with a name, goal, and deadline. Start from scratch.",
  },
  {
    number: "02",
    icon: FiUsers,
    color: "text-violet-600",
    bg: "bg-violet-50",
    title: "Invite Your Team",
    description:
      "Add members by email and assign roles — Admin, Manager and User",
  },
  {
    number: "03",
    icon: FiCheckSquare,
    color: "text-amber-600",
    bg: "bg-amber-50",
    title: "Plan & Assign Tasks",
    description:
      "Break projects into simple tasks, set priorities, and organize your workflow with easy sprint planning.",
  },
  {
    number: "04",
    icon: FiTrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    title: "Track Progress",
    description:
      "Monitor live dashboards, burndown charts, and team workload as work gets done.",
  },
];

const capabilities = [
  { icon: FiLayers, label: "Organize Tasks" },
  { icon: FiCalendar, label: "Plan Sprints" },
  { icon: FiPieChart, label: "Track Progress" },
  { icon: FiShield, label: "Manage Access" },
  { icon: FiRepeat, label: "Repeat Tasks" },
];

const faqs = [
  {
    q: "What types of projects can I manage?",
    a: "You can manage software projects, marketing campaigns, team tasks, and any work that needs planning and collaboration.",
  },
  {
    q: "Can I move my projects from another tool?",
    a: "Yes. You can easily import your tasks and project data from other tools or files.",
  },

  {
    q: "Can clients view project updates?",
    a: "Yes. You can invite clients to view project progress, milestones, and updates easily.",
  },
];

export default function HowItWorksPage() {
  return (
    <main>
      <section className="px-6 py-24 text-center sm:px-10">
        <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-xl font-semibold text-[#498f70]">
          How It Works
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          From Ideas to Execution {" "}
          <span className="text-[#498f70]">Simplify Every Step.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-500">
          Co-Work is designed to fit the way your team actually works.
          Set up in minutes, collaborate in real time, and manage projects
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/demo"
            className="inline-flex items-center gap-2 rounded-lg border bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700"
          >
            <FiPlay size={14} />
            Watch Demo
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-slate-100 bg-white p-6"
              >
                <span className="absolute right-5 top-4 text-5xl font-extrabold text-gray-300 select-none">
                  {step.number}
                </span>
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${step.bg}`}
                >
                  <Icon size={22} className={step.color} />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 px-6 py-14 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-slate-400">
            Everything you need in one platform
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {capabilities.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl bg-white px-3 py-5 text-center shadow-sm hover:scale-105"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                  <Icon size={18} className="text-green-600" />
                </span>
                <span className="text-xs font-medium text-slate-600">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 sm:px-10">
        <h2 className="text-center text-3xl font-extrabold text-slate-900">
          Common Questions
        </h2>
        <p className="mt-3 text-center text-slate-500">
          Everything you need to know before getting started.
        </p>
        <div className="mt-10 flex flex-col gap-4">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-xl border border-slate-100 bg-slate-50 p-6"
            >
              <h3 className="font-semibold text-slate-900">{faq.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="px-6 py-20 text-center sm:px-10"
      
      >
        <h2 className="text-3xl font-extrabold text-slate-900">
          Ready to run better projects?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-500">
          Trusted by teams worldwide to plan, collaborate, and complete projects
          successfully. No credit card required.
        </p>
        <Link
          href={Register_route}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-green-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-green-700"
        >
          Start for Free <FiArrowRight size={15} />
        </Link>
      </section>
    </main>
  );
}

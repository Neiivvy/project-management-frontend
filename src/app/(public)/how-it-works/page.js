import { Register_route } from "@/constants/routes";
import Link from "next/link";
import {
  FiClipboard,
  FiUsers,
  FiCheckSquare,
  FiTrendingUp,
  FiArrowRight,
  FiUserPlus,
  FiBarChart2,
} from "react-icons/fi";
import { HiOutlineSparkles, HiOutlineRocketLaunch } from "react-icons/hi2";

const steps = [
  {
    number: "01",
    icon: FiClipboard,
    color: "text-green-600",
    bg: "bg-green-50",
    title: "Create Project",
    description:
      "Set up a new project with a name, description, and deadline. Choose visibility and start building your workspace.",
  },
  {
    number: "02",
    icon: FiUsers,
    color: "text-violet-600",
    bg: "bg-violet-50",
    title: "Collaborate",
    description:
      "Invite team members, assign roles, and keep everyone aligned with shared goals and real-time updates.",
  },
  {
    number: "03",
    icon: FiCheckSquare,
    color: "text-amber-600",
    bg: "bg-amber-50",
    title: "Track Tasks",
    description:
      "Break work into tasks, set priorities, assign owners, and monitor progress with intuitive dashboards.",
  },
  {
    number: "04",
    icon: FiBarChart2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    title: "Create Reports",
    description:
      "Generate detailed reports on project performance, team productivity, and milestone completion.",
  },
];

const flow = [
  {
    icon: FiUserPlus,
    color: "text-green-600",
    bg: "bg-green-50",
    title: "Create Your Account",
    description:
      "Sign up as a team member. Once registered, an Admin or Project Manager can assign you the Project Manager role.",
  },
  {
    icon: FiClipboard,
    color: "text-violet-600",
    bg: "bg-violet-50",
    title: "Start Creating Projects",
    description:
      "As a Project Manager, create new projects, set goals, define deadlines, and organize your workspace.",
  },
  {
    icon: FiUsers,
    color: "text-amber-600",
    bg: "bg-amber-50",
    title: "Build Your Team",
    description:
      "Invite members to your project, assign roles, and ensure everyone knows their responsibilities.",
  },
  {
    icon: FiCheckSquare,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    title: "Assign & Track Tasks",
    description:
      "Break projects into tasks, assign them to team members, set priorities, and track progress in real time.",
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
          From Ideas to Execution{" "}
          <span className="text-[#498f70]">Simplify Every Step.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-500">
          Co-Work is designed to fit the way your team actually works.
          Set up in minutes, collaborate in real time, and manage projects
          with clarity.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="animate-fade-in-up relative rounded-2xl border border-slate-100 bg-white p-6"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="absolute right-5 top-4 text-5xl font-extrabold text-gray-300 select-none sm:text-6xl">
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

      <section className="border-y border-slate-100 bg-slate-50 px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-extrabold text-slate-900">
            Your Workflow, Simplified
          </h2>
          <p className="mt-4 text-center text-slate-500">
            Here is how Co-Work helps you move from sign-up to delivery.
          </p>

          <div className="relative mt-14">
            <div className="absolute left-6 top-0 h-full w-0.5 bg-green-200 sm:left-8" />

            <div className="flex flex-col gap-10">
              {flow.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="animate-slide-in-left relative flex gap-6 sm:gap-8"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div
                      className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${item.bg} ${item.color} shadow-lg sm:h-14 sm:w-14`}
                    >
                      <Icon size={22} />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        className="px-6 py-20 text-center sm:px-10"
      >
        <h2 className="text-3xl font-extrabold text-slate-900">
          Ready to run better projects?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-500">
         Plan projects, assign tasks, track progress, and keep your team connected
  with everything organized in one place.
        </p>
        <Link
          href={Register_route}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-green-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-green-700"
        >
          Get Started <FiArrowRight size={15} />
        </Link>
      </section>
    </main>
  );
}

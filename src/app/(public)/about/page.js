import {
  FiLock,
  FiUserPlus,
  FiActivity,
  FiTarget,
  FiHeart,
  FiSend,
} from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";

const features = [
  {
    icon: FiLock,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "Role-based Access",
    description:
      "Assign permissions by role : admins, project managers, and contributors each see exactly what they need.",
  },
  {
    icon: FiUserPlus,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    title: "Project Assignment",
    description:
      "Streamline project creation and member allocation with intuitive assignment tools and clear ownership.",
  },
  {
    icon: FiActivity,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    title: "Activity & Reports Tracking",
    description:
      "Monitor real-time activity feeds and generate comprehensive reports to keep stakeholders informed.",
  },
];
const values = [
  {
    icon: FiTarget,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "Stay On Track",
    description:
      "Plan tasks, track progress, and complete projects on time with ease.",
  },
  {
    icon: HiOutlineUserGroup,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    title: "Better Collaboration",
    description:
      "Help teams communicate, share updates, and work together efficiently.",
  },
  {
    icon: FiSend,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    title: "Flexible Workflow",
    description:
      "Manage projects your way with simple tools for tasks, sprints, and planning.",
  },
  {
    icon: FiHeart,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    title: "Clear Visibility",
    description:
      "Keep clients and teams updated with real-time project progress.",
  },
];

const team = [
  {
    initials: "SA",
    name: "Sagar Shrestha",
    role: "Frontend Developer",
    bio: "Passionate about building intuitive user experiences with modern web technologies.",
  },
  {
    initials: "NI",
    name: "Nitika Dangal",
    role: "Frontend Developer",
    bio: "Dedicated to creating clean, responsive interfaces that users love.",
  },
  {
    initials: "PA",
    name: "Pankaj Kumar Rajbanshi",
    role: "Frontend Developer",
    bio: "Focused on delivering pixel-perfect designs with robust functionality.",
  },
  {
    initials: "SH",
    name: "Shovit Regmi",
    role: "MERN Developer",
    bio: "Full-stack enthusiast building scalable applications from ground up.",
  },
  {
    initials: "SU",
    name: "Sumana Ranjit",
    role: "MERN Developer",
    bio: "Problem solver who turns complex requirements into elegant solutions.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="px-6 py-24 text-center sm:px-10">
        <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-xl font-semibold text-[#498f70]">
          About Us
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
          The Smarter Way to{" "}
          <span className="text-[#498f70] ">Manage Projects</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500">
          Co-Work is a project management system built for teams that
          can&apos;t afford to miss deadlines. We bring structure, visibility,
          and accountability to every project from kickoff to delivery.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Our Mission is Simple
            </h2>
           <p className="mt-5 text-slate-500">
  Co-Work is a collaborative project management platform built to help teams
  organize projects, manage tasks, and track progress in one place. It brings
  project managers and team members together with clear responsibilities,
  organized workflows, and easy access to important project information.
</p>
<p className="mt-4 text-slate-500">
  From creating projects and assigning tasks to monitoring progress and
  managing team members, Co-Work provides the tools teams need to stay
  organized and work efficiently. It simplifies project management by keeping
  everything connected in one platform.
</p>
          </div>

          <div className="flex flex-col gap-5">
            {features.map(
              ({ icon: Icon, iconBg, iconColor, title, description }, index) => (
                <div
                  key={title}
                  className="animate-fade-in-up flex gap-4 rounded-xl bg-slate-50 p-5 shadow-sm hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
                  >
                    <Icon size={20} className={iconColor} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{description}</p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">
            What We Stand For
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Our principles shape every feature we build, every support ticket we
            answer, and every roadmap decision we make.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(
              ({ icon: Icon, iconBg, iconColor, title, description }, index) => (
                <div
                  key={title}
                  className="animate-fade-in-up rounded-xl bg-white p-7 text-left shadow-sm hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
                  >
                    <Icon size={22} className={iconColor} />
                  </span>
                  <h3 className="mt-5 font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{description}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-5 sm:px-10">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Meet the Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            A passionate group of builders, designers, and problem-solvers
            dedicated to your success.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-20 sm:grid-cols-3 lg:grid-cols-5">
          {team.map((member, index) => (
            <div key={member.name} className="animate-fade-in-up text-center" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-green-800 text-lg font-bold text-white shadow-md shadow-green-200">
                {member.initials}
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">
                {member.name}
              </h3>
              <p className="mt-0.5 text-sm font-medium text-green-600">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

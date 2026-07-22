"use client";

import Link from "next/link";
import { FaTasks, FaProjectDiagram, FaUsers, FaCog } from "react-icons/fa";

const links = [
  { label: "Tasks", desc: "Your assigned work", href: "/member/tasks", icon: FaTasks },
  { label: "Projects", desc: "Everything you're on", href: "/member/projects", icon: FaProjectDiagram },
  { label: "Team", desc: "Who you work with", href: "/member/team", icon: FaUsers },
  { label: "Settings", desc: "Your profile", href: "/member/settings", icon: FaCog },
];

export default function MemberQuickLinks() {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-lg font-semibold text-[#181d19]">Jump back in</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {links.map(({ label, desc, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-xl border border-[#e6e9e3] bg-white p-5 transition-colors hover:border-[#2d6a4f]/40 hover:bg-[#f4f7f5]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eef2ee] text-[#2d6a4f] transition-colors group-hover:bg-[#2d6a4f] group-hover:text-white">
              <Icon size={16} />
            </span>
            <p className="mt-3 font-semibold text-[#181d19]">{label}</p>
            <p className="text-xs text-[#404943]">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
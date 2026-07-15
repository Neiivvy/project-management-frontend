"use client";

import { useState } from "react";

import TeamCard from "./components/TeamCard";

import { FaPlus } from "react-icons/fa";

export const teamsData = [
  {
    id: 1,
    name: "Frontend Team",
    lead: "Sagar Shrestha",
    members: 6,
    technology: "React / Next.js",
  },
  {
    id: 2,
    name: "Backend Team",
    lead: "Shovit Regmi",
    members: 5,
    technology: "Node.js / MongoDB",
  },
  {
    id: 3,
    name: "Deployment Team",
    lead: "Sumana Ranjit",
    members: 3,
    technology: "Vercel / Netlify",
  },
  {
    id: 4,
    name: "QA Team",
    lead: "Nikita Dangal",
    members: 3,
    technology: "React/Next.js",
  },
  {
    id: 3,
    name: "DevOps Team",
    lead: "pankaj kumar rajbanshi",
    members: 4,
    technology: "DevOps",
  },
];

export default function TeamsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Teams</h1>

          <p className="text-gray-500">Create and manage teams.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-lg bg-[#2d6a4f] px-3.5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <FaPlus />
          Create Team
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamsData.map((team, index) => (
          <TeamCard key={index} team={team} />
        ))}
      </div>
    </div>
  );
}

"use client";

import MemberTable from "../team/components/MemberTable";

import { FaSearch } from "react-icons/fa";

const membersData = [
  {
    id: 1,
    name: "Sagar Shrestha",
    email: "sagar@example.com",
    role: "Frontend Developer",
    team: "Frontend Team",
  },
  {
    id: 2,
    name: "Shovit Regmi",
    email: "shovit@example.com",
    role: "Backend Developer",
    team: "Backend Team",
  },
  {
    id: 3,
    name: "Nikita Dangal",
    email: "nikita@example.com",
    role: "UI/UX Designer",
    team: "Frontend Team",
  },
  {
    id: 4,
    name: "Sumana Rangit",
    email: "sumana@example.com",
    role: "QA Engineer",
    team: "QA Team",
  },
  {
    id: 5,
    name: "Pankaj Kumar Rajbanshi",
    email: "pankaj@example.com",
    role: "DevOps Engineer",
    team: "DevOps Team",
  },
];

export default function MembersPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Members</h1>

        <p className="text-gray-500">Available users and team assignments.</p>
      </div>

      <div>
        <div className="relative w-96 p-2 mb-6">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search members..."
            className="border  pl-10 pr-4 py-2 w-full  border-[#bfc9c1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20 focus:border-[#0f5238] transition-all"
          />
        </div>
      </div>

      <MemberTable members={membersData} />
    </div>
  );
}

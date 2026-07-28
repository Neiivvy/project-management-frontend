"use client";

import { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";

import MemberTable from "./components/MemberTable";
import Pagination from "../projects/components/Pagination";

import useUserStore from "@/store/useUserStore";
import AssignMemberModal from "./components/AssignMemberModal";

export default function MembersPage() {
  const { loading } = useUserStore();
  const users = useUserStore((state) => state.users);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  console.log(users);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAssign = (member) => {
    setSelectedMember(member);
    setShowAssignModal(true);
  };

  const members = useMemo(() => {
    return (users || []).filter(
      (user) =>
        user.role?.toLowerCase() === "member" &&
        (user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.availability.toLowerCase().includes(search.toLowerCase())),
    );
  }, [users, search]);
  console.log(members);

  const membersPerPage = 8;

  const indexOfLast = currentPage * membersPerPage;
  const indexOfFirst = indexOfLast - membersPerPage;

  const currentMembers = members.slice(indexOfFirst, indexOfLast);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Members</h1>

        <p className="text-gray-500">
          Available users and Project assignments.
        </p>
      </div>

      <div className="mb-6">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-lg border border-[#bfc9c1] py-2 pl-10 pr-4 focus:border-[#0f5238] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20"
          />
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          Loading Members...
        </div>
      ) : (
        <>
          <MemberTable members={currentMembers} onAssign={handleAssign} />

          <AssignMemberModal
            key={selectedMember?._id}
            show={showAssignModal}
            setShow={setShowAssignModal}
            member={selectedMember}
          />
          <Pagination
            totalItems={members.length}
            itemsPerPage={membersPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

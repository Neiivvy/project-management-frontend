"use client";

import { useEffect, useMemo, useState } from "react";
import UserStatsBar from "@/components/users/UserStatsBar";
import UserFilters from "@/components/users/UserFilters";
import UserTable from "@/components/users/UserTable";
import Pagination from "@/components/shared/Pagination";
import { fetchUsersApi } from "@/api/users";

const PAGE_SIZE = 6;

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchUsersApi();

        const formattedUsers = data.users.map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          projects: user.projects ?? "",
          lastActive: user.lastActive ?? "",
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }

    loadUsers();
  }, []);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole = role === "all" || u.role === role;

      return matchesSearch && matchesRole;
    });
  }, [users, search, role]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  function handleFilterChange(setter) {
    return (value) => {
      setter(value);
      setPage(1);
    };
  }

  function handleDelete(user) {
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-[#05110a] sm:text-2xl">
          Users
        </h1>

        <p className="text-sm text-[#375948]">
          Manage every member and their access across Project Clarity.
        </p>
      </header>

      <UserStatsBar users={users} />

      <section className="flex flex-col gap-4 rounded-2xl border border-white/6 bg-white/1.5 p-4 backdrop-blur-xl sm:p-5">
        <UserFilters
          search={search}
          onSearchChange={handleFilterChange(setSearch)}
          role={role}
          onRoleChange={handleFilterChange(setRole)}
          onAddUser={() => console.log("open add-user modal")}
        />

        <UserTable
          users={pageItems}
          onView={(u) => console.log("view", u.id)}
          onEdit={(u) => console.log("edit", u.id)}
          onDelete={handleDelete}
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={filtered.length}
          pageSize={PAGE_SIZE}
        />
      </section>
    </div>
  );
}
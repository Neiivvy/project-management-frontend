"use client";

import React, { useEffect, useMemo, useState } from "react";
import useUsersStore from "@/store/useUsersStore";
import RolesToolbar from "@/components/admin/roles/RolesToolbar";
import UsersRolesTable from "@/components/admin/roles/UsersRolesTable";
import ConfirmRoleChangeModal from "@/components/admin/roles/ConfirmRoleChangeModal";

const RolesPage = () => {
  const {
    users,
    isLoading,
    isUpdatingId,
    error,
    searchQuery,
    roleFilter,
    setSearchQuery,
    setRoleFilter,
    fetchUsers,
    promoteUser,
  } = useUsersStore();

  const [pendingUser, setPendingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
      return matchesRole && matchesSearch;
    });
  }, [users, roleFilter, searchQuery]);

  const handleConfirm = async () => {
    if (!pendingUser) return;
    await promoteUser(pendingUser._id);
    setPendingUser(null);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Users & Roles</h1>
          <p className="mt-1 text-sm text-gray-500">
            View team members and promote them to Project Manager.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-100 bg-red-50 px-4 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <RolesToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
        />

        {isLoading ? (
          <div className="rounded-xl border border-gray-200 bg-white px-5 py-10 text-center text-gray-400">
            Loading users...
          </div>
        ) : (
          <UsersRolesTable
            users={filteredUsers}
            onRequestPromote={setPendingUser}
            isUpdatingId={isUpdatingId}
          />
        )}
      </div>

      <ConfirmRoleChangeModal
        open={!!pendingUser}
        user={pendingUser}
        onCancel={() => setPendingUser(null)}
        onConfirm={handleConfirm}
        isSubmitting={!!isUpdatingId}
      />
    </div>
  );
};

export default RolesPage;
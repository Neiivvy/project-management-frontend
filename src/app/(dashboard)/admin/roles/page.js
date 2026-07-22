"use client";

import React, { useEffect, useMemo, useState } from "react";

import useUsersStore from "@/store/admin/useUsersStore";

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
    demoteUser, 
  } = useUsersStore();

  const [pendingUser, setPendingUser] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesRole =
        roleFilter === "all" || user.role === roleFilter;

      const query = searchQuery.trim().toLowerCase();

      const matchesSearch =
        !query ||
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query);

      return matchesRole && matchesSearch;
    });
  }, [users, roleFilter, searchQuery]);

const handleConfirm = async () => {
  if (!pendingUser) return;

  if (pendingAction === "promote") {
    await promoteUser(pendingUser._id);
  } else if (pendingAction === "demote") {
    await demoteUser(pendingUser._id);
  }

  setPendingUser(null);
  setPendingAction(null);
};
  return (
    <div>
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Users & Roles
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage user roles and permissions across the system.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
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
          <div className="rounded-xl border border-gray-200 bg-white py-16 text-center text-gray-400">
            Loading users...
          </div>
        ) : (
          <UsersRolesTable
            users={filteredUsers}
            isUpdatingId={isUpdatingId}
            onRequestAction={(user, action) => {
              setPendingUser(user);
              setPendingAction(action);
            }}
          />
        )}
      </div>

      <ConfirmRoleChangeModal
        open={!!pendingUser}
        user={pendingUser}
        action={pendingAction}
        onCancel={() => {
          setPendingUser(null);
          setPendingAction(null);
        }}
        onConfirm={handleConfirm}
        isSubmitting={!!isUpdatingId}
      />
    </div>
  );
};

export default RolesPage;
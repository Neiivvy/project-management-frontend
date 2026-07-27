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
        {/* Header */}
        <div className="mb-6 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#1a7a4c] to-[#0d7377] text-white shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Users & Roles
              </h1>
              <p className="text-sm text-gray-500">
                Manage user roles and permissions across the system
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-600 backdrop-blur-sm animate-fade-in-up">
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
          <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#1a7a4c]/10 text-[#1a7a4c]">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-sm text-gray-400">Loading users...</p>
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
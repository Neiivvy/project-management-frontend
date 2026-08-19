"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuthStore from "@/store/useAuthStore";
import { getProfile, updateProfile, changePassword } from "@/api/userApi";

import Avatar from "@/components/shared/Avatar";
import RoleBadge from "@/components/users/RoleBadge";

export default function ProjectManagerProfilePage() {
  const user = useAuthStore((state) => state.user);
  const refreshUser = useAuthStore((state) => state.refreshUser);

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        if (data.success) {
          resetProfile({
            name: data.data.name || "",
            email: data.data.email || "",
            phone: data.data.phone || "",
          });
        }
      } catch (error) {
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [resetProfile]);

  const onUpdateProfile = async (formData) => {
    setIsUpdatingProfile(true);
    try {
      const data = await updateProfile(formData);
      if (data.success) {
        toast.success("Profile updated successfully");
        await refreshUser();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const onChangePassword = async (formData) => {
    setIsChangingPassword(true);
    try {
      const data = await changePassword(formData);
      if (data.success) {
        toast.success("Password changed successfully");
        resetPassword();
        setShowPasswordForm(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#d0e8dc] border-t-[#0f5238]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-gray-500">
        No profile data available.
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-2xl font-bold text-[#181d19]">My Profile</h1>
      <p className="mt-1 text-[#697268]">
        View and update your personal information and account details.
      </p>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <section className="rounded-2xl border border-[#d0e8dc] bg-linear-to-b from-[#f0faf4] to-white p-6 shadow-[0_1px_2px_rgba(16,24,20,0.04)] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(15,82,56,0.12)] hover:border-[#40916c]/30 animate-green-glow">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#1a7a4c] opacity-10 blur-lg scale-100 sm:scale-125 animate-pulse" />
                <div className="relative">
                  <Avatar name={user.name} size="lg" variant="dark" />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#05110a]">
                  {user.name}
                </h2>
                <p className="text-sm text-[#66756e]">{user.email}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                <RoleBadge role={user.role} />
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                    user.availability === "available"
                      ? "bg-[#e7f5ee] text-[#1d6d45]"
                      : "bg-[#f4eaea] text-[#8a3b3b]"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      user.availability === "available"
                        ? "bg-[#1d6d45]"
                        : "bg-[#8a3b3b]"
                    }`}
                  />
                  {user.availability === "available" ? "Available" : "Not Available"}
                </span>
              </div>
            </div>

            <div className="mt-6 border-t border-[#eef2f0] pt-4">
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#66756e]">Member since</span>
                  <span className="font-medium text-[#2f3a36]">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#66756e]">Role</span>
                  <span className="font-medium text-[#2f3a36] capitalize">
                    {user.role?.replaceAll("_", " ")}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Details & Edit Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <section className="rounded-2xl border border-[#d0e8dc] bg-linear-to-b from-[#f0faf4] to-white p-6 shadow-[0_1px_2px_rgba(16,24,20,0.04)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_4px_20px_rgba(15,82,56,0.12)] hover:border-[#40916c]/30 animate-green-glow">
              {/* Green accent bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-[#0f5238] to-[#40916c] rounded-l-2xl" />

              <h3 className="text-base font-semibold text-[#05110a] mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1a7a4c] animate-pulse" />
                Personal Information
              </h3>

              <form onSubmit={handleSubmitProfile(onUpdateProfile)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#404943] mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...registerProfile("name", { required: "Name is required" })}
                      className="w-full rounded-xl border border-[#d0e8dc] bg-white px-4 py-2.5 text-sm text-[#181d19] placeholder:text-[#a3b5ab] focus:border-[#0f5238] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/10 transition-all"
                      placeholder="Enter your full name"
                    />
                    {profileErrors.name && (
                      <p className="mt-1 text-xs text-red-500">{profileErrors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#404943] mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      {...registerProfile("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full rounded-xl border border-[#d0e8dc] bg-white px-4 py-2.5 text-sm text-[#181d19] placeholder:text-[#a3b5ab] focus:border-[#0f5238] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/10 transition-all"
                      placeholder="Enter your email"
                    />
                    {profileErrors.email && (
                      <p className="mt-1 text-xs text-red-500">{profileErrors.email.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#404943] mb-1.5">
                      Phone Number <span className="text-[#a3b5ab]">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      {...registerProfile("phone")}
                      className="w-full rounded-xl border border-[#d0e8dc] bg-white px-4 py-2.5 text-sm text-[#181d19] placeholder:text-[#a3b5ab] focus:border-[#0f5238] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/10 transition-all"
                      placeholder="Enter your phone number (optional)"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0f5238] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#0a3d2a] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdatingProfile ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </section>
          </div>

          {/* Password Change Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <section className="rounded-2xl border border-[#d0e8dc] bg-linear-to-b from-[#f0faf4] to-white p-6 shadow-[0_1px_2px_rgba(16,24,20,0.04)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_4px_20px_rgba(15,82,56,0.12)] hover:border-[#40916c]/30 animate-green-glow">
              {/* Green accent bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-[#0f5238] to-[#40916c] rounded-l-2xl" />

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-[#05110a] flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#1a7a4c] animate-pulse" />
                  Password
                </h3>
                {!showPasswordForm && (
                  <button
                    type="button"
                    onClick={() => setShowPasswordForm(true)}
                    className="text-sm font-medium text-[#0f5238] hover:text-[#0a3d2a] transition-colors"
                  >
                    Change Password
                  </button>
                )}
              </div>

              {showPasswordForm ? (
                <form onSubmit={handleSubmitPassword(onChangePassword)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#404943] mb-1.5">
                        Current Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          {...registerPassword("currentPassword", {
                            required: "Current password is required",
                          })}
                          className="w-full rounded-xl border border-[#d0e8dc] bg-white px-4 py-2.5 pr-10 text-sm text-[#181d19] placeholder:text-[#a3b5ab] focus:border-[#0f5238] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/10 transition-all"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#66756e] hover:text-[#0f5238] transition-colors"
                        >
                          {showCurrentPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                        </button>
                      </div>
                      {passwordErrors.currentPassword && (
                        <p className="mt-1 text-xs text-red-500">{passwordErrors.currentPassword.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#404943] mb-1.5">
                        New Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          {...registerPassword("newPassword", {
                            required: "New password is required",
                            minLength: {
                              value: 6,
                              message: "Password must be at least 6 characters",
                            },
                          })}
                          className="w-full rounded-xl border border-[#d0e8dc] bg-white px-4 py-2.5 pr-10 text-sm text-[#181d19] placeholder:text-[#a3b5ab] focus:border-[#0f5238] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/10 transition-all"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#66756e] hover:text-[#0f5238] transition-colors"
                        >
                          {showNewPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                        </button>
                      </div>
                      {passwordErrors.newPassword && (
                        <p className="mt-1 text-xs text-red-500">{passwordErrors.newPassword.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(false);
                        resetPassword();
                      }}
                      className="rounded-xl border border-[#d0e8dc] px-6 py-2.5 text-sm font-medium text-[#404943] transition-all hover:bg-[#f7faf8] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/10"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isChangingPassword}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#0f5238] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#0a3d2a] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isChangingPassword ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center gap-2 text-sm text-[#66756e]">
                  <span className="h-2 w-2 rounded-full bg-[#1a7a4c]" />
                  Password is set
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

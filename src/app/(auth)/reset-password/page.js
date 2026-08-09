"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/api/auth";
import { toast } from "react-toastify";

function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const password = useWatch({ control, name: "password" }) || "";

  const passwordChecks = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { label: "One number", valid: /[0-9]/.test(password) },
    { label: "One special character", valid: /[^A-Za-z0-9]/.test(password) },
  ];
  const passwordValid = passwordChecks.every((c) => c.valid);

  const onSubmit = async (data) => {
    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }
    if (!passwordValid) {
      toast.error("Password does not meet requirements");
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      await resetPassword({ token, newPassword: data.password });
      setSuccess(true);
      toast.success("Password reset successfully");
      setTimeout(() => router.replace("/login"), 2000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-sm text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#dce5df] mb-4">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0f5238"
            strokeWidth="2"
          >
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold mb-2">Password reset!</h1>
        <p className="text-sm text-[#404943]">Redirecting you to login...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Set new password</h1>
        <p className="text-sm text-[#404943] mt-1">
          Make sure it meets all requirements below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label>New Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2.5 bg-[#ecefe9] border rounded-lg pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#95a89b]"
              tabIndex={-1}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}

          {password && (
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
              {passwordChecks.map((check) => (
                <div key={check.label} className="flex items-center gap-1.5">
                  <span
                    className={`text-xs ${check.valid ? "text-[#0f5238]" : "text-[#95a89b]"}`}
                  >
                    {check.valid ? "✓" : "✕"}
                  </span>
                  <span
                    className={`text-xs ${check.valid ? "text-[#0f5238]" : "text-[#95a89b]"}`}
                  >
                    {check.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("confirmPassword", {
              required: "Please confirm your password",
            })}
            className="w-full px-4 py-2.5 bg-[#ecefe9] border rounded-lg"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2.5 bg-[#0f5238] text-white rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#0b402c] active:scale-95 disabled:opacity-60"
        >
          {submitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        <Link
          href="/login"
          className="text-[#0f5238] font-medium hover:underline transition"
        >
          Back to login
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

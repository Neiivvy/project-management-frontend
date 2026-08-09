"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { signup, sendVerificationCode } from "@/api/auth";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { getDashboardRoute } from "@/utils/auth";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const [codeSent, setCodeSent] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const emailInputRef = useRef(null);
  const loginStore = useAuthStore((state) => state.login);
  const router = useRouter();

  const password = useWatch({ control, name: "password" }) || "";

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const passwordChecks = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { label: "One number", valid: /[0-9]/.test(password) },
    { label: "One special character", valid: /[^A-Za-z0-9]/.test(password) },
  ];
  const passwordValid = passwordChecks.every((c) => c.valid);

  const handleSendCode = async () => {
    const email = getValues("email");
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!email || !emailRegex.test(email)) {
      toast.error("Enter a valid email first");
      emailInputRef.current?.focus();
      return;
    }

    setSendingCode(true);
    try {
      await sendVerificationCode(email);
      setCodeSent(true);
      setResendTimer(60);
      toast.success("Verification code sent to your email");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send code");
    } finally {
      setSendingCode(false);
    }
  };

  const onSubmit = async (data) => {
    if (!codeSent) {
      toast.error("Please verify your email first");
      return;
    }
    if (code.length !== 6) {
      toast.error("Enter the 6-digit code sent to your email");
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
      const response = await signup({
        name: data.name,
        email: data.email,
        password: data.password,
        emailVerificationCode: code,
      });

      loginStore(response.data);
      const route = getDashboardRoute(response.data.user.role);
      toast.success("Account created successfully!");

      setTimeout(() => {
        router.replace(route);
      }, 800);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="text-sm text-[#404943] mt-1">
          Start managing projects with your team.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Jane Doe"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Name is too short" },
            })}
            className="w-full px-4 py-2.5 bg-[#ecefe9] border rounded-lg"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label>Email</label>
          <input
            ref={emailInputRef}
            type="email"
            placeholder="jane@example.com"
            disabled={codeSent}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Enter a valid email",
              },
            })}
            className="w-full px-4 py-2.5 bg-[#ecefe9] border rounded-lg disabled:opacity-60"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Inline verification box */}
        <div className="rounded-lg bg-[#ecefe9] border border-[#bfc9c1] p-3.5">
          {!codeSent ? (
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-[#404943] leading-snug">
                We'll send a code to confirm this email actually exists.
              </p>
              <button
                type="button"
                onClick={handleSendCode}
                disabled={sendingCode}
                className="shrink-0 px-4 py-1.5 rounded-full bg-white border border-[#0f5238] text-[#0f5238] text-xs font-medium hover:bg-[#dce5df] transition disabled:opacity-50"
              >
                {sendingCode ? "Sending..." : "Send code"}
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-[#404943]">
                  Enter the 6-digit code sent to your email
                </p>
                {resendTimer > 0 ? (
                  <span className="text-xs text-[#95a89b]">
                    Resend in {resendTimer}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendCode}
                    className="text-xs text-[#0f5238] font-medium hover:underline"
                  >
                    Resend
                  </button>
                )}
              </div>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                className="w-full px-4 py-2 bg-white border border-[#bfc9c1] rounded-lg text-center tracking-[0.5em] font-semibold"
              />
            </div>
          )}
        </div>

        <div>
          <label>Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
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
                  <span className={`text-xs ${check.valid ? "text-[#0f5238]" : "text-[#95a89b]"}`}>
                    {check.valid ? "✓" : "✕"}
                  </span>
                  <span className={`text-xs ${check.valid ? "text-[#0f5238]" : "text-[#95a89b]"}`}>
                    {check.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label>Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
              className="w-full px-4 py-2.5 bg-[#ecefe9] border rounded-lg pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#95a89b]"
              tabIndex={-1}
            >
              {showConfirmPassword ? "🙈" : "👁"}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2.5 bg-[#0f5238] text-white rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#0b402c] active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {submitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-[#0f5238] font-medium hover:underline transition">
          Sign in
        </Link>
      </p>
    </div>
  );
}
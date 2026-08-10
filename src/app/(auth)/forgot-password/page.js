"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/api/axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Forgot your password?</h1>
      </div>

      {sent ? (
        <div>
          <p className="text-sm text-[#404943] mb-6">
            We've sent a password reset link to your email.
          </p>
          <button
            onClick={() => setSent(false)}
            className="text-sm text-[#0f5238] font-medium hover:underline"
          >
            Didn't receive it? Try again
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="text-red-500 text-xs">{error}</p>
          )}

          <div>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#ecefe9] border rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#0f5238] text-white rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#0b402c] active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Sending link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-sm">
        Remember your password?{" "}
        <Link href="/login" className="text-[#0f5238] font-medium hover:underline transition">
          Sign in
        </Link>
      </p>
    </div>
  );
}

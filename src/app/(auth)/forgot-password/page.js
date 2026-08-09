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
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background:
          "linear-gradient(180deg, #EAF3FF 0%, #F5F9FF 50%, #FFFFFF 100%)",
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in-up">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 animate-float"
            style={{ backgroundColor: "#0f5238" }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#181d19]">
            Forgot your password?
          </h1>
          <p className="text-sm text-[#404943] mt-1 max-w-xs mx-auto">
            No worries, we'll send you a reset link to your email
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-[#bfc9c1] p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-fade-in-up">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {sent ? (
            <div className="text-center py-4 animate-fade-in-up">
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
              <h3 className="text-lg font-semibold text-[#181d19] mb-2">
                Check your inbox
              </h3>
              <p className="text-sm text-[#404943] mb-6">
                We've sent a password reset link to <br />
                <span className="font-medium text-[#181d19]">{email}</span>
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
              <div>
                <label className="block text-sm font-medium text-[#181d19] mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#bfc9c1] bg-[#ecefe9] text-[#181d19] focus:outline-none focus:ring-2 focus:ring-[#0f5238] focus:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-[#0f5238] text-white font-semibold hover:bg-[#2d6a4f] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
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

          <div className="mt-6 pt-6 border-t border-[#bfc9c1] text-center">
            <Link
              href="/login"
              className="text-sm text-[#404943] hover:text-[#0f5238] font-medium inline-flex items-center gap-1.5"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

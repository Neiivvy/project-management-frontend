"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { signup } from "@/api/auth";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { getDashboardRoute } from "@/utils/auth";


export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerStore = useAuthStore((state) => state.login);
  const router = useRouter();

const onSubmit = async (data) => {
  try {
    const response = await signup(data);

    registerStore(response.data);

    const route = getDashboardRoute(response.data.user.role);

    router.push(route);
  } catch (error) {
    console.log(error);
  }
};



  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#181d19] mb-1">
          Create an account
        </h1>
        <p className="text-sm text-[#404943]">
          Sign up to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-sm font-medium">
            Full Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Rhaenyra Targaryen"
            {...register("name", {
              required: "Full name is required",
            })}
            className="w-full px-4 py-2.5 bg-[#ecefe9] border rounded-lg"
          />

          {errors.name && (
            <p className="text-red-500 text-xs">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-medium">
            Email Address
          </label>

          <input
            id="email"
            type="email"
            placeholder="name@gmail.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Enter a valid email",
              },
            })}
            className="w-full px-4 py-2.5 bg-[#ecefe9] border rounded-lg"
          />

          {errors.email && (
            <p className="text-red-500 text-xs">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-4 py-2.5 bg-[#ecefe9] border rounded-lg"
          />

          {errors.password && (
            <p className="text-red-500 text-xs">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-[#0f5238] text-white rounded-lg"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login">Login</Link>
      </p>
    </div>
  );
}
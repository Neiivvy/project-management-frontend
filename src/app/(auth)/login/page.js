"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { login } from "@/api/auth";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { getDashboardRoute } from "@/utils/auth";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginStore = useAuthStore((state) => state.login);
  const router = useRouter();

const onSubmit = async (data) => {
  try {
    const response = await login(data);

    loginStore(response.data);

    const route = getDashboardRoute(response.data.user.role);

    router.push(route);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="w-full max-w-sm">

      <div className="mb-8">
        <h1 className="text-2xl font-semibold">
          Welcome back
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <div>
          <label>Email Address</label>

          <input
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

        <div>

          <div className="flex justify-between">
            <label>Password</label>

            <Link href="/forgot-password">
              Forgot password?
            </Link>
          </div>

          <input
            type="password"
            placeholder="••••••••"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message:
                  "Password must be at least 6 characters",
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
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register">
          Register
        </Link>
      </p>

    </div>
  );
}
import React from "react";
import hero from "@/assets/images/AuthImg.png";
import Image from "next/image";
import Link from "next/link";
import { Home_route } from "@/constants/routes";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const AuthLayout = ({ children }) => {
  return (
    <section className="h-screen overflow-hidden bg-[#f7faf4]">
      <div className="container mx-auto px-4 h-full flex  items-center">
        <div className="grid lg:grid-cols-2 min-h-150 w-full shadow-xl rounded-2xl overflow-hidden border border-[#bfc9c1] bg-white">
          {/* Image */}
          <div className="relative hidden lg:block h-full">
            <Image
              src={hero}
              alt="Auth Hero"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-[#0f5238]/20" />
          </div>

          {/* Form */}
          <div className="relative flex flex-col items-center justify-center p-6 overflow-y-auto bg-[#f7faf4]">
            <Link
              href={Home_route}
             className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-[#0f5238] hover:bg-[#0f5238] hover:text-white"
            >
              <FaArrowAltCircleLeft />
              Go Back
            </Link>
            {/* Home link */}
            <Link
              href={Home_route}
              className="flex items-center gap-2 text-[#0f5238] mb-10 self-center"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f5238] text-white text-sm font-bold">
                CW
              </span>
              <span className="font-semibold tracking-tight text-[#0f5238]">
                Co-Work
              </span>
              <span className="sr-only">Home</span>
            </Link>

            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;

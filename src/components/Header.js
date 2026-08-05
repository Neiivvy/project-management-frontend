"use client";

import { useState } from "react";

import {
  Home_route,
  Login_route,
  navMenu,
  Register_route,
} from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTimes } from "react-icons/fa";

export default function Header() {
  const pathName = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#bfc9c1] shadow-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="flex items-center gap-2 text-[#0f5238]" href="/">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f5238] text-white text-sm font-bold">
                CW
              </span>

              <span className="font-semibold tracking-tight text-[#0f5238]">
                Co-Work
              </span>

              <span className="sr-only">Home</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm font-semibold">
                {navMenu.map((menu) => {
                  const isActiveRoute =
                    pathName === menu.route ||
                    (menu.route !== Home_route &&
                      pathName.startsWith(menu.route));

                  return (
                    <li key={menu.route}>
                      <Link
                        href={menu.route}
                        className={`px-3 py-2 transition-colors ${
                          isActiveRoute
                            ? "rounded-md bg-[#0f5238] text-white"
                            : "text-[#404943] hover:text-[#0f5238]"
                        }`}
                      >
                        {menu.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <Link
                className="rounded-full bg-[#0f5238] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-90 transition"
                href={Login_route}
              >
                Login
              </Link>

              <div className="hidden sm:flex">
                <Link
                  className="rounded-full bg-[#dce5df] px-5 py-2.5 text-sm font-medium text-[#0f5238] hover:bg-[#c0c9c4] transition"
                  href={Register_route}
                >
                  Register
                </Link>
              </div>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="block md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="rounded-md bg-[#ecefe9] p-2 text-[#404943] transition hover:text-[#0f5238]"
                aria-label="Open menu"
              >
                <span className="text-xl">☰</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-[85vw] max-w-xs bg-white border-l border-slate-200 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <Link
            className="flex items-center gap-2 text-[#0f5238]"
            href="/"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f5238] text-white text-sm font-bold">
              CW
            </span>
            <span className="font-semibold tracking-tight text-[#0f5238]">
              Co-Work
            </span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-2 transition hover:bg-slate-100"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        {/* Mobile Menu Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {navMenu.map((menu) => {
              const isActiveRoute =
                pathName === menu.route ||
                (menu.route !== Home_route &&
                  pathName.startsWith(menu.route));

              return (
                <Link
                  key={menu.route}
                  href={menu.route}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActiveRoute
                      ? "bg-[#0f5238] text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-[#0f5238]"
                  }`}
                >
                  {menu.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Auth Buttons */}
          <div className="mt-6 space-y-3">
            <Link
              href={Login_route}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full rounded-full bg-[#0f5238] px-5 py-3 text-center text-sm font-medium text-white shadow-sm hover:opacity-90 transition"
            >
              Login
            </Link>
            <Link
              href={Register_route}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full rounded-full bg-[#dce5df] px-5 py-3 text-center text-sm font-medium text-[#0f5238] hover:bg-[#c0c9c4] transition"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

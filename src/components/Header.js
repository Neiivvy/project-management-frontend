"use client";

import {
  Home_route,
  Login_route,
  navMenu,
  Register_route,
} from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathName = usePathname();

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

            <div className="block md:hidden">
              <button className="rounded-md bg-[#ecefe9] p-2 text-[#404943] transition hover:text-[#0f5238]">
                <span className="text-xl">☰</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
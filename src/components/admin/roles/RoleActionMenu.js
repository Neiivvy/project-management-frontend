"use client";

import { useEffect, useRef, useState } from "react";
import {
  MoreVertical,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";

export default function RoleActionMenu({
  user,
  onAction,
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleToggle = () => {
    if (!open && menuRef.current) {
      const buttonPosition =
        menuRef.current.getBoundingClientRect();

      const spaceBelow =
        window.innerHeight - buttonPosition.bottom;

      const menuHeight = 120;

      setOpenUp(spaceBelow < menuHeight);
    }

    setOpen((prev) => !prev);
  };

  const handleAction = (action) => {
    setOpen(false);
    onAction(user, action);
  };

  return (
    <div
      className="relative inline-block text-left"
      ref={menuRef}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className="
          rounded-lg
          p-2
          text-gray-400
          transition-all
          duration-200
          hover:bg-[#0f5238]/10
          hover:text-[#0f5238]
          disabled:opacity-40
        "
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div
          className={`
            absolute
            right-0
            z-50
            w-52
            overflow-hidden
            rounded-xl
            border
            border-gray-100
            bg-white
            shadow-lg
            shadow-gray-200/50
            animate-slide-in-right
            ${
              openUp
                ? "bottom-full mb-2"
                : "mt-2"
            }
          `}
        >
          {user.role === "member" && (
            <button
              onClick={() =>
                handleAction("promote")
              }
              className="
                flex
                w-full
                items-center
                gap-2.5
                px-4
                py-2.5
                text-sm
                font-medium
                text-gray-700
                transition-all
                duration-150
                hover:bg-[#0f5238]/5
                hover:text-[#0f5238]
              "
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-green-600">
                <ArrowUpCircle size={14} />
              </div>
              Promote to Project Manager
            </button>
          )}

          {user.role === "project_manager" && (
            <button
              onClick={() =>
                handleAction("demote")
              }
              className="
                flex
                w-full
                items-center
                gap-2.5
                px-4
                py-2.5
                text-sm
                font-medium
                text-gray-700
                transition-all
                duration-150
                hover:bg-orange-50
                hover:text-orange-600
              "
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                <ArrowDownCircle size={14} />
              </div>
              Demote to Member
            </button>
          )}

          {user.role === "admin" && (
            <div className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-400">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
              No actions available
            </div>
          )}
        </div>
      )}
    </div>
  );
}
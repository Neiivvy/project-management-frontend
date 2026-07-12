"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export default function RoleActionMenu({
  user,
  onAction,
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAction = (action) => {
    setOpen(false);
    onAction(user, action);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className="
          rounded-lg
          p-2
          text-gray-500
          transition
          hover:bg-gray-100
          hover:text-gray-700
          disabled:opacity-50
        "
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            z-20
            mt-2
            w-52
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-lg
          "
        >
          {user.role === "member" && (
            <button
              onClick={() => handleAction("promote")}
              className="
                flex
                w-full
                items-center
                gap-2
                px-4
                py-3
                text-sm
                text-gray-700
                hover:bg-gray-50
              "
            >
              <ArrowUpCircle
                size={16}
                className="text-green-600"
              />
              Promote to Project Manager
            </button>
          )}

          {user.role === "project_manager" && (
            <button
              onClick={() => handleAction("demote")}
              className="
                flex
                w-full
                items-center
                gap-2
                px-4
                py-3
                text-sm
                text-gray-700
                hover:bg-gray-50
              "
            >
              <ArrowDownCircle
                size={16}
                className="text-orange-500"
              />
              Demote to Member
            </button>
          )}

          {user.role === "admin" && (
            <div className="px-4 py-3 text-sm text-gray-400">
              No actions available
            </div>
          )}
        </div>
      )}
    </div>
  );
}
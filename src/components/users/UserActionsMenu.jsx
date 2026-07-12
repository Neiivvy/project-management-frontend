"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  MoreVertical,
  Eye,
  PenLine,
  Trash2,
} from "lucide-react";

export default function UserActionsMenu({
  onView,
  onEdit,
  onDelete,
}) {
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);

  const containerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  useLayoutEffect(() => {
    if (!open || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    // Approximate menu height
    const MENU_HEIGHT = 140;

    const spaceBelow = window.innerHeight - rect.bottom;

    setOpenUp(spaceBelow < MENU_HEIGHT);
  }, [open]);

  const items = [
    {
      label: "View profile",
      icon: Eye,
      onClick: onView,
    },
    {
      label: "Edit user",
      icon: PenLine,
      onClick: onEdit,
    },
    {
      label: "Delete user",
      icon: Trash2,
      onClick: onDelete,
      danger: true,
    },
  ];

  return (
   <div
  ref={containerRef}
  className="relative inline-block"
>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open actions menu"
        className="flex h-8 w-8 items-center justify-center rounded-lg
                   text-[#d2e5db]
                   transition-all duration-200
                   hover:bg-[#0f5238]/20
                   hover:text-white"
      >
        <MoreVertical size={16} />
      </button>

      {open && (
       <div
  ref={menuRef}
  className={`
    fixed
    z-999
            w-44
            overflow-hidden
            rounded-xl
            border border-[#40916c]/25
            bg-[#10241b]
            py-1
            shadow-2xl shadow-black/50
            backdrop-blur-xl
            animate-[fadeSlide_0.15s_ease-out]
            origin-top-right
          right-0
          `}
        >
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setOpen(false);
                item.onClick?.();
              }}
              className={`flex w-full items-center gap-2.5 px-3.5 py-2
                text-left text-xs font-medium transition-colors duration-150
                ${
                  item.danger
                    ? "text-[#ef8b71] hover:bg-[#e0765a]/20"
                    : "text-[#edf8f2] hover:bg-[#0f5238]/18 hover:text-white"
                }`}
            >
              <item.icon
                size={14}
                strokeWidth={1.75}
              />

              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
"use client";

import Avatar from "@/components/shared/Avatar";

export default function TeamAvatarStack({ team = [], max = 3 }) {
  const visible = team.slice(0, max);
  const overflow = team.length - visible.length;

  return (
    <div className="flex items-center">
      {visible.map((member, i) => (
        <div
          key={member.id}
          style={{
            zIndex: visible.length - i,
            marginLeft: i === 0 ? 0 : -10,
          }}
          className="
            rounded-full
            ring-2 ring-white
            border border-[#dbe6e1]
            transition-transform
            duration-200
            hover:z-10
            hover:scale-110
          "
        >
          <Avatar name={member.name} size="sm" />
        </div>
      ))}

      {overflow > 0 && (
        <div
          style={{ marginLeft: -10 }}
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            border border-[#dbe6e1]
            bg-[#f7fbf9]
            text-[10px]
            font-semibold
            text-[#4f5d57]
            ring-2
            ring-white
          "
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
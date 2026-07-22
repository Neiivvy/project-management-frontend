"use client";

export default function UserSelector({
  users = [],
  selectedUser,
  onSelect,
}) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select User Report
      </label>

      <select
        value={selectedUser || ""}
        onChange={(e) => onSelect(e.target.value)}
        className="
          w-full
          rounded-lg
          border
          border-gray-300
          px-3
          py-2
          text-gray-800
          focus:outline-none
          focus:ring-2
          focus:ring-green-500
        "
      >
        <option value="">
          Select a user
        </option>

        {users.map((user) => (
          <option
            key={user._id || user.id}
            value={user._id || user.id}
          >
            {user.name} ({user.role})
          </option>
        ))}
      </select>
    </div>
  );
}
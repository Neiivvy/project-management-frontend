"use client";

import { useState } from "react";

export default function EditUserModal({
  open,
  user,
  onClose,
  onSave,
  isSubmitting,
}) {
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      name: name.trim(),
      email: email.trim(),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-xl">

        <div className="border-b border-gray-100 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Edit User
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update the user&apos;s information.
          </p>
        </div>


        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:border-[#0f5238]"
            />
          </div>


          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:border-[#0f5238]"
            />
          </div>


          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#0f5238] px-4 py-2 text-sm font-medium text-white hover:bg-[#0c4230]"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
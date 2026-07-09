"use client";

import { FaTimes } from "react-icons/fa";

export default function TeamModal({ show, setShow }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-125 rounded-xl p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Create Team</h2>

          <button onClick={() => setShow(false)}>
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4 mt-6">
          <input
            className="w-full border p-3 rounded-lg"
            placeholder="Team Name"
          />

          <input
            className="w-full border p-3 rounded-lg"
            placeholder="Team Lead"
          />

          <input
            className="w-full border p-3 rounded-lg"
            placeholder="Technology"
          />

          <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
            Create Team
          </button>
        </div>
      </div>
    </div>
  );
}

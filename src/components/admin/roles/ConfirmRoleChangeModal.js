import React from "react";

const ConfirmRoleChangeModal = ({ open, user, onCancel, onConfirm, isSubmitting }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl border border-gray-200">
        <h3 className="text-base font-semibold text-gray-900">Promote user</h3>
        <p className="mt-2 text-sm text-gray-500">
          Promote <span className="font-medium text-gray-900">{user?.name}</span> to{" "}
          <span className="font-medium text-[#0f5238]">Project Manager</span>? This action cannot be undone here.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="rounded-lg bg-[#0f5238] px-4 py-2 text-sm font-medium text-white hover:bg-[#0c4230] disabled:opacity-50"
          >
            {isSubmitting ? "Promoting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRoleChangeModal;
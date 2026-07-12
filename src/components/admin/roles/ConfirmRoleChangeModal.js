"use client";

import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

const ConfirmRoleChangeModal = ({
  open,
  user,
  action,
  onCancel,
  onConfirm,
  isSubmitting,
}) => {
  if (!open || !user) return null;

  const isPromote = action === "promote";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-full ${
              isPromote
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            {isPromote ? (
              <ArrowUpCircle size={22} />
            ) : (
              <ArrowDownCircle size={22} />
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {isPromote ? "Promote User" : "Demote User"}
            </h3>

            <p className="text-sm text-gray-500">
              Please confirm this action.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-700">
            {isPromote ? (
              <>
                Are you sure you want to promote{" "}
                <span className="font-semibold text-gray-900">
                  {user.name}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-[#0f5238]">
                  Project Manager
                </span>
                ?
              </>
            ) : (
              <>
                Are you sure you want to demote{" "}
                <span className="font-semibold text-gray-900">
                  {user.name}
                </span>{" "}
                back to{" "}
                <span className="font-semibold text-orange-600">
                  Member
                </span>
                ?
              </>
            )}
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition disabled:opacity-50 ${
              isPromote
                ? "bg-[#0f5238] hover:bg-[#0c4230]"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {isSubmitting
              ? isPromote
                ? "Promoting..."
                : "Demoting..."
              : isPromote
              ? "Promote"
              : "Demote"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRoleChangeModal;
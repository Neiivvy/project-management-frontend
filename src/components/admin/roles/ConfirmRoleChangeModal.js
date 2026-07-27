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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 animate-fade-in-up">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl animate-fade-in-up">
        <div className="mb-5 flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-full shadow-sm ${
              isPromote
                ? "bg-linear-to-br from-[#0f5238] to-[#40916c] text-white"
                : "bg-linear-to-br from-orange-500 to-orange-600 text-white"
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
              Please confirm this action
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-linear-to-r from-gray-50 to-white p-4 border border-gray-100">
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
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:shadow-sm disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 ${
              isPromote
                ? "bg-linear-to-r from-[#0f5238] to-[#1a6b4a] hover:from-[#0c4230] hover:to-[#0f5238]"
                : "bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
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
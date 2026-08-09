"use client";

import { useState, useEffect } from "react";
import { X, AlertTriangle, UserCog } from "lucide-react";
import Avatar from "@/components/shared/Avatar";

export default function ReassignManagerModal({
  isOpen,
  onClose,
  currentManagerId,
  availableManagers = [],
  onConfirm,
  isSubmitting,
}) {
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [step, setStep] = useState("select"); // "select" | "confirm"

  const eligibleManagers = availableManagers.filter(
    (pm) => pm._id !== currentManagerId,
  );

  const selectedManager = eligibleManagers.find(
    (pm) => pm._id === selectedManagerId,
  );

  useEffect(() => {
    if (isOpen) {
      setSelectedManagerId("");
      setStep("select");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleContinue = () => {
    if (!selectedManagerId) return;
    setStep("confirm");
  };

  const handleConfirm = async () => {
    await onConfirm(selectedManagerId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-100 animate-[fadeSlide_0.25s_ease-out]">
        {step === "select" ? (
          <>
            <div className="flex items-center gap-3 p-6 border-b border-slate-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f5238]/10 text-[#0f5238]">
                <UserCog size={20} />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[#181d19]">
                  Reassign Project Manager
                </h2>
                <p className="text-xs text-slate-500">
                  Choose a new manager for this project
                </p>
              </div>
            </div>

            <div className="p-6">
              {eligibleManagers.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm text-slate-500">
                    No other project managers available. Promote a member to
                    Project Manager first.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {eligibleManagers.map((pm) => (
                    <button
                      key={pm._id}
                      onClick={() => setSelectedManagerId(pm._id)}
                      className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                        selectedManagerId === pm._id
                          ? "border-[#0f5238] bg-[#0f5238]/5 ring-1 ring-[#0f5238]"
                          : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <Avatar name={pm.name} size="sm" variant="dark" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#181d19] truncate">
                          {pm.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {pm.email}
                        </p>
                      </div>
                      <div
                        className={`h-4 w-4 rounded-full border-2 flex-shrink-0 ${
                          selectedManagerId === pm._id
                            ? "border-[#0f5238] bg-[#0f5238]"
                            : "border-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                disabled={!selectedManagerId}
                className="px-4 py-2 text-sm font-medium text-white bg-[#0f5238] rounded-lg hover:bg-[#0b402c] transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center text-center p-6 pb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600 mb-4">
                <AlertTriangle size={22} />
              </div>
              <h2 className="text-base font-semibold text-[#181d19]">
                Are you sure?
              </h2>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                This project will be reassigned to{" "}
                <span className="font-medium text-[#181d19]">
                  {selectedManager?.name}
                </span>
                . They will gain full management access to this project and its
                tasks.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 p-6 pt-2">
              <button
                onClick={() => setStep("select")}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 transition disabled:opacity-40"
              >
                Go back
              </button>
              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="px-5 py-2 text-sm font-medium text-white bg-[#0f5238] rounded-lg hover:bg-[#0b402c] transition disabled:opacity-60 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Reassigning...
                  </>
                ) : (
                  "Yes, reassign"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

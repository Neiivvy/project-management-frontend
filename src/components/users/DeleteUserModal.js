"use client";

export default function DeleteUserModal({
  open,
  user,
  onClose,
  onConfirm,
  isSubmitting,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white shadow-xl">

        <div className="px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Delete User
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Are you sure you want to delete{" "}
            <span className="font-medium text-gray-900">
              {user?.name}
            </span>
            ?
          </p>

          <p className="mt-2 text-xs text-red-500">
            This action cannot be undone.
          </p>
        </div>


        <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">

          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="
              rounded-xl
              border border-gray-300
              px-4 py-2
              text-sm font-medium
              text-gray-700
              hover:bg-gray-50
              disabled:opacity-50
            "
          >
            Cancel
          </button>


          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="
              rounded-xl
              bg-red-600
              px-4 py-2
              text-sm font-medium
              text-white
              hover:bg-red-700
              disabled:opacity-50
            "
          >
            {isSubmitting ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
}
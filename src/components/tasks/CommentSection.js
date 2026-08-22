"use client";

import { useEffect, useState } from "react";

import { FaTrash, FaPaperPlane, FaUserCircle } from "react-icons/fa";

import useCommentStore from "@/store/useCommentStore";
import useAuthStore from "@/store/useAuthStore";

export default function CommentSection({ taskId }) {
  const { comments, fetchComments, addComment, removeComment } =
    useCommentStore();

  const user = useAuthStore((state) => state.user);

  const [text, setText] = useState("");

  // ==================================================
  // Fetch comments
  // ==================================================

  useEffect(() => {
    if (taskId) {
      fetchComments(taskId);
    }
  }, [fetchComments, taskId]);

  // ==================================================
  // Add comment
  // ==================================================

  const handleSubmit = async () => {
    if (!text.trim()) return;

    const success = await addComment({
      taskId,
      text: text.trim(),
    });

    if (success) {
      setText("");
    }
  };

  // ==================================================
  // Delete own comment
  // ==================================================

  const handleDelete = async (commentId) => {
    const confirmDelete = window.confirm("Delete this comment?");

    if (!confirmDelete) return;

    const success = await removeComment(commentId);

    if (success) {
      await fetchComments(taskId);
    }
  };

  return (
    <div className="rounded-3xl border border-[#e4e9e6] bg-white p-6 space-y-6">
      {/* ==================================================
          Header
      ================================================== */}

      <h2 className="text-lg font-semibold text-[#163126]">Comments</h2>

      {/* ==================================================
          Add Comment
      ================================================== */}

      <div className="flex gap-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-2 focus:ring-[#0f5238]/20"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="h-12 w-12 shrink-0 rounded-xl bg-[#0f5238] text-white flex items-center justify-center hover:bg-[#0b412d] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaPaperPlane size={14} />
        </button>
      </div>

      {/* ==================================================
          Comments List
      ================================================== */}

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-5">
            No comments yet
          </p>
        ) : (
          comments.map((comment) => {
            /*
             * ------------------------------------------------
             * Get comment owner's ID
             *
             * Depending on whether the backend populated
             * userId or not, it can be:
             *
             * comment.userId._id
             * comment.userId.id
             * comment.userId
             * ------------------------------------------------
             */

            const commentUserId =
              comment.userId?._id || comment.userId?.id || comment.userId;

            /*
             * ------------------------------------------------
             * Get logged-in user's ID
             *
             * Your auth store may contain either:
             *
             * user._id
             * user.id
             * ------------------------------------------------
             */

            const currentUserId = user?._id || user?.id;

            /*
             * ------------------------------------------------
             * Check whether current user owns comment
             * ------------------------------------------------
             */

            const isOwner =
              commentUserId?.toString() === currentUserId?.toString();

            /*
             * ------------------------------------------------
             * IMPORTANT
             *
             * Only the comment owner can delete.
             *
             * PM's own comment:
             *     DELETE BUTTON -> YES
             *
             * PM viewing member comment:
             *     DELETE BUTTON -> NO
             *
             * Member's own comment:
             *     DELETE BUTTON -> YES
             *
             * Member viewing PM comment:
             *     DELETE BUTTON -> NO
             * ------------------------------------------------
             */

            const canDelete = isOwner;

            return (
              <div
                key={comment._id}
                className="rounded-2xl bg-gray-50 p-4 flex justify-between gap-4"
              >
                {/* ==================================================
                    Comment Content
                ================================================== */}

                <div className="min-w-0 flex-1">
                  {/* User information */}

                  <div className="flex items-center gap-2 mb-2">
                    <FaUserCircle className="shrink-0 text-[#0f5238]" />

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {comment.userId?.name || "Unknown user"}
                      </p>

                      <p className="text-xs text-gray-400">
                        {comment.createdAt
                          ? new Date(comment.createdAt).toLocaleDateString(
                              "en-GB",
                            )
                          : ""}
                      </p>
                    </div>
                  </div>

                  {/* Comment text */}

                  <p className="text-sm text-gray-600 break-words">
                    {comment.text}
                  </p>
                </div>

                {/* ==================================================
                    Delete Button
                ================================================== */}

                {canDelete && (
                  <button
                    type="button"
                    onClick={() => handleDelete(comment._id)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 hover:text-red-700"
                    title="Delete your comment"
                  >
                    <FaTrash size={13} />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

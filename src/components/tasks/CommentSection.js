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

  useEffect(() => {
    if (taskId) fetchComments(taskId);
  }, [fetchComments, taskId]);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    await addComment({
      taskId,

      text,
    });

    setText("");
  };

  return (
    <div className=" rounded-3xl border border-[#e4e9e6] bg-white p-6 space-y-6 ">
      <h2 className=" text-lg font-semibold text-[#163126] ">Comments</h2>

      <div className=" flex gap-3 ">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className=" flex-1 rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-2 focus:ring-[#0f5238]/20 "
        />

        <button
          onClick={handleSubmit}
          className=" h-12 w-12 rounded-xl bg-[#0f5238] text-white flex items-center justify-center hover:bg-[#0b412d] "
        >
          <FaPaperPlane size={14} />
        </button>
      </div>

      <div className=" space-y-4 ">
        {comments.length === 0 ? (
          <p className=" text-sm text-gray-400 text-center py-5 ">
            No comments yet
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className=" rounded-2xl bg-gray-50 p-4 flex justify-between "
            >
              <div>
                <div className=" flex items-center gap-2 mb-2 ">
                  <FaUserCircle className="text-[#0f5238]" />

                  <div>
                    <p className=" text-sm font-semibold text-gray-800 ">
                      {comment.userId?.name}
                    </p>

                    <p className=" text-xs text-gray-400 ">
                      {new Date(comment.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>

                <p className=" text-sm text-gray-600 ">{comment.text}</p>
              </div>
              {(comment.userId?._id === user?._id ||
                comment.userId === user?._id ||
                user?.role === "project_manager" ||
                user?.role === "admin") && (
                <button
                  onClick={async () => {
                    const confirmDelete = window.confirm(
                      "Delete this comment?",
                    );

                    if (!confirmDelete) return;

                    const success = await removeComment(comment._id);

                    if (success) {
                      fetchComments(taskId);
                    }
                  }}
                  className=" flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700
    "
                  title="Delete comment"
                >
                  <FaTrash size={13} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

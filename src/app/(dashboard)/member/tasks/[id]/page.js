"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTask, updateTaskStatus } from "@/api/tasks";
import { getComments, addComment } from "@/api/comments";
import useAuthStore from "@/store/useAuthStore";

const STATUS_OPTIONS = [
  "To Do",
  "In Progress",
  "Review",
  "Completed",
];

const statusColor = {
  "To Do":
    "bg-gray-100 text-gray-700 border-gray-200",

  "In Progress":
    "bg-blue-50 text-blue-700 border-blue-200",

  Review:
    "bg-purple-50 text-purple-700 border-purple-200",

  Completed:
    "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const priorityColor = {
  Low: "text-emerald-600",
  Medium: "text-amber-600",
  High: "text-red-600",
};

export default function MemberTaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const currentUser = useAuthStore((s) => s.user);

  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // LOAD TASK + COMMENTS
  // =========================

  const load = async () => {
    try {
      const [taskRes, commentsRes] =
        await Promise.all([
          getTask(id),
          getComments(id),
        ]);

      setTask(taskRes.data.data);
      setComments(commentsRes.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load task"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      load();
    }, 0);

    return () => clearTimeout(timer);
  }, [id]);

  // =========================
  // CHANGE STATUS
  // =========================

  const handleStatusChange = async (newStatus) => {
    const previousStatus = task.status;

    setTask((currentTask) => ({
      ...currentTask,
      status: newStatus,
    }));

    try {
      await updateTaskStatus(id, newStatus);
    } catch (err) {
      setTask((currentTask) => ({
        ...currentTask,
        status: previousStatus,
      }));

      alert(
        err.response?.data?.message ||
          "Failed to update status"
      );
    }
  };

  // =========================
  // ADD COMMENT
  // =========================

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    setPosting(true);

    try {
      // No file attachment
      const res = await addComment(
        id,
        text.trim(),
        []
      );

      setComments((currentComments) => [
        ...currentComments,
        res.data.data,
      ]);

      setText("");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to post comment"
      );
    } finally {
      setPosting(false);
    }
  };

  // =========================
  // PAGE
  // =========================

  return (
    <main className="min-h-screen rounded-3xl bg-gradient-to-br from-[#effaf3] via-[#f8fcf9] to-[#e3f4e9] p-5 md:p-7">

      {/* =========================
          BACK BUTTON
      ========================= */}

      <button
        onClick={() => router.back()}
        className="mb-5 inline-flex items-center gap-2 rounded-xl border border-[#c9e1d1] bg-white/90 px-3.5 py-2 text-sm font-medium text-[#365f49] shadow-sm transition-all duration-200 hover:-translate-x-0.5 hover:bg-white hover:text-[#17633f]"
      >
        <span className="text-lg">←</span>
        Back
      </button>

      {/* =========================
          LOADING
      ========================= */}

      {loading && (
        <div className="flex min-h-[250px] max-w-3xl items-center justify-center rounded-2xl border border-[#d4e9dc] bg-white/80 shadow-sm">

          <div className="flex flex-col items-center gap-3">

            <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#dcefe3] border-t-[#2d6a4f]" />

            <p className="text-sm font-medium text-[#506158]">
              Loading task...
            </p>

          </div>

        </div>
      )}

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
              !
            </div>

            <div>
              <p className="font-semibold text-red-700">
                Unable to load task
              </p>

              <p className="mt-0.5 text-sm text-red-600">
                {error}
              </p>
            </div>

          </div>

        </div>
      )}

      {/* =========================
          TASK DETAILS
      ========================= */}

      {task && (
        <div className="max-w-3xl">

          <div className="relative mb-5 overflow-hidden rounded-2xl border border-[#b9dcc7] bg-gradient-to-br from-white via-[#f9fcfa] to-[#e7f5ec] p-5 shadow-[0_6px_22px_rgba(45,106,79,0.09)]">

            {/* Top Green Line */}
            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#2d6a4f] via-[#52a675] to-[#a1d8b3]" />

            {/* Decorative Circle */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#a9d8ba]/20 blur-3xl" />

            {/* =========================
                TITLE + STATUS
            ========================= */}

            <div className="relative flex items-center justify-between gap-4">

              <div className="flex min-w-0 items-center gap-3">

                {/* Icon */}

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2d6a4f] to-[#40916c] text-white shadow-md shadow-[#2d6a4f]/20">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a3 3 0 006 0M9 5h6"
                    />
                  </svg>

                </div>

                <div className="min-w-0">

                  <h1 className="truncate text-xl font-bold text-[#173c2b] md:text-2xl">
                    {task.title}
                  </h1>

                  <p className="mt-0.5 text-xs text-[#718077]">
                    Task Details
                  </p>

                </div>

              </div>

              {/* Status Select */}

              <select
                value={task.status}
                onChange={(e) =>
                  handleStatusChange(
                    e.target.value
                  )
                }
                className={`shrink-0 cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold outline-none transition-all hover:shadow-sm ${
                  statusColor[task.status] ||
                  "bg-gray-100 text-gray-700"
                }`}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>

            </div>

            {/* =========================
                DESCRIPTION
            ========================= */}

            {task.description && (
              <div className="relative mt-5 rounded-xl border border-[#d7e9dd] bg-white/70 p-3.5">

                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#2d6a4f]">
                  Description
                </p>

                <p className="text-sm leading-5 text-[#53645a]">
                  {task.description}
                </p>

              </div>
            )}

            {/* =========================
                TASK INFORMATION
            ========================= */}

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">

              {/* Project */}

              <div className="rounded-xl border border-[#d7e9dd] bg-white/70 p-3 transition-all hover:bg-white">

                <p className="text-[11px] font-medium text-[#718077]">
                  Project
                </p>

                <p className="mt-1 text-sm font-semibold text-[#183c2a]">
                  {task.projectId?.title || "—"}
                </p>

              </div>

              {/* Priority */}

              <div className="rounded-xl border border-[#d7e9dd] bg-white/70 p-3 transition-all hover:bg-white">

                <p className="text-[11px] font-medium text-[#718077]">
                  Priority
                </p>

                <p
                  className={`mt-1 text-sm font-semibold ${
                    priorityColor[
                      task.priority
                    ] || ""
                  }`}
                >
                  {task.priority}
                </p>

              </div>

              {/* Due Date */}

              <div className="rounded-xl border border-[#d7e9dd] bg-white/70 p-3 transition-all hover:bg-white">

                <p className="text-[11px] font-medium text-[#718077]">
                  Due Date
                </p>

                <p className="mt-1 text-sm font-semibold text-[#183c2a]">
                  {task.deadline
                    ? new Date(
                        task.deadline
                      ).toLocaleDateString()
                    : "Not set"}
                </p>

              </div>

              {/* Assigned By */}

              <div className="rounded-xl border border-[#d7e9dd] bg-white/70 p-3 transition-all hover:bg-white">

                <p className="text-[11px] font-medium text-[#718077]">
                  Assigned By
                </p>

                <p className="mt-1 text-sm font-semibold text-[#183c2a]">
                  {task.assignedBy?.name ||
                    "—"}
                </p>

              </div>

            </div>

          </div>

          {/* =========================
              COMMENTS CARD
          ========================= */}

          <div className="relative max-w-3xl overflow-hidden rounded-2xl border border-[#b9dcc7] bg-gradient-to-br from-white via-[#f9fcfa] to-[#e7f5ec] p-5 shadow-[0_6px_22px_rgba(45,106,79,0.08)]">

            {/* Green Line */}

            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#40916c] to-[#a1d8b3]" />

            {/* =========================
                COMMENTS HEADER
            ========================= */}

            <div className="relative mb-5 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#dff1e5] text-[#287a50]">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 10h8M8 14h5m7-2a8 8 0 01-8 8 8 8 0 01-4.9-1.68L4 19l.68-3.1A8 8 0 0112 20"
                    />
                  </svg>

                </div>

                <div>

                  <h2 className="text-lg font-bold text-[#173c2b]">
                    Comments
                  </h2>

                  <p className="text-[11px] text-[#718077]">
                    Discuss this task
                  </p>

                </div>

              </div>

              {/* Comment Count */}

              <div className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-[#e2f3e8] px-2 text-xs font-bold text-[#17633f]">
                {comments.length}
              </div>

            </div>

            {/* =========================
                COMMENTS LIST
            ========================= */}

            <div className="mb-5 space-y-3">

              {comments.length === 0 && (
                <div className="rounded-xl border border-dashed border-[#bddac7] bg-white/60 p-6 text-center">

                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#e4f3e9]">

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#2d6a4f]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 10h8M8 14h5m7-2a8 8 0 01-8 8 8 8 0 01-4.9-1.68L4 19l.68-3.1A8 8 0 0112 20"
                      />
                    </svg>

                  </div>

                  <p className="mt-2 text-sm font-semibold text-[#365f49]">
                    No comments yet
                  </p>

                  <p className="mt-1 text-xs text-[#718077]">
                    Be the first to comment.
                  </p>

                </div>
              )}

              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="rounded-xl border border-[#d7e9dd] bg-white/75 p-3.5 transition-all hover:bg-white hover:shadow-sm"
                >

                  {/* Comment User */}

                  <div className="flex items-center gap-2.5">

                    {/* Avatar */}

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2d6a4f] to-[#40916c] text-xs font-bold text-white">
                      {comment.userId?.name
                        ?.charAt(0)
                        .toUpperCase() ||
                        "U"}
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs font-semibold text-[#183c2a]">

                        {comment.userId?.name ||
                          "User"}

                        {comment.userId?._id ===
                          currentUser?._id && (
                          <span className="ml-1.5 rounded-full bg-[#e2f3e8] px-1.5 py-0.5 text-[9px] font-semibold text-[#287a50]">
                            You
                          </span>
                        )}

                      </p>

                      <p className="text-[10px] text-[#718077]">
                        {new Date(
                          comment.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                  </div>

                  {/* Comment Text */}

                  <p className="mt-2.5 rounded-lg bg-[#f4faf6] p-2.5 text-sm leading-5 text-[#33483b]">
                    {comment.text}
                  </p>

                </div>
              ))}

            </div>

            {/* 
                ADD COMMENT
                               */}

            <div className="border-t border-[#dcebe1] pt-4">

              <h3 className="mb-2.5 text-xs font-bold text-[#365f49]">
                Add a comment
              </h3>

              <form
                onSubmit={handleAddComment}
                className="space-y-2.5"
              >

                {/* Comment Input */}

                <textarea
                  value={text}
                  onChange={(e) =>
                    setText(e.target.value)
                  }
                  placeholder="Write a comment..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-[#cfe2d5] bg-white/80 p-3 text-sm text-[#183c2a] outline-none transition-all placeholder:text-[#91a198] focus:border-[#40916c] focus:bg-white focus:ring-4 focus:ring-[#40916c]/10"
                />

                {/* Submit */}

                <button
                  type="submit"
                  disabled={posting}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2d6a4f] to-[#40916c] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-[#2d6a4f]/20 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {posting ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Posting...
                    </>
                  ) : (
                    <>
                      Post comment
                      <span>→</span>
                    </>
                  )}
                </button>

              </form>

            </div>

          </div>

        </div>
      )}
    </main>
  );
}
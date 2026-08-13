"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTask, updateTaskStatus } from "@/api/tasks";
import { getComments, addComment } from "@/api/comments";
import useAuthStore from "@/store/useAuthStore";

const STATUS_OPTIONS = ["To Do", "In Progress", "Review", "Completed"];

const statusColor = {
  "To Do": "bg-gray-200 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Review": "bg-purple-100 text-purple-700",
  "Completed": "bg-green-100 text-green-700",
};

const priorityColor = {
  Low: "text-green-600",
  Medium: "text-yellow-600",
  High: "text-red-600",
};

export default function MemberTaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const currentUser = useAuthStore((s) => s.user);

  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const [taskRes, commentsRes] = await Promise.all([
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
    const timer = setTimeout(() => load(), 0);
    return () => clearTimeout(timer);
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    const prev = task.status;

    setTask((t) => ({
      ...t,
      status: newStatus,
    }));

    try {
      await updateTaskStatus(id, newStatus);
    } catch (err) {
      setTask((t) => ({
        ...t,
        status: prev,
      }));

      alert(
        err.response?.data?.message ||
          "Failed to update status"
      );
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    setPosting(true);

    try {
      const attachments = fileUrl.trim()
        ? [fileUrl.trim()]
        : [];

      const res = await addComment(
        id,
        text.trim(),
        attachments
      );

      setComments((c) => [...c, res.data.data]);

      setText("");
      setFileUrl("");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to post comment"
      );
    } finally {
      setPosting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#eaf7ef] p-8">
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="
            text-sm
            font-medium
            text-[#2d6a4f]
            mb-6
            px-4
            py-2
            rounded-lg
            bg-[#f4fbf6]
            border
            border-[#c7e3d1]
            hover:bg-[#dff3e6]
            transition
          "
        >
          ← Back
        </button>

        {/* Loading */}
        {loading && (
          <div className="bg-[#f4fbf6] border border-[#c7e3d1] rounded-2xl p-6 shadow-sm">
            <p className="text-[#527565]">
              Loading task...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 shadow-sm">
            <p className="text-red-600">
              {error}
            </p>
          </div>
        )}

        {task && (
          <>
            {/* Task Details Card */}
            <div
              className="
                bg-[#f4fbf6]
                rounded-3xl
                shadow-[0_5px_20px_rgba(30,90,55,0.08)]
                border
                border-[#c7e3d1]
                p-7
                mb-6
              "
            >

              {/* Task Header */}
              <div className="flex justify-between items-start gap-4">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#6a8878] mb-2">
                    Task Details
                  </p>

                  <h1 className="text-2xl font-bold text-[#123524]">
                    {task.title}
                  </h1>
                </div>

                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(e.target.value)
                  }
                  className={`
                    text-xs
                    font-semibold
                    rounded-full
                    px-4
                    py-2
                    border-0
                    outline-none
                    cursor-pointer
                    shadow-sm
                    ${statusColor[task.status] || "bg-gray-100"}
                  `}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              {task.description && (
                <div className="mt-5 bg-[#eaf7ef] border border-[#d5e9dc] rounded-xl p-4">
                  <p className="text-sm text-[#527565] leading-6">
                    {task.description}
                  </p>
                </div>
              )}

              {/* Task Information */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Project */}
                <div className="bg-[#eaf7ef] border border-[#d5e9dc] rounded-xl p-4">
                  <p className="text-xs font-medium text-[#668273] mb-1">
                    Project
                  </p>

                  <p className="text-sm text-[#123524] font-semibold">
                    {task.projectId?.title || "—"}
                  </p>
                </div>

                {/* Priority */}
                <div className="bg-[#eaf7ef] border border-[#d5e9dc] rounded-xl p-4">
                  <p className="text-xs font-medium text-[#668273] mb-1">
                    Priority
                  </p>

                  <p
                    className={`text-sm font-semibold ${
                      priorityColor[task.priority] || ""
                    }`}
                  >
                    {task.priority}
                  </p>
                </div>

                {/* Due Date */}
                <div className="bg-[#eaf7ef] border border-[#d5e9dc] rounded-xl p-4">
                  <p className="text-xs font-medium text-[#668273] mb-1">
                    Due Date
                  </p>

                  <p className="text-sm text-[#123524] font-semibold">
                    {task.deadline
                      ? new Date(
                          task.deadline
                        ).toLocaleDateString()
                      : "Not set"}
                  </p>
                </div>

                {/* Assigned By */}
                <div className="bg-[#eaf7ef] border border-[#d5e9dc] rounded-xl p-4">
                  <p className="text-xs font-medium text-[#668273] mb-1">
                    Assigned By
                  </p>

                  <p className="text-sm text-[#123524] font-semibold">
                    {task.assignedBy?.name || "—"}
                  </p>
                </div>

                {/* Status */}
                <div className="bg-[#eaf7ef] border border-[#d5e9dc] rounded-xl p-4 md:col-span-2">
                  <p className="text-xs font-medium text-[#668273] mb-1">
                    Status
                  </p>

                  <p className="text-sm text-[#123524] font-semibold">
                    {task.status}
                  </p>
                </div>

              </div>
            </div>

            {/* Comments Card */}
            <div
              className="
                bg-[#f4fbf6]
                rounded-3xl
                shadow-[0_5px_20px_rgba(30,90,55,0.08)]
                border
                border-[#c7e3d1]
                p-7
              "
            >

              <div className="mb-5">
                <h2 className="text-xl font-bold text-[#123524]">
                  Comments
                </h2>

                <p className="text-sm text-[#668273] mt-1">
                  Discussion and updates for this task
                </p>
              </div>

              {/* Comments List */}
              <div className="space-y-4 mb-7">

                {comments.length === 0 && (
                  <div className="bg-[#eaf7ef] border border-[#d5e9dc] rounded-xl p-5">
                    <p className="text-sm text-[#527565]">
                      No comments yet.
                    </p>
                  </div>
                )}

                {comments.map((c) => (
                  <div
                    key={c._id}
                    className="
                      bg-[#eaf7ef]
                      border
                      border-[#d5e9dc]
                      rounded-xl
                      p-4
                    "
                  >

                    <div className="flex justify-between items-start gap-4 text-xs text-[#668273] mb-2">

                      <span className="font-semibold text-[#123524]">
                        {c.userId?.name}
                        {c.userId?._id === currentUser?._id &&
                          " (you)"}
                      </span>

                      <span>
                        {new Date(
                          c.createdAt
                        ).toLocaleString()}
                      </span>

                    </div>

                    <p className="text-sm text-[#294c39] leading-6">
                      {c.text}
                    </p>

                    {c.attachments?.length > 0 && (
                      <div className="mt-3 space-y-2">

                        {c.attachments.map((url, i) => (
                          <a
                            key={i}
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="
                              block
                              text-xs
                              text-[#2d6a4f]
                              underline
                              break-all
                              bg-[#dff3e6]
                              rounded-lg
                              px-3
                              py-2
                              hover:bg-[#cdebd8]
                              transition
                            "
                          >
                            📎 {url}
                          </a>
                        ))}

                      </div>
                    )}

                  </div>
                ))}

              </div>

              {/* Comment Form */}
              <form
                onSubmit={handleAddComment}
                className="
                  bg-[#eaf7ef]
                  border
                  border-[#d5e9dc]
                  rounded-xl
                  p-5
                  space-y-3
                "
              >

                <textarea
                  value={text}
                  onChange={(e) =>
                    setText(e.target.value)
                  }
                  placeholder="Write a comment..."
                  rows={3}
                  className="
                    w-full
                    rounded-lg
                    border
                    border-[#c7e3d1]
                    bg-[#f8fdf9]
                    p-3
                    text-sm
                    text-[#123524]
                    outline-none
                    focus:border-[#2d6a4f]
                    focus:ring-2
                    focus:ring-[#d5e9dc]
                    transition
                  "
                />

                <input
                  value={fileUrl}
                  onChange={(e) =>
                    setFileUrl(e.target.value)
                  }
                 
                />

                <button
                  type="submit"
                  disabled={posting}
                  className="
                    rounded-lg
                    bg-[#2d6a4f]
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    hover:bg-[#245a42]
                    transition
                    disabled:opacity-50
                  "
                >
                  {posting
                    ? "Posting..."
                    : "Post Comment"}
                </button>

              </form>

            </div>
          </>
        )}
      </div>
    </main>
  );
}
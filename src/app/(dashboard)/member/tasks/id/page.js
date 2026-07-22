"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import { getTask, updateTaskStatus } from "@/api/tasks";
import { getComments, addComment } from "@/api/comments";
import useAuthStore from "@/store/authStore";

const STATUS_OPTIONS = ["To Do", "In Progress", "Review", "Completed"];

const statusColor = {
  "To Do": "bg-gray-200 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Review": "bg-purple-100 text-purple-700",
  "Completed": "bg-green-100 text-green-700",
};

const priorityColor = { Low: "text-green-600", Medium: "text-yellow-600", High: "text-red-600" };

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
      const [taskRes, commentsRes] = await Promise.all([getTask(id), getComments(id)]);
      setTask(taskRes.data.data);
      setComments(commentsRes.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const handleStatusChange = async (newStatus) => {
    const prev = task.status;
    setTask((t) => ({ ...t, status: newStatus }));
    try {
      await updateTaskStatus(id, newStatus);
    } catch (err) {
      setTask((t) => ({ ...t, status: prev }));
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setPosting(true);
    try {
      const attachments = fileUrl.trim() ? [fileUrl.trim()] : [];
      const res = await addComment(id, text.trim(), attachments);
      setComments((c) => [...c, res.data.data]);
      setText("");
      setFileUrl("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post comment");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f7f6f6]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8 max-w-3xl">
          <button onClick={() => router.back()} className="text-sm text-[#404943] mb-4">
            ← Back
          </button>

          {loading && <p className="text-[#404943]">Loading task...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {task && (
            <>
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-bold text-[#181d19]">{task.title}</h1>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className={`text-xs font-medium rounded-full px-3 py-1.5 border-0 outline-none cursor-pointer ${statusColor[task.status] || "bg-gray-100"}`}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {task.description && (
                  <p className="mt-3 text-sm text-[#404943]">{task.description}</p>
                )}

                <div className="mt-5 grid grid-cols-2 gap-y-3 text-sm">
                  <p className="text-[#404943]">Project</p>
                  <p className="text-[#181d19] font-medium">{task.projectId?.title || "—"}</p>

                  <p className="text-[#404943]">Priority</p>
                  <p className={`font-medium ${priorityColor[task.priority] || ""}`}>{task.priority}</p>

                  <p className="text-[#404943]">Due Date</p>
                  <p className="text-[#181d19] font-medium">
                    {task.deadline ? new Date(task.deadline).toLocaleDateString() : "Not set"}
                  </p>

                  <p className="text-[#404943]">Assigned By</p>
                  <p className="text-[#181d19] font-medium">{task.assignedBy?.name || "—"}</p>

                  <p className="text-[#404943]">Status</p>
                  <p className="text-[#181d19] font-medium">{task.status}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-semibold text-[#181d19] mb-4">Comments</h2>

                <div className="space-y-4 mb-6">
                  {comments.length === 0 && (
                    <p className="text-sm text-[#404943]">No comments yet.</p>
                  )}
                  {comments.map((c) => (
                    <div key={c._id} className="border-b last:border-b-0 pb-4">
                      <div className="flex justify-between text-xs text-[#404943] mb-1">
                        <span className="font-medium text-[#181d19]">
                          {c.userId?.name}{c.userId?._id === currentUser?._id && " (you)"}
                        </span>
                        <span>{new Date(c.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-[#181d19]">{c.text}</p>
                      {c.attachments?.length > 0 && (
                        <div className="mt-1 space-y-1">
                          {c.attachments.map((url, i) => (
                            <a key={i} href={url} target="_blank" rel="noreferrer" className="block text-xs text-[#2d6a4f] underline break-all">
                              📎 {url}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddComment} className="space-y-2">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write a comment..."
                    rows={3}
                    className="w-full rounded-lg border border-[#e6e9e3] p-3 text-sm outline-none focus:border-[#2d6a4f]"
                  />
                  <input
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    placeholder="Optional file link (Google Drive / Dropbox URL)"
                    className="w-full rounded-lg border border-[#e6e9e3] p-2 text-sm outline-none focus:border-[#2d6a4f]"
                  />
                  <button
                    type="submit"
                    disabled={posting}
                    className="rounded-lg bg-[#2d6a4f] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                  >
                    {posting ? "Posting..." : "Post comment"}
                  </button>
                </form>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const statusOptions = ['To Do', 'In Progress', 'Review', 'Done'];

export default function TaskDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [task, setTask] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = { Authorization: `Bearer ${token}` };

  const fetchTask = async () => {
    try {
      const res = await axios.get(`/api/task-details/${id}/details`, { headers });
      setTask(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchTask();
  }, [id]);

  const handleStatusChange = async (e) => {
    const status = e.target.value;
    await axios.patch(`/api/task-details/${id}/status`, { status }, { headers });
    setTask((prev) => ({ ...prev, status }));
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const res = await axios.post(
      `/api/task-details/${id}/comments`,
      { text: newComment },
      { headers }
    );
    setTask((prev) => ({ ...prev, comments: res.data }));
    setNewComment('');
  };

  const handleFileUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post(`/api/task-details/${id}/attachments`, formData, {
      headers: { ...headers, 'Content-Type': 'multipart/form-data' }
    });
    setTask((prev) => ({ ...prev, attachments: res.data }));
    setFile(null);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!task) return <div className="p-6">Task not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
      <p className="text-gray-600 mb-4">{task.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div><strong>Project:</strong> {task.projectName}</div>
        <div><strong>Priority:</strong> {task.priority}</div>
        <div><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</div>
        <div><strong>Assigned By:</strong> {task.assignedBy}</div>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-1">Status</label>
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="border rounded px-3 py-2 w-full"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">Comments</h2>
        {task.comments?.map((c, i) => (
          <div key={i} className="border-b py-2 text-sm">
            <strong>{c.postedBy?.name || 'User'}:</strong> {c.text}
            <div className="text-xs text-gray-400">
              {new Date(c.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
        <div className="flex gap-2 mt-3">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="border rounded px-3 py-2 flex-1"
          />
          <button
            onClick={handleAddComment}
            className="bg-green-700 text-white px-4 py-2 rounded"
          >
            Post
          </button>
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Attachments</h2>
        {task.attachments?.map((a, i) => (
          <div key={i} className="text-sm">
            <a href={a.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {a.fileName}
            </a>
          </div>
        ))}
        <div className="flex gap-2 mt-3">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button
            onClick={handleFileUpload}
            className="bg-green-700 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
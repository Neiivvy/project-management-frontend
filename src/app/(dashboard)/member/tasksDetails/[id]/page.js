'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getTask, updateTaskStatus } from '@/api/tasks';

const statusOptions = ['To Do', 'In Progress', 'Review', 'Completed'];

export default function TaskDetails() {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    try {
      const res = await getTask(id);
      setTask(res.data.data || res.data);
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
    await updateTaskStatus(id, status);
    setTask((prev) => ({ ...prev, status }));
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!task) return <div className="p-6">Task not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
      <p className="text-gray-600 mb-4">{task.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div><strong>Project:</strong> {task.projectId?.title || '—'}</div>
        <div><strong>Priority:</strong> {task.priority}</div>
        <div><strong>Due Date:</strong> {task.deadline ? new Date(task.deadline).toLocaleDateString() : '—'}</div>
        <div><strong>Assigned By:</strong> {task.assignedBy?.name || '—'}</div>
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
    </div>
  );
}
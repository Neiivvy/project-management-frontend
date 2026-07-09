"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

export default function TaskModal({ show, setShow }) {
  const [formData, setFormData] = useState({
    projectId: "",
    title: "",
    description: "",
    priority: "Medium",
    assignedTo: "",
  });

  if (!show) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/tasks", formData);

      alert("Task created successfully");

      setFormData({
        projectId: "",
        title: "",
        description: "",
        priority: "Medium",
        assignedTo: "",
      });

      setShow(false);
    } catch (error) {
      console.error(error);
      alert("Failed to create task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-150 rounded-xl p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Create Task</h2>

          <button onClick={() => setShow(false)}>
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4 mt-6">
          <input
            type="text"
            name="title"
            placeholder="Task Name"
            className="w-full border p-3 rounded-lg"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            className="w-full border p-3 rounded-lg"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="projectId"
            placeholder="Project ID"
            className="w-full border p-3 rounded-lg"
            value={formData.projectId}
            onChange={handleChange}
          />

          <input
            type="text"
            name="assignedTo"
            placeholder="Assigned User ID"
            className="w-full border p-3 rounded-lg"
            value={formData.assignedTo}
            onChange={handleChange}
          />

          <select
            name="priority"
            className="w-full border p-3 rounded-lg"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

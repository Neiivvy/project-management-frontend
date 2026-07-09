"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "@/api/axios";

export default function ProjectModal({ show, setShow, refreshProjects }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  if (!show) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post("/projects", formData);

      toast.success("Project created successfully!");
      refreshProjects();

      setFormData({
        title: "",
        description: "",
        deadline: "",
      });

      setShow(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Create Project
            </h2>

            <p className="text-sm text-slate-500">
              Enter project details below.
            </p>
          </div>

          <button
            onClick={() => setShow(false)}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Project Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter project title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 p-3 focus:border-[#0f5238] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              placeholder="Enter project description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 p-3 resize-none focus:border-[#0f5238] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Deadline</label>

            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 p-3 focus:border-[#0f5238] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="rounded-lg border border-slate-300 px-5 py-3 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-[#0f5238] px-6 py-3 text-white hover:bg-[#156046] disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

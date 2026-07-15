"use client";

import useProjectStore from "@/store/useProjectStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ProjectModal({
  show,
  setShow,
  setSelectedProject,
  mode = "create", // create | edit
  project = null,
}) {
  const { loading, addProject, editProject } = useProjectStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      deadline: "",
      status: "planning",
    },
  });

  useEffect(() => {
    if (!show) return;

    if (mode === "edit" && project) {
      reset({
        title: project.title || "",
        description: project.description || "",
        deadline: project.deadline
          ? new Date(project.deadline).toISOString().split("T")[0]
          : "",
        status: project.status || "Pending",
      });
    } else {
      reset({
        title: "",
        description: "",
        deadline: "",
        status: "planning",
      });
    }
  }, [show, mode, project, reset]);

  if (!show) return null;

  const onSubmit = async (data) => {
    let success = false;

    if (mode === "create") {
      success = await addProject(data);

      if (success) {
        toast.success("Project created successfully!");
      }
    } else {
      success = await editProject(project._id, data);

      if (success) {
        toast.success("Project updated successfully!");
      }
    }

    if (success) {
      reset();
      setSelectedProject(null);
      setShow(false);
    } else {
      toast.error(
        `Failed to ${mode === "create" ? "create" : "update"} project`,
      );
    }
  };

  const handleClose = () => {
    reset();
    setSelectedProject(null);
    setShow(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {mode === "create" ? "Create Project" : "Edit Project"}
            </h2>

            <p className="text-sm text-slate-500">
              {mode === "create"
                ? "Enter project details below."
                : "Update project details below."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Project Title
            </label>

            <input
              type="text"
              placeholder="Enter project title"
              {...register("title", {
                required: "Project title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })}
              className={`w-full rounded-lg border p-3 focus:outline-none focus:ring-2 ${
                errors.title
                  ? "border-red-500 focus:ring-red-200"
                  : "border-slate-300 focus:border-[#0f5238] focus:ring-[#0f5238]/20"
              }`}
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={4}
              placeholder="Enter project description"
              {...register("description")}
              className="w-full resize-none rounded-lg border border-slate-300 p-3 focus:border-[#0f5238] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Deadline</label>

            <input
              type="date"
              {...register("deadline")}
              className="w-full rounded-lg border border-slate-300 p-3 focus:border-[#0f5238] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20"
            />
          </div>

          {mode === "edit" && (
            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>

              <select
                {...register("status")}
                className="w-full rounded-lg border border-slate-300 p-3 focus:border-[#0f5238] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20"
              >
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-slate-300 px-5 py-3 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-[#0f5238] px-6 py-3 text-white transition hover:bg-[#156046] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? mode === "create"
                  ? "Creating..."
                  : "Updating..."
                : mode === "create"
                  ? "Create Project"
                  : "Update Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

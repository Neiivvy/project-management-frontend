"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import useTaskStore from "@/store/useTaskStore";
import useProjectStore from "@/store/useProjectStore";
import useUserStore from "@/store/useUserStore";

export default function TaskModal({
  show,
  setShow,
  setSelectedTask,
  mode = "create",
  task = null,
}) {
  const { loading, addTask, editTask } = useTaskStore();
  const { projects, fetchProjects } = useProjectStore();
  const { users, fetchUsers } = useUserStore();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectId: "",
      assignedTo: "",
      title: "",
      description: "",
      priority: "Medium",
      deadline: "",
    },
  });

  const selectedProjectId = useWatch({
    control,
    name: "projectId",
  });
  const selectedProject = projects.find(
    (project) => project._id === selectedProjectId,
  );

  const projectMembers = users.filter((user) => {
    return (
      user.role === "member" &&
      selectedProject?.teamMembers?.some((member) => {
        const memberId = member._id || member;
        return memberId.toString() === user._id.toString();
      })
    );
  });

  useEffect(() => {
    if (!show) return;

    fetchProjects();
    fetchUsers();
  }, [show, fetchProjects, fetchUsers]);

  useEffect(() => {
    if (!show) return;

    if (mode === "edit" && task) {
      reset({
        title: task.title || "",
        description: task.description || "",
        projectId: task.projectId?._id || "",
        assignedTo: task.assignedTo?._id || "",
        deadline: task.deadline
          ? new Date(task.deadline).toISOString().split("T")[0]
          : "",
        priority: task.priority || "Medium",
        status: task.status || "To Do",
      });
    } else {
      reset({
        title: "",
        description: "",
        projectId: "",
        assignedTo: "",
        deadline: "",
        priority: "Medium",
        status: "To Do",
      });
    }
  }, [show, mode, task, reset]);

  if (!show) return null;

  const handleClose = () => {
    reset();
    setSelectedTask(null);
    setShow(false);
  };
  const onSubmit = async (data) => {
    console.log("Sending task:", data);
    let success = false;

    if (mode === "create") {
      success = await addTask(data);
    } else {
      delete data.projectId;

      success = await editTask(task._id, data);
    }
    console.log("Success:", success);
    if (success) {
      toast.success(
        mode === "create"
          ? "Task created successfully!"
          : "Task updated successfully!",
      );

      reset();
      setSelectedTask(null);
      setShow(false);
    } else {
      toast.error(`Failed to ${mode === "create" ? "create" : "update"} task`);
    }
  };
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-xl max-h-fit rounded-2xl bg-white shadow-2xl ">
        <div className="flex items-center justify-between border-b px-3 p-3">
          <div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {mode === "create" ? "Create Task" : "Edit Task"}
              </h2>

              <p className="text-sm text-slate-500">
                {mode === "create"
                  ? "Enter task details below."
                  : "Update task details below."}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 hover:bg-slate-100 transition"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className=" px-4 py-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Task Title</label>

            <input
              type="text"
              placeholder="Enter task title"
              {...register("title", {
                required: "Task title is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters",
                },
              })}
              className={`w-full rounded-lg border px-3 py-2.5  ${
                errors.title ? "border-red-500" : "border-slate-300"
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
              placeholder="Enter task description"
              {...register("description")}
              className="w-full resize-none rounded-lg border p-1"
            />
          </div>
          {mode === "create" && (
            <div>
              <label className="mb-2 block text-sm font-medium">Project</label>

              <select
                {...register("projectId", {
                  required: "Project is required",
                })}
                className={`w-full rounded-lg border p-3 ${
                  errors.projectId ? "border-red-500" : "border-slate-300"
                }`}
              >
                <option value="">Select Project</option>

                {(projects || []).map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.title}
                  </option>
                ))}
              </select>

              {errors.projectId && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.projectId.message}
                </p>
              )}
            </div>
          )}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Assign Member
            </label>

            <select
              {...register("assignedTo", {
                required: "Assign a member",
              })}
              className="w-full rounded-lg border border-slate-300 p-3"
            >
              <option value="">Assign Member</option>

              {projectMembers.length > 0 ? (
                projectMembers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))
              ) : (
                <option disabled>No team members in this project</option>
              )}
            </select>

            {errors.assignedTo && (
              <p className="mt-1 text-sm text-red-500">
                {errors.assignedTo.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Deadline</label>

            <input
              type="date"
              min={mode === "create" ? minDate : ""}
              {...register("deadline", {
                required: "Deadline is required",
              })}
              className={`w-full rounded-lg border px-3 py-2.5 ${
                errors.deadline ? "border-red-500" : "border-slate-300"
              }`}
            />
          </div>
          <div className="flex space-x-20 items-center mt-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Priority</label>

              <select
                {...register("priority")}
                className="w-full rounded-lg border border-slate-300 p-3 "
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            {mode === "edit" && (
              <div>
                <label className="mb-2 block text-sm font-medium">Status</label>

                <select
                  {...register("status")}
                  className="w-full rounded-lg border border-slate-300 p-3"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Review">Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-slate-300 px-5 py-2.5 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-[#0f5238] px-5 py-2.5 text-white transition hover:bg-[#156046] disabled:opacity-50"
            >
              {loading
                ? mode === "create"
                  ? "Creating..."
                  : "Updating..."
                : mode === "create"
                  ? "Create Task"
                  : "Update Task"}{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

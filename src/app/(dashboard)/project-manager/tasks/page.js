"use client";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import TaskTable from "./components/TaskTable";
import TaskModal from "./components/TaskModal";
import Pagination from "../projects/components/Pagination";

import useTaskStore from "@/store/useTaskStore";

export default function TasksPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const removeTask = useTaskStore((state) => state.removeTask);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const tasks = useTaskStore((state) => state.tasks);
  const loading = useTaskStore((state) => state.loading);

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedTask(null);
    setShowModal(true);
  };

  const handleDelete = async (task) => {
    const confirmDelete = window.confirm(`Delete "${task.title}"?`);

    if (!confirmDelete) return;

    const success = await removeTask(task._id);

    if (success) {
      toast.success("Task deleted successfully");
    } else {
      toast.error("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const tasksPerPage = 8;

  // Pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  const currentTasks = (tasks || []).slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Tasks</h1>
          <p className="text-gray-500">Create and manage project tasks.</p>
        </div>

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 rounded-lg bg-[#0f5238] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0b412d]"
        >
          <FaPlus />
          New Task
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          Loading Tasks...
        </div>
      ) : (
        <>
          <TaskTable
            tasks={currentTasks}
            currentPage={currentPage}
            tasksPerPage={tasksPerPage}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Pagination
            totalItems={(tasks || []).length}
            itemsPerPage={tasksPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}

      <TaskModal
        show={showModal}
        setShow={setShowModal}
        setSelectedTask={setSelectedTask}
        mode={selectedTask ? "edit" : "create"}
        task={selectedTask}
      />
    </div>
  );
}

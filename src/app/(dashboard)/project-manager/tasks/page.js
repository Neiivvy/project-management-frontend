"use client";

import { useEffect, useMemo, useState } from "react";
import { FaPlus, FaTimes, FaSearch, FaFilter } from "react-icons/fa";
import { toast } from "react-toastify";
import TaskTable from "./components/TaskTable";
import TaskModal from "./components/TaskModal";

import useTaskStore from "@/store/useTaskStore";
import Pagination from "../projects/components/Pagination";

export default function TasksPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [projectFilter, setProjectFilter] = useState("All");
  const [deadlineFilter, setDeadlineFilter] = useState("All");

  const removeTask = useTaskStore((state) => state.removeTask);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const tasks = useTaskStore((state) => state.tasks);
  const loading = useTaskStore((state) => state.loading);

  const tasksPerPage = 6;

  const statusFilters = [
    "All",
    ...new Set((tasks || []).map((task) => task.status)),
  ];

  const priorityFilters = [
    "All",
    ...new Set((tasks || []).map((task) => task.priority)),
  ];

  const projectFilters = [
    "All",
    ...new Set(
      (tasks || []).map((task) => task.projectId?.title).filter(Boolean),
    ),
  ];

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = () => {
    setSelectedTask(null);
    setShowModal(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDelete = async (task) => {
    const confirmDelete = window.confirm(`Delete "${task.title}"?`);
    if (!confirmDelete) return;

    const success = await removeTask(task._id);

    if (success) {
      toast.success("Task deleted successfully");
      fetchTasks();
    } else {
      toast.error("Failed to delete task");
    }
  };

  const clearAll = () => {
    setSearch("");
    setCurrentPage(1);
  };

  const activeFilters = [
    search && {
      key: "search",
      label: `"${search}"`,
      clear: () => setSearch(""),
    },
  ].filter(Boolean);

  const filteredTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (tasks || [])
      .filter((task) => {
        const matchesSearch = task.title
          ?.toLowerCase()
          .includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === "All" || task.status === statusFilter;

        const matchesPriority =
          priorityFilter === "All" || task.priority === priorityFilter;

        const matchesProject =
          projectFilter === "All" || task.projectId?.title === projectFilter;

        const taskDeadline = task.deadline ? new Date(task.deadline) : null;

        if (taskDeadline) {
          taskDeadline.setHours(0, 0, 0, 0);
        }

        const isOverdue =
          taskDeadline && taskDeadline < today && task.status !== "Completed";

        const matchesDeadline =
          deadlineFilter === "All" ||
          (deadlineFilter === "Overdue" && isOverdue);

        return (
          matchesSearch &&
          matchesStatus &&
          matchesPriority &&
          matchesProject &&
          matchesDeadline
        );
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
    projectFilter,
    deadlineFilter,
  ]);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div>
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

      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <div className="relative w-full max-w-md mb-3">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-lg border border-[#bfc9c1] py-2 pl-11 pr-4 transition focus:border-[#0f5238] focus:outline-none focus:ring-2 focus:ring-[#0f5238]/20"
          />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <span className="text-sm font-semibold">Filter By:</span>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="min-w-25 cursor-pointer rounded-xl border border-gray-200 bg-white px-2 py-2 text-sm"
          >
            {statusFilters.map((status) => (
              <option key={status} value={status}>
                {status === "All" ? "All Status" : status}
              </option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => {
              setPriorityFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="min-w-30 cursor-pointer rounded-xl border border-gray-200 bg-white px-2 py-2 text-sm"
          >
            {priorityFilters.map((priority) => (
              <option key={priority} value={priority}>
                {priority === "All" ? "All Priority" : priority}
              </option>
            ))}
          </select>

          <select
            value={projectFilter}
            onChange={(e) => {
              setProjectFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="min-w-20 cursor-pointer rounded-xl border border-gray-200 bg-white px-2 py-2 text-sm"
          >
            {projectFilters.map((project) => (
              <option key={project} value={project}>
                {project === "All" ? "All Projects" : project}
              </option>
            ))}
          </select>

          <select
            value={deadlineFilter}
            onChange={(e) => {
              setDeadlineFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="min-w-20 cursor-pointer rounded-xl border border-gray-200 bg-white px-2 py-2 text-sm"
          >
            <option value="All">All Deadlines</option>
            <option value="Overdue">Overdue</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
              setPriorityFilter("All");
              setProjectFilter("All");
              setDeadlineFilter("All");
              setCurrentPage(1);
            }}
            className="rounded-lg border border-red-200 bg-red-50 px-2 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            ❌
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          Loading Tasks...
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <p className="font-medium text-slate-700">
            No tasks match your search
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Try a different keyword or clear the search.
          </p>
          {activeFilters.length > 0 && (
            <button
              onClick={clearAll}
              className="mt-3 rounded-lg border px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <>
          <TaskTable
            tasks={currentTasks}
            totalTasks={filteredTasks.length}
            currentPage={currentPage}
            tasksPerPage={tasksPerPage}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Pagination
            totalItems={filteredTasks.length}
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

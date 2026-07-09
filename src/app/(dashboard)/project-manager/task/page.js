"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import { tasksData } from "./data/mockdata";

import TaskTable from "./components/TaskTable";
import TaskModal from "./components/TaskModal";

export default function TasksPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Tasks</h1>

          <p className="text-gray-500">Create and manage project tasks.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <FaPlus />
          New Task
        </button>
      </div>

      <TaskTable tasks={tasksData} />

      <TaskModal show={showModal} setShow={setShowModal} />
    </div>
  );
}

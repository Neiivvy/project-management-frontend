import { create } from "zustand";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} from "@/api/taskApi";
const useTaskStore = create((set, get) => ({
  tasks: [],
  task: null,
  loading: false,
  error: null,

  fetchTasks: async () => {
    try {
      set({ loading: true });

      const tasks = await getTasks();

      set({
        tasks,
        loading: false,
      });
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to fetch tasks",
      });
    }
  },

  addTask: async (data) => {
    try {
      set({ loading: true });

      const task = await createTask(data);

      set((state) => ({
        tasks: [task, ...state.tasks],
        loading: false,
      }));

      return true;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to create task",
      });
      console.log(err.response?.data);
      return false;
    }
  },

  editTask: async (id, data) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const updatedTask = await updateTask(id, data);
      console.log("Updated Task:", updatedTask);

      // Refetch all tasks from the backend
      await get().fetchTasks();
      console.log("Tasks after refresh:", get().tasks);

      set({
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to update task",
      });

      return false;
    }
  },
  fetchTaskById: async (id) => {
    try {
      set({ loading: true, error: null });

      const task = await getTaskById(id);

      set({
        task,
        loading: false,
      });

      return task;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to fetch task",
      });

      return null;
    }
  },

  removeTask: async (id) => {
    try {
      set({ loading: true, error: null });

      await deleteTask(id);

      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
        loading: false,
      }));

      return true;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to delete task",
      });

      return false;
    }
  },
}));

export default useTaskStore;

import { create } from "zustand";
import { Task } from "../types/tasksTypes";
import { createTask, updateTask, deleteTask, getTasks } from "../api/tasks.api";

interface TasksStore {
  tasks: Task[];
  notifications: Task[];
  isLoading: boolean;
  isUpdate: boolean;
  error: string | null;
  getTasks: () => Promise<void>;
  createTask: (taskDto: Task) => Promise<void>;
  updateTask: (taskDto: Partial<Omit<Task, "id">>, taskId: number) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
  setNotification: (task: Task, isRemove?: boolean) => void;
  setUpdate: (isUpdate?: boolean) => void;
}

const useTasksStore = create<TasksStore>((set) => ({
  tasks: [],
  notifications: [],
  isLoading: false,
  isUpdate: false,
  error: null,
  getTasks: async () => {
    try {
      set({ isLoading: true });
      const tasks = await getTasks();
      set({ tasks });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  createTask: async (taskDto) => {
    try {
      set({ isLoading: true });
      const task = await createTask(taskDto);
      set((state) => ({ tasks: [...state.tasks, task], isUpdate: true }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  updateTask: async (taskDto, taskId) => {
    try {
      set({ isLoading: true });
      const task = await updateTask(taskDto, taskId);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
        isUpdate: true
      }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  deleteTask: async (taskId) => {
    try {
      set({ isLoading: true });
      await deleteTask(taskId);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  setNotification: (task, isRemove = false) => {
    set((state) => ({
      notifications: isRemove
        ? state.notifications.filter((t) => t.id !== task.id)
        : [...state.notifications, task],
    }));
  },
  setUpdate: (isUpdate = false) => set({ isUpdate: isUpdate }),
}))

export default useTasksStore;

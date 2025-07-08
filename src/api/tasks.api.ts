import api from ".";
import { Task } from "../types/tasksTypes";

export const createTask = async (task: Task) => {
  const { data } = await api.post<Task>(`tasks`, task);
  return data;
}

export const getTasks = async () => {
  const { data } = await api.get<Task[]>('tasks');
  return data;
}

export const updateTask = async (task: Partial<Task>, taskId: number) => {
  const { data } = await api.patch<Task>(`tasks/${taskId}`, task);
  return data;
}

export const deleteTask = async (taskId: number) => {
  await api.delete(`tasks/${taskId}`);
}

export const getTaskById = async (taskId: number) => {
  const { data } = await api.get<Task>(`tasks/${taskId}`);
  return data;
}

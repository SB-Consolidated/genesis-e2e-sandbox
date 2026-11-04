import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import type { Task } from "../types/task.ts";

export type TaskStorage = {
  list: () => Promise<Task[]>;
  create: (title: string) => Promise<Task>;
  updateCompleted: (id: string, completed: boolean) => Promise<Task | null>;
  deleteById: (id: string) => Promise<Task | null>;
};

async function ensureFile(filePath: string): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, "[]\n", "utf8");
  }
}

async function readTasks(filePath: string): Promise<Task[]> {
  await ensureFile(filePath);
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error("tasks.json must contain an array");
  }
  return parsed as Task[];
}

async function atomicWriteTasks(filePath: string, tasks: Task[]): Promise<void> {
  const tempPath = `${filePath}.tmp-${process.pid}-${Date.now()}`;
  const payload = `${JSON.stringify(tasks, null, 2)}\n`;
  await fs.writeFile(tempPath, payload, "utf8");
  await fs.rename(tempPath, filePath);
}

export function createTaskStorage(filePath: string): TaskStorage {
  return {
    async list(): Promise<Task[]> {
      return readTasks(filePath);
    },

    async create(title: string): Promise<Task> {
      const now = new Date().toISOString();
      const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        completed: false,
        createdAt: now,
        updatedAt: now,
      };

      const tasks = await readTasks(filePath);
      tasks.push(newTask);
      await atomicWriteTasks(filePath, tasks);
      return newTask;
    },

    async updateCompleted(id: string, completed: boolean): Promise<Task | null> {
      const tasks = await readTasks(filePath);
      const task = tasks.find((item) => item.id === id);
      if (!task) {
        return null;
      }

      task.completed = completed;
      task.updatedAt = new Date().toISOString();
      await atomicWriteTasks(filePath, tasks);
      return task;
    },

    async deleteById(id: string): Promise<Task | null> {
      const tasks = await readTasks(filePath);
      const index = tasks.findIndex((item) => item.id === id);
      if (index < 0) {
        return null;
      }

      const [deleted] = tasks.splice(index, 1);
      await atomicWriteTasks(filePath, tasks);
      return deleted;
    },
  };
}

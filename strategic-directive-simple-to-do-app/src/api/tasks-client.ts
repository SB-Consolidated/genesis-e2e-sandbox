import type { DeleteTaskResponse, Task, TaskListResponse, TaskResponse } from "../types/task";

export type TaskClient = {
  listTasks: () => Promise<Task[]>;
  createTask: (title: string) => Promise<Task>;
  toggleTask: (id: string, completed: boolean) => Promise<Task>;
  deleteTask: (id: string) => Promise<Task>;
};

function resolveApiPath(path: string, baseUrl = ""): string {
  const normalizedBase = baseUrl.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedBase ? `${normalizedBase}${normalizedPath}` : normalizedPath;
}

async function requestJson<T>(path: string, init: RequestInit = {}, baseUrl = ""): Promise<T> {
  const response = await fetch(resolveApiPath(path, baseUrl), {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  const payload = (await response.json().catch(() => ({}))) as unknown;

  if (!response.ok) {
    const message = typeof (payload as { error?: string })?.error === "string" ? (payload as { error: string }).error : `Request failed with status ${response.status}`;
    const error = new Error(message) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }

  return payload as T;
}

export function createTaskClient(baseUrl = ""): TaskClient {
  return {
    async listTasks(): Promise<Task[]> {
      const response = await requestJson<TaskListResponse>("/api/tasks", { method: "GET" }, baseUrl);
      return response.tasks;
    },

    async createTask(title: string): Promise<Task> {
      const response = await requestJson<TaskResponse>("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title }),
      }, baseUrl);
      return response.task;
    },

    async toggleTask(id: string, completed: boolean): Promise<Task> {
      const response = await requestJson<TaskResponse>(`/api/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed }),
      }, baseUrl);
      return response.task;
    },

    async deleteTask(id: string): Promise<Task> {
      const response = await requestJson<DeleteTaskResponse>(`/api/tasks/${id}`, { method: "DELETE" }, baseUrl);
      return response.task;
    },
  };
}

export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((left, right) => Number(left.completed) - Number(right.completed));
}

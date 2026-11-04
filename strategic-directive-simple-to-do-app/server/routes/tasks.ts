import { IncomingMessage, ServerResponse } from "node:http";
import { TaskStorage } from "../storage/tasks-storage";

type ApiError = {
  error: string;
};

function sendJson(res: ServerResponse, status: number, payload: unknown): void {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(payload));
}

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const body = Buffer.concat(chunks).toString("utf8").trim();
  if (!body) {
    return {};
  }

  try {
    return JSON.parse(body);
  } catch {
    const error = new Error("Invalid JSON payload");
    error.name = "INVALID_JSON";
    throw error;
  }
}

function parseTaskId(pathname: string): string | null {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 3 && parts[0] === "api" && parts[1] === "tasks") {
    return parts[2] || null;
  }
  return null;
}

export async function handleTaskRoutes(req: IncomingMessage, res: ServerResponse, storage: TaskStorage): Promise<boolean> {
  const method = req.method || "GET";
  const url = new URL(req.url || "/", "http://localhost");
  const { pathname } = url;

  if (!pathname.startsWith("/api/tasks")) {
    return false;
  }

  if (pathname === "/api/tasks" && method === "GET") {
    const tasks = await storage.list();
    sendJson(res, 200, { tasks });
    return true;
  }

  if (pathname === "/api/tasks" && method === "POST") {
    try {
      const body = await readJsonBody(req);
      const title = typeof (body as { title?: unknown }).title === "string" ? (body as { title: string }).title.trim() : "";
      if (!title) {
        sendJson(res, 400, { error: "title is required" } satisfies ApiError);
        return true;
      }

      const task = await storage.create(title);
      sendJson(res, 201, { task });
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === "INVALID_JSON") {
        sendJson(res, 400, { error: error.message } satisfies ApiError);
        return true;
      }
      throw error;
    }
  }

  const taskId = parseTaskId(pathname);
  if (!taskId) {
    sendJson(res, 404, { error: "Route not found" } satisfies ApiError);
    return true;
  }

  if (method === "PATCH") {
    try {
      const body = await readJsonBody(req);
      const completed = (body as { completed?: unknown }).completed;
      if (typeof completed !== "boolean") {
        sendJson(res, 400, { error: "completed must be a boolean" } satisfies ApiError);
        return true;
      }

      const task = await storage.updateCompleted(taskId, completed);
      if (!task) {
        sendJson(res, 404, { error: "Task not found" } satisfies ApiError);
        return true;
      }

      sendJson(res, 200, { task });
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === "INVALID_JSON") {
        sendJson(res, 400, { error: error.message } satisfies ApiError);
        return true;
      }
      throw error;
    }
  }

  if (method === "DELETE") {
    const deleted = await storage.deleteById(taskId);
    if (!deleted) {
      sendJson(res, 404, { error: "Task not found" } satisfies ApiError);
      return true;
    }

    sendJson(res, 200, { deleted: true, task: deleted });
    return true;
  }

  sendJson(res, 405, { error: "Method not allowed" } satisfies ApiError);
  return true;
}

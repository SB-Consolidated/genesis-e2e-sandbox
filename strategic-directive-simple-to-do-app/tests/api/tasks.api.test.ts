import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { createAppServer } from "../../server/server";

type StartedServer = {
  baseUrl: string;
  close: () => Promise<void>;
};

const serversToClose: Array<() => Promise<void>> = [];

async function startServer(tasksFilePath: string): Promise<StartedServer> {
  const server = createAppServer({ tasksFilePath });
  let closed = false;

  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve());
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Failed to bind test server");
  }

  const close = async () => {
    if (closed) {
      return;
    }

    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });

    closed = true;
  };

  serversToClose.push(close);

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close,
  };
}

async function createTempTasksFile(): Promise<string> {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "todo-api-test-"));
  return path.join(dir, "tasks.json");
}

afterEach(async () => {
  while (serversToClose.length) {
    const close = serversToClose.pop();
    if (close) {
      await close();
    }
  }
});

describe("tasks API", () => {
  it("creates, lists, updates, and deletes tasks", async () => {
    const tasksFilePath = await createTempTasksFile();
    const server = await startServer(tasksFilePath);

    const createRes = await fetch(`${server.baseUrl}/api/tasks`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "Write tests" }),
    });
    expect(createRes.status).toBe(201);
    const createJson = (await createRes.json()) as { task: { id: string; completed: boolean; title: string } };
    expect(createJson.task.title).toBe("Write tests");
    expect(createJson.task.completed).toBe(false);

    const listRes = await fetch(`${server.baseUrl}/api/tasks`);
    expect(listRes.status).toBe(200);
    const listJson = (await listRes.json()) as { tasks: Array<{ id: string }> };
    expect(listJson.tasks).toHaveLength(1);
    expect(listJson.tasks[0].id).toBe(createJson.task.id);

    const patchRes = await fetch(`${server.baseUrl}/api/tasks/${createJson.task.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });
    expect(patchRes.status).toBe(200);
    const patchJson = (await patchRes.json()) as { task: { completed: boolean } };
    expect(patchJson.task.completed).toBe(true);

    const deleteRes = await fetch(`${server.baseUrl}/api/tasks/${createJson.task.id}`, {
      method: "DELETE",
    });
    expect(deleteRes.status).toBe(200);

    const listAfterDeleteRes = await fetch(`${server.baseUrl}/api/tasks`);
    const listAfterDeleteJson = (await listAfterDeleteRes.json()) as { tasks: unknown[] };
    expect(listAfterDeleteJson.tasks).toHaveLength(0);
  });

  it("returns deterministic validation errors", async () => {
    const tasksFilePath = await createTempTasksFile();
    const server = await startServer(tasksFilePath);

    const emptyTitleRes = await fetch(`${server.baseUrl}/api/tasks`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "   " }),
    });
    expect(emptyTitleRes.status).toBe(400);
    expect(await emptyTitleRes.json()).toEqual({ error: "title is required" });

    const malformedPatchRes = await fetch(`${server.baseUrl}/api/tasks/some-id`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ completed: "yes" }),
    });
    expect(malformedPatchRes.status).toBe(400);
    expect(await malformedPatchRes.json()).toEqual({ error: "completed must be a boolean" });

    const missingIdRes = await fetch(`${server.baseUrl}/api/tasks/missing-id`, {
      method: "DELETE",
    });
    expect(missingIdRes.status).toBe(404);
    expect(await missingIdRes.json()).toEqual({ error: "Task not found" });
  });

  it("persists data across server restart and keeps tasks.json valid JSON", async () => {
    const tasksFilePath = await createTempTasksFile();
    const firstServer = await startServer(tasksFilePath);

    const createRes = await fetch(`${firstServer.baseUrl}/api/tasks`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "Persist me" }),
    });
    const created = (await createRes.json()) as { task: { id: string } };
    await firstServer.close();

    const secondServer = await startServer(tasksFilePath);
    const listRes = await fetch(`${secondServer.baseUrl}/api/tasks`);
    const listJson = (await listRes.json()) as { tasks: Array<{ id: string; title: string }> };

    expect(listJson.tasks).toHaveLength(1);
    expect(listJson.tasks[0].id).toBe(created.task.id);
    expect(listJson.tasks[0].title).toBe("Persist me");

    const raw = await fs.readFile(tasksFilePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    expect(Array.isArray(parsed)).toBe(true);
  });
});

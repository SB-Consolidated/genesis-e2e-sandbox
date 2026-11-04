import { afterEach, describe, expect, it } from "vitest";
import { createAppServer } from "../../server/server";
import type { AddressInfo } from "node:net";

async function withServer(handler: (baseUrl: string) => Promise<void>): Promise<void> {
  const tempPath = `/tmp/genesis-task-api-${Date.now()}.json`;
  const server = createAppServer({ tasksFilePath: tempPath });
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const { port } = server.address() as AddressInfo;

  try {
    await handler(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

describe("tasks api validation", () => {
  afterEach(() => {
    // Keep each server isolated so tests can run deterministically.
  });

  it("rejects empty task titles before creating a task", async () => {
    await withServer(async (baseUrl) => {
      const response = await fetch(`${baseUrl}/api/tasks`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: "   " }),
      });

      expect(response.status).toBe(400);
      await expect(response.json()).resolves.toMatchObject({ error: "title is required" });
    });
  });

  it("requires a boolean completion value for toggles", async () => {
    await withServer(async (baseUrl) => {
      const created = await fetch(`${baseUrl}/api/tasks`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: "Draft task" }),
      });
      const createdPayload = (await created.json()) as { task: { id: string } };

      const response = await fetch(`${baseUrl}/api/tasks/${createdPayload.task.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ completed: "yes" }),
      });

      expect(response.status).toBe(400);
      await expect(response.json()).resolves.toMatchObject({ error: "completed must be a boolean" });
    });
  });

  it("supports create, list, toggle, and delete flows through the API contract", async () => {
    await withServer(async (baseUrl) => {
      const createResponse = await fetch(`${baseUrl}/api/tasks`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: "Write tests" }),
      });
      const created = (await createResponse.json()) as { task: { id: string; title: string; completed: boolean } };

      expect(createResponse.status).toBe(201);
      expect(created.task.title).toBe("Write tests");
      expect(created.task.completed).toBe(false);

      const listResponse = await fetch(`${baseUrl}/api/tasks`);
      const list = (await listResponse.json()) as { tasks: Array<{ id: string; title: string }> };
      expect(list.tasks).toHaveLength(1);
      expect(list.tasks[0].title).toBe("Write tests");

      const toggleResponse = await fetch(`${baseUrl}/api/tasks/${created.task.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
      const toggled = (await toggleResponse.json()) as { task: { completed: boolean } };
      expect(toggleResponse.status).toBe(200);
      expect(toggled.task.completed).toBe(true);

      const deleteResponse = await fetch(`${baseUrl}/api/tasks/${created.task.id}`, { method: "DELETE" });
      const deleted = (await deleteResponse.json()) as { deleted: boolean; task: { id: string } };
      expect(deleteResponse.status).toBe(200);
      expect(deleted.deleted).toBe(true);
      expect(deleted.task.id).toBe(created.task.id);
    });
  });
});

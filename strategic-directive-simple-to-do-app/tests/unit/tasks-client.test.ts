import { afterEach, describe, expect, it, vi } from "vitest";
import { createTaskClient, sortTasks } from "../../src/api/tasks-client";

describe("tasks client", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("creates and toggles tasks through the API contract", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ task: { id: "1", title: "Write tests", completed: false, createdAt: "2026-11-04T00:00:00.000Z", updatedAt: "2026-11-04T00:00:00.000Z" } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ task: { id: "1", title: "Write tests", completed: true, createdAt: "2026-11-04T00:00:00.000Z", updatedAt: "2026-11-04T00:00:00.000Z" } }),
      });

    vi.stubGlobal("fetch", fetchMock);

    const client = createTaskClient();
    const created = await client.createTask("Write tests");
    const toggled = await client.toggleTask(created.id, true);

    expect(created.title).toBe("Write tests");
    expect(toggled.completed).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("keeps incomplete tasks above completed tasks", () => {
    const tasks = [
      { id: "2", title: "done", completed: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
      { id: "1", title: "open", completed: false, createdAt: "2024-01-02", updatedAt: "2024-01-02" },
    ];

    expect(sortTasks(tasks).map((task) => task.id)).toEqual(["1", "2"]);
  });
});

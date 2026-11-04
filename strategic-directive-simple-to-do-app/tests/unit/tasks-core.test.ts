import { describe, expect, it } from "vitest";
import { sortTasks } from "../../src/api/tasks-client";
import type { Task } from "../../src/types/task";

describe("tasks core behavior", () => {
  it("keeps incomplete items above completed items", () => {
    const tasks: Task[] = [
      { id: "done-1", title: "Finished", completed: true, createdAt: "2026-11-04T00:00:00.000Z", updatedAt: "2026-11-04T00:00:01.000Z" },
      { id: "open-1", title: "Active", completed: false, createdAt: "2026-11-04T00:00:02.000Z", updatedAt: "2026-11-04T00:00:03.000Z" },
      { id: "done-2", title: "Also finished", completed: true, createdAt: "2026-11-04T00:00:04.000Z", updatedAt: "2026-11-04T00:00:05.000Z" },
    ];

    expect(sortTasks(tasks).map((task) => task.id)).toEqual(["open-1", "done-1", "done-2"]);
  });

  it("uses completion state as the ordering signal and preserves relative insertion order within each bucket", () => {
    const tasks: Task[] = [
      { id: "first", title: "First", completed: false, createdAt: "2026-11-04T00:00:00.000Z", updatedAt: "2026-11-04T00:00:00.000Z" },
      { id: "second", title: "Second", completed: false, createdAt: "2026-11-04T00:00:01.000Z", updatedAt: "2026-11-04T00:00:01.000Z" },
      { id: "third", title: "Third", completed: true, createdAt: "2026-11-04T00:00:02.000Z", updatedAt: "2026-11-04T00:00:02.000Z" },
      { id: "fourth", title: "Fourth", completed: true, createdAt: "2026-11-04T00:00:03.000Z", updatedAt: "2026-11-04T00:00:03.000Z" },
    ];

    expect(sortTasks(tasks).map((task) => task.title)).toEqual(["First", "Second", "Third", "Fourth"]);
  });
});

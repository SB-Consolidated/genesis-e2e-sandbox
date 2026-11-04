import { expect, test } from "@playwright/test";

async function clearTaskApiState() {
  const response = await fetch("http://127.0.0.1:3000/api/tasks");
  if (!response.ok) {
    return;
  }

  const payload = (await response.json()) as { tasks?: Array<{ id: string }> };
  for (const task of payload.tasks ?? []) {
    await fetch(`http://127.0.0.1:3000/api/tasks/${task.id}`, { method: "DELETE" });
  }
}

test.beforeEach(async ({ page }) => {
  await clearTaskApiState();
  await page.goto("/");
});

test("task list loads from the API and stays single-page", async ({ page }) => {
  await clearTaskApiState();

  const seedResponse = await page.goto("http://127.0.0.1:3000/api/tasks");
  expect(seedResponse?.status()).toBe(200);

  const taskInput = page.locator("#task-input");
  await page.goto("/");

  await expect(page.locator('main[role="main"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible();
  await taskInput.fill("API-backed task");
  await taskInput.press("Enter");

  await expect(page.locator("#task-list li")).toContainText("API-backed task");
  expect(page.url()).not.toContain("#/add");
  expect(page.url()).not.toContain("/task/");
});

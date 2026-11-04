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
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("mvp flows support add, list, complete, reopen, delete, and ordering without separate routes", async ({ page }) => {
  const taskInput = page.locator("#task-input");
  const taskItems = page.locator("#task-list li");

  await expect(page.locator('main[role="main"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible();

  await taskInput.fill("First task");
  await taskInput.press("Enter");
  await expect(taskItems).toHaveCount(1);
  await expect(taskItems.nth(0)).toContainText("First task");

  await taskInput.fill("Second task");
  await taskInput.press("Enter");
  await expect(taskItems).toHaveCount(2);
  await expect(taskItems.nth(0)).toContainText("First task");
  await expect(taskItems.nth(1)).toContainText("Second task");

  await page.getByRole("checkbox", { name: "Complete First task" }).check();
  await expect(taskItems.nth(0)).toContainText("Second task");
  await expect(taskItems.nth(1)).toContainText("First task");
  await expect(taskItems.nth(1).locator("input[type='checkbox']")).toBeChecked();

  await page.getByRole("checkbox", { name: "Reopen First task" }).uncheck();
  await expect(taskItems.nth(0)).toContainText("First task");
  await expect(taskItems.nth(0).locator("input[type='checkbox']")).not.toBeChecked();

  await page.getByRole("button", { name: "Delete Second task" }).click();
  await expect(taskItems).toHaveCount(1);
  await expect(taskItems.first()).toContainText("First task");

  const hash = await page.evaluate(() => window.location.hash);
  expect(hash).toBe("");
  expect(page.url()).not.toContain("#/add");
  expect(page.url()).not.toContain("/task/");
});

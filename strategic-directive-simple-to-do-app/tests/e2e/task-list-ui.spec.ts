import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("single-page task list supports add, toggle, and delete interactions", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  const taskInput = page.locator("#task-input");
  const taskItems = page.locator("#task-list li");

  await expect(page.locator('main[role="main"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible();
  await expect(taskInput).toBeVisible();

  await taskInput.fill("Buy groceries");
  await taskInput.press("Enter");

  await expect(taskItems).toHaveCount(1);
  await expect(taskItems.first()).toContainText("Buy groceries");
  await expect(page.getByRole("status")).toContainText("Task added.");

  const checkbox = taskItems.locator("input[type='checkbox']").first();
  await checkbox.check();
  await expect(taskItems.first()).toHaveClass(/task-complete/);

  await page.getByRole("button", { name: "Delete Buy groceries" }).click();
  await expect(taskItems).toHaveCount(0);

  expect(pageErrors).toEqual([]);
  expect(page.url()).not.toContain("#/add");
  expect(page.url()).not.toContain("/task/");
});

test("completed tasks render below incomplete tasks without creating routes", async ({ page }) => {
  const taskInput = page.locator("#task-input");

  await taskInput.fill("First task");
  await taskInput.press("Enter");
  await taskInput.fill("Second task");
  await taskInput.press("Enter");

  const items = page.locator("#task-list li");
  await expect(items).toHaveCount(2);

  await items.nth(0).locator("input[type='checkbox']").check();

  await expect(items.nth(0)).toContainText("Second task");
  await expect(items.nth(1)).toContainText("First task");

  const hash = await page.evaluate(() => window.location.hash);
  expect(hash).toBe("");
  expect(await page.locator("#task-list li").count()).toBe(2);
});

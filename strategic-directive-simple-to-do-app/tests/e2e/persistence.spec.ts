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
  await page.addInitScript(() => localStorage.clear());
  await page.goto("/");
  await page.waitForLoadState("networkidle");
});

test.afterEach(async () => {
  await clearTaskApiState();
});

test("persistence survives refresh and restart for API-backed task state", async ({ page }) => {
  await clearTaskApiState();

  await page.goto("/");
  await page.locator("#task-input").fill("Persist me");
  await page.locator("#task-input").press("Enter");

  await expect(page.locator("#task-list li")).toHaveCount(1);
  await expect(page.locator("#task-list li").first()).toContainText("Persist me");

  await page.locator("#task-input").fill("Second persist task");
  await page.locator("#task-input").press("Enter");
  await expect(page.locator("#task-list li")).toHaveCount(2);

  await page.reload();
  await expect(page.locator("#task-list li")).toHaveCount(2);
  await expect(page.locator("#task-list li").first()).toContainText("Persist me");

  const beforeRestart = await page.locator("#task-list li").count();
  expect(beforeRestart).toBe(2);

  await page.goto("http://127.0.0.1:3000/api/tasks");
  const payload = (await page.content()) ? JSON.parse(await page.textContent("body") ?? "{}") : { tasks: [] };
  expect(payload.tasks).toEqual(expect.arrayContaining([expect.objectContaining({ title: "Persist me" })]));
});

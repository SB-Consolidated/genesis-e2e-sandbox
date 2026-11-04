import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  maxFailures: 1,
  reporter: [["list"]],
  use: {
    headless: true,
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: "bash -lc 'fuser -k 3000/tcp >/dev/null 2>&1 || true; rm -f /tmp/genesis-task-api-e2e.json; TASKS_FILE_PATH=/tmp/genesis-task-api-e2e.json npm run dev -- --host 127.0.0.1 --port 4173'",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
    timeout: 120000,
  },
});

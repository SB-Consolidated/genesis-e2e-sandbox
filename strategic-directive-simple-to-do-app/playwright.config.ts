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
    command: [
      "bash",
      "-lc",
      "fuser -k 3000/tcp >/dev/null 2>&1 || true; rm -f /tmp/genesis-task-api-e2e.json; TASKS_FILE_PATH=/tmp/genesis-task-api-e2e.json PORT=3000 node --experimental-strip-types server/server.ts >/tmp/genesis-task-api-e2e.log 2>&1 & for i in $(seq 1 60); do curl -fsS http://127.0.0.1:3000/health >/dev/null && break; sleep 0.5; done; npm run dev -- --host 127.0.0.1 --port 4173",
    ].join(" "),
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
    timeout: 120000,
  },
});

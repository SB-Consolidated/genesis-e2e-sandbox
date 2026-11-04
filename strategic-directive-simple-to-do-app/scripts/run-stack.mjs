import { spawn } from "node:child_process";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const args = process.argv.slice(2);

function getArg(name, fallback) {
  const exact = args.find((arg) => arg.startsWith(`--${name}=`));
  if (exact) {
    return exact.slice(name.length + 3);
  }

  const flagIndex = args.indexOf(`--${name}`);
  if (flagIndex >= 0 && args[flagIndex + 1]) {
    return args[flagIndex + 1];
  }

  return fallback;
}

const mode = getArg("mode", "dev");
const host = getArg("host", mode === "prod" ? "0.0.0.0" : "127.0.0.1");
const uiPort = Number(getArg("port", mode === "prod" ? "4173" : "5173"));
const apiPort = Number(getArg("api-port", "3000"));
const tasksFilePath = process.env.TASKS_FILE_PATH || path.join(process.cwd(), "data", "tasks.json");

if (process.platform === "linux") {
  const cleaner = spawn("bash", ["-lc", "fuser -k 3000/tcp >/dev/null 2>&1 || true"], { stdio: "ignore" });
  cleaner.on("exit", () => undefined);
}

const apiCommand = process.execPath;
const apiArgs = ["--experimental-strip-types", "server/server.ts"];

async function waitForApi() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${apiPort}/health`);
      if (response.ok) {
        return;
      }
    } catch {
      // Server still starting.
    }
    await delay(250);
  }

  throw new Error(`API server did not become ready on port ${apiPort}`);
}

async function runBuild() {
  const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  await new Promise((resolve, reject) => {
    const build = spawn(npmCommand, ["run", "build"], {
      stdio: "inherit",
      env: process.env,
    });

    build.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Build failed with exit code ${code}`));
      }
    });
  });
}

const shutdown = () => {
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

async function main() {
  if (mode === "prod") {
    await runBuild();
  }

  const backend = spawn(apiCommand, apiArgs, {
    stdio: "inherit",
    env: {
      ...process.env,
      PORT: String(apiPort),
      TASKS_FILE_PATH: tasksFilePath,
    },
  });

  backend.on("exit", (code) => {
    if (code !== 0 && code !== null) {
      process.exit(code);
    }
  });

  await waitForApi();

  const uiCommand = process.platform === "win32" ? "npx.cmd" : "npx";
  const uiArgs = mode === "prod"
    ? ["vite", "preview", "--host", host, "--port", String(uiPort), "--strictPort"]
    : ["vite", "--host", host, "--port", String(uiPort), "--strictPort"];

  const frontend = spawn(uiCommand, uiArgs, { stdio: "inherit", env: process.env });

  frontend.on("exit", (code) => {
    if (code !== 0 && code !== null) {
      process.exit(code);
    }
  });

  await new Promise(() => {});
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

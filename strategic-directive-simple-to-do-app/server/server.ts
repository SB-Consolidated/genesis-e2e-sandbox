import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createTaskStorage } from "./storage/tasks-storage";
import { handleTaskRoutes } from "./routes/tasks";

type ServerOptions = {
  tasksFilePath?: string;
};

export function createAppServer(options: ServerOptions = {}): http.Server {
  const tasksFilePath = options.tasksFilePath || process.env.TASKS_FILE_PATH || path.join(process.cwd(), "data", "tasks.json");
  const storage = createTaskStorage(tasksFilePath);

  return http.createServer(async (req, res) => {
    try {
      const handled = await handleTaskRoutes(req, res, storage);
      if (handled) {
        return;
      }

      const url = new URL(req.url || "/", "http://localhost");
      if (url.pathname === "/health") {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ status: "ok", service: "todo-local-api" }));
        return;
      }

      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "Route not found" }));
    } catch {
      res.writeHead(500, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "Internal server error" }));
    }
  });
}

export async function startServer(port: number = Number(process.env.PORT || 3000), options: ServerOptions = {}): Promise<http.Server> {
  const server = createAppServer(options);
  await new Promise<void>((resolve) => {
    server.listen(port, () => resolve());
  });
  return server;
}

const isEntryPoint = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isEntryPoint) {
  const port = Number(process.env.PORT || 3000);
  startServer(port)
    .then(() => {
      console.log(`server listening on http://localhost:${port}`);
    })
    .catch((error) => {
      console.error("Failed to start server", error);
      process.exit(1);
    });
}

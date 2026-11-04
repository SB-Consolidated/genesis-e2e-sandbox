import "./styles.css";
import { createTaskClient, sortTasks } from "./api/tasks-client";
import type { Task } from "./types/task";

const client = createTaskClient();
const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Missing #app root element");
}

app.innerHTML = `
  <section class="container">
    <h1>Tasks</h1>
    <form id="add-task-form" class="add-row" aria-label="Add a task">
      <label for="task-input" class="sr-only">Add a task</label>
      <input id="task-input" name="title" type="text" placeholder="Add a task" autocomplete="off" />
      <button id="add-task-button" type="submit" disabled>Add</button>
    </form>
    <p id="status" role="status" aria-live="polite"></p>
    <ul id="task-list" aria-label="Task list"></ul>
  </section>
`;

const form = document.querySelector<HTMLFormElement>("#add-task-form");
const input = document.querySelector<HTMLInputElement>("#task-input");
const button = document.querySelector<HTMLButtonElement>("#add-task-button");
const list = document.querySelector<HTMLUListElement>("#task-list");
const status = document.querySelector<HTMLParagraphElement>("#status");

if (!form || !input || !button || !list || !status) {
  throw new Error("Missing required UI elements");
}

let tasks: Task[] = [];
const pendingTaskIds = new Set<string>();

const setStatus = (message: string, isError = false) => {
  status.textContent = message;
  status.dataset.state = isError ? "error" : "success";
};

const render = () => {
  const orderedTasks = sortTasks(tasks);
  list.innerHTML = "";

  for (const currentTask of orderedTasks) {
    const item = document.createElement("li");
    item.className = currentTask.completed ? "task task-complete" : "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = currentTask.completed;
    checkbox.disabled = pendingTaskIds.has(currentTask.id);
    checkbox.dataset.taskId = currentTask.id;
    checkbox.setAttribute("aria-label", currentTask.completed ? `Reopen ${currentTask.title}` : `Complete ${currentTask.title}`);

    const title = document.createElement("span");
    title.textContent = currentTask.title;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete";
    remove.disabled = pendingTaskIds.has(currentTask.id);
    remove.dataset.taskId = currentTask.id;
    remove.setAttribute("aria-label", `Delete ${currentTask.title}`);
    remove.textContent = "🗑";

    item.append(checkbox, title, remove);
    list.append(item);
  }
};

list.addEventListener("change", async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || target.type !== "checkbox") {
    return;
  }

  const taskId = target.dataset.taskId;
  if (!taskId || pendingTaskIds.has(taskId)) {
    return;
  }

  const currentTask = tasks.find((task) => task.id === taskId);
  if (!currentTask) {
    return;
  }

  const nextCompleted = target.checked;
  pendingTaskIds.add(taskId);
  target.disabled = true;

  try {
    const updatedTask = await client.toggleTask(taskId, nextCompleted);
    tasks = await client.listTasks();
    setStatus(updatedTask.completed ? `Completed “${updatedTask.title}”.` : `Reopened “${updatedTask.title}”.`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update task.";
    target.checked = currentTask.completed;
    setStatus(`Unable to update task: ${message}`, true);
  } finally {
    pendingTaskIds.delete(taskId);
    target.disabled = false;
    render();
  }
});

list.addEventListener("click", async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const button = target.closest("button.delete");
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  const taskId = button.dataset.taskId;
  if (!taskId || pendingTaskIds.has(taskId)) {
    return;
  }

  const currentTask = tasks.find((task) => task.id === taskId);
  if (!currentTask) {
    return;
  }

  pendingTaskIds.add(taskId);
  button.disabled = true;

  try {
    await client.deleteTask(taskId);
    tasks = await client.listTasks();
    setStatus(`Deleted “${currentTask.title}”.`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not delete task.";
    setStatus(`Unable to delete task: ${message}`, true);
  } finally {
    pendingTaskIds.delete(taskId);
    button.disabled = false;
    render();
  }
});

const loadTasks = async () => {
  try {
    tasks = await client.listTasks();
    render();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load tasks.";
    setStatus(`Unable to load tasks: ${message}`, true);
    tasks = [];
    render();
  }
};

input.addEventListener("input", () => {
  button.disabled = input.value.trim().length === 0;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = input.value.trim();

  if (!title) {
    setStatus("Enter a task before adding.", true);
    return;
  }

  button.disabled = true;
  setStatus("Adding task...");

  try {
    const newTask = await client.createTask(title);
    tasks = await client.listTasks();
    render();
    input.value = "";
    button.disabled = true;
    setStatus("Task added.");
    input.focus();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not add task.";
    setStatus(`Unable to add task: ${message}`, true);
    button.disabled = input.value.trim().length === 0;
  }
});

void loadTasks();
render();

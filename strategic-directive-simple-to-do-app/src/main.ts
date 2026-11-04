import "./styles.css";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

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

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasks = () => {
  const raw = localStorage.getItem("tasks");
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw) as Task[];
    tasks = Array.isArray(parsed) ? parsed : [];
  } catch {
    tasks = [];
  }
};

const sortTasks = () => {
  tasks.sort((a, b) => Number(a.completed) - Number(b.completed));
};

const render = () => {
  sortTasks();
  list.innerHTML = "";

  for (const task of tasks) {
    const item = document.createElement("li");
    item.className = task.completed ? "task task-complete" : "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Toggle ${task.title}`);
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      task.updatedAt = new Date().toISOString();
      saveTasks();
      render();
    });

    const title = document.createElement("span");
    title.textContent = task.title;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete";
    remove.setAttribute("aria-label", `Delete ${task.title}`);
    remove.textContent = "🗑";
    remove.addEventListener("click", () => {
      tasks = tasks.filter((entry) => entry.id !== task.id);
      saveTasks();
      render();
    });

    item.append(checkbox, title, remove);
    list.append(item);
  }
};

input.addEventListener("input", () => {
  button.disabled = input.value.trim().length === 0;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();

  if (!title) {
    status.textContent = "Enter a task before adding.";
    return;
  }

  tasks.push({
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  saveTasks();
  render();
  input.value = "";
  button.disabled = true;
  status.textContent = "Task added.";
  input.focus();
});

loadTasks();
render();

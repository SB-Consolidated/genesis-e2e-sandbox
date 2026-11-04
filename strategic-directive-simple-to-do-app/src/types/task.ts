export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TaskListResponse = {
  tasks: Task[];
};

export type TaskResponse = {
  task: Task;
};

export type DeleteTaskResponse = {
  deleted: boolean;
  task: Task;
};

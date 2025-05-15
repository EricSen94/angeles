export interface Task {
  id: string;
  title: string;
  description: string;
  categoryId: string | null;
  completed: boolean;
}
export interface Tasks {
  tasks: Task[];
}

export interface TaskWithColor extends Task {
  color: string;
}

export interface TaskWithColorArray {
  tasksWithColor: TaskWithColor[];
}

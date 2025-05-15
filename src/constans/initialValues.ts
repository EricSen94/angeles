import { AppState } from "features/appSlice";

export const initialState: AppState = {
  categories: [
    { id: "cat-1", name: "Work", color: "#1976d2" },
    { id: "cat-2", name: "Personal", color: "#d32f2f" },
    { id: "cat-3", name: "Work", color: "#197123" },
    { id: "cat-4", name: "Personal", color: "#52232f" },
  ],
  tasks: [
    {
      id: "task-1",
      title: "Write report",
      description: "Finish the quarterly business report",
      categoryId: "cat-1",
      completed: false,
    },
    {
      id: "task-2",
      title: "Buy groceries",
      description: "Milk, bread, eggs, and coffee",
      categoryId: "cat-2",
      completed: true,
    },
    {
      id: "task-3",
      title: "Write report",
      description: "Finish the quarterly business report",
      categoryId: "cat-3",
      completed: false,
    },
    {
      id: "task-4",
      title: "Buy groceries",
      description: "Milk, bread, eggs, and coffee",
      categoryId: "cat-4",
      completed: true,
    },
    {
      id: "task-5",
      title: "Write report",
      description: "Finish the quarterly business report",
      categoryId: "cat-1",
      completed: false,
    },
    {
      id: "task-6",
      title: "Buy groceries",
      description: "Milk, bread, eggs, and coffee",
      categoryId: "cat-2",
      completed: true,
    },
  ],
};

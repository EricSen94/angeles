import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { initialState } from "constans/initialValues";
import { Category } from "entities/categories/categories.types";
import { Task } from "entities/task/task.types";

export interface AppState {
  categories: Category[];
  tasks: Task[];
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<{ name: string; color: string }>) {
      state.categories.push({
        id: nanoid(),
        name: action.payload.name,
        color: action.payload.color,
      });
    },
    updateCategory(
      state,
      action: PayloadAction<{ id: string; name?: string; color?: string }>
    ) {
      const cat = state.categories.find((c) => c.id === action.payload.id);
      if (!cat) return;
      if (action.payload.name != null) cat.name = action.payload.name;
      if (action.payload.color != null) cat.color = action.payload.color;
    },
    removeCategory(state, action: PayloadAction<string>) {
      state.categories = state.categories.filter(
        (c) => c.id !== action.payload
      );
      state.tasks = state.tasks.filter((t) => t.categoryId !== action.payload);
    },

    addTask(
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        categoryId?: string;
      }>
    ) {
      state.tasks.push({
        id: nanoid(),
        title: action.payload.title,
        description: action.payload.description,
        categoryId: action.payload.categoryId ?? null,
        completed: false,
      });
    },
    updateTask(
      state,
      action: PayloadAction<{
        id: string;
        title?: string;
        description?: string;
        categoryId?: string | null;
        completed?: boolean;
      }>
    ) {
      const t = state.tasks.find((t) => t.id === action.payload.id);
      if (!t) return;
      if (action.payload.title != null) t.title = action.payload.title;
      if (action.payload.description != null)
        t.description = action.payload.description;
      if (action.payload.categoryId !== undefined)
        t.categoryId = action.payload.categoryId;
      if (action.payload.completed !== undefined)
        t.completed = action.payload.completed;
    },
    removeTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    toggleTaskCompleted(state, action: PayloadAction<string>) {
      const t = state.tasks.find((t) => t.id === action.payload);
      if (t) t.completed = !t.completed;
    },
  },
});

export const {
  addCategory,
  updateCategory,
  removeCategory,
  addTask,
  updateTask,
  removeTask,
  toggleTaskCompleted,
} = appSlice.actions;

export default appSlice.reducer;

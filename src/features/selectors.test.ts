// src/features/selectors.test.ts
import type { RootState } from "../store";
import {
  selectCategories,
  selectAllTasks,
  selectCompletedTasks,
  selectPendingTasks,
} from "./selectors";

describe("Selectores de app", () => {
  const categories = [
    { id: "c1", name: "Cat 1", color: "#ff0000" },
    { id: "c2", name: "Cat 2", color: "#00ff00" },
  ];

  const tasks = [
    {
      id: "t1",
      title: "Tarea 1",
      description: "Desc 1",
      categoryId: "c1",
      completed: false,
    },
    {
      id: "t2",
      title: "Tarea 2",
      description: "Desc 2",
      categoryId: "c1",
      completed: true,
    },
    {
      id: "t3",
      title: "Tarea 3",
      description: "Desc 3",
      categoryId: "c2",
      completed: false,
    },
  ];

  // Simulamos el estado completo
  const state = {
    app: {
      categories,
      tasks,
    },
  } as RootState;

  test("selectCategories devuelve todas las categorías", () => {
    expect(selectCategories(state)).toEqual(categories);
  });

  test("selectAllTasks devuelve todas las tareas", () => {
    expect(selectAllTasks(state)).toEqual(tasks);
  });

  test("selectCompletedTasks devuelve solo las tareas completadas", () => {
    expect(selectCompletedTasks(state)).toEqual([{ ...tasks[1] }]);
  });

  test("selectPendingTasks devuelve solo las tareas pendientes", () => {
    expect(selectPendingTasks(state)).toEqual([
      { ...tasks[0] },
      { ...tasks[2] },
    ]);
  });
});

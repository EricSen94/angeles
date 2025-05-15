// src/features/appSlice.test.ts
import appReducer, {
  addCategory,
  updateCategory,
  removeCategory,
  addTask,
  updateTask,
  removeTask,
  toggleTaskCompleted,
  Category,
  Task,
} from "./appSlice";
import type { AppState } from "./appSlice";

describe("appSlice reducer", () => {
  const initialState: AppState = { categories: [], tasks: [] };

  describe("addCategory", () => {
    it("añade una categoría con id, name y color", () => {
      const next = appReducer(
        initialState,
        addCategory({ name: "Work", color: "#ff0000" })
      );
      expect(next.categories).toHaveLength(1);
      const cat = next.categories[0];
      expect(cat).toMatchObject({ name: "Work", color: "#ff0000" });
      expect(typeof cat.id).toBe("string");
    });
  });

  describe("updateCategory", () => {
    const base: Category = { id: "1", name: "A", color: "#000" };
    const state: AppState = { categories: [base], tasks: [] };

    it("no modifica nada si id no existe", () => {
      const next = appReducer(
        state,
        updateCategory({ id: "999", name: "X", color: "#fff" })
      );
      expect(next).toEqual(state);
    });

    it("solo actualiza el nombre si solo se pasa name", () => {
      const next = appReducer(state, updateCategory({ id: "1", name: "Z" }));
      expect(next.categories[0]).toEqual({ ...base, name: "Z" });
    });

    it("solo actualiza el color si solo se pasa color", () => {
      const next = appReducer(
        state,
        updateCategory({ id: "1", color: "#123456" })
      );
      expect(next.categories[0]).toEqual({ ...base, color: "#123456" });
    });

    it("actualiza ambos campos cuando se pasan name y color", () => {
      const next = appReducer(
        state,
        updateCategory({ id: "1", name: "X", color: "#abcdef" })
      );
      expect(next.categories[0]).toEqual({
        id: "1",
        name: "X",
        color: "#abcdef",
      });
    });
  });

  describe("removeCategory", () => {
    const cats: Category[] = [
      { id: "1", name: "A", color: "#000" },
      { id: "2", name: "B", color: "#111" },
    ];
    const tasks: Task[] = [
      {
        id: "t1",
        title: "T1",
        description: "",
        categoryId: "1",
        completed: false,
      },
      {
        id: "t2",
        title: "T2",
        description: "",
        categoryId: "2",
        completed: false,
      },
      {
        id: "t3",
        title: "T3",
        description: "",
        categoryId: null,
        completed: false,
      },
    ];
    const state: AppState = { categories: cats, tasks };

    it("elimina la categoría y las tareas que la referencian", () => {
      const next = appReducer(state, removeCategory("1"));
      expect(next.categories).toHaveLength(1);
      expect(next.categories[0].id).toBe("2");
      // t1 se elimina, t2 y t3 quedan
      expect(next.tasks.map((t) => t.id)).toEqual(["t2", "t3"]);
    });

    it("si no existe id, no cambia nada", () => {
      const next = appReducer(state, removeCategory("999"));
      expect(next).toEqual(state);
    });
  });

  describe("addTask", () => {
    it("añade tarea con valores y categoryId null si no se pasa", () => {
      const next = appReducer(
        initialState,
        addTask({ title: "Foo", description: "Bar" })
      );
      expect(next.tasks).toHaveLength(1);
      const t = next.tasks[0];
      expect(t).toMatchObject({
        title: "Foo",
        description: "Bar",
        categoryId: null,
        completed: false,
      });
      expect(typeof t.id).toBe("string");
    });

    it("acepta categoryId cuando se pasa", () => {
      const next = appReducer(
        initialState,
        addTask({ title: "X", description: "Y", categoryId: "1" })
      );
      expect(next.tasks[0].categoryId).toBe("1");
    });
  });

  describe("updateTask", () => {
    const base: Task = {
      id: "t1",
      title: "A",
      description: "B",
      categoryId: "c",
      completed: false,
    };
    const state: AppState = { categories: [], tasks: [base] };

    it("no modifica si id no existe", () => {
      const next = appReducer(state, updateTask({ id: "x", title: "Z" }));
      expect(next).toEqual(state);
    });

    it("actualiza title y mantiene los demás campos", () => {
      const next = appReducer(state, updateTask({ id: "t1", title: "New" }));
      expect(next.tasks[0]).toEqual({ ...base, title: "New" });
    });

    it("actualiza description", () => {
      const next = appReducer(
        state,
        updateTask({ id: "t1", description: "Desc" })
      );
      expect(next.tasks[0]).toEqual({ ...base, description: "Desc" });
    });

    it("actualiza categoryId a nuevo valor y a null", () => {
      let next = appReducer(state, updateTask({ id: "t1", categoryId: "z" }));
      expect(next.tasks[0].categoryId).toBe("z");
      next = appReducer(next, updateTask({ id: "t1", categoryId: null }));
      expect(next.tasks[0].categoryId).toBeNull();
    });
  });

  describe("removeTask", () => {
    const tasks: Task[] = [
      {
        id: "t1",
        title: "",
        description: "",
        categoryId: null,
        completed: false,
      },
      {
        id: "t2",
        title: "",
        description: "",
        categoryId: null,
        completed: false,
      },
    ];
    const state: AppState = { categories: [], tasks };

    it("elimina la tarea cuyo id coincide", () => {
      const next = appReducer(state, removeTask("t1"));
      expect(next.tasks.map((t) => t.id)).toEqual(["t2"]);
    });

    it("no hace nada si id no existe", () => {
      const next = appReducer(state, removeTask("x"));
      expect(next).toEqual(state);
    });
  });

  describe("toggleTaskCompleted", () => {
    const base: Task = {
      id: "t1",
      title: "",
      description: "",
      categoryId: null,
      completed: false,
    };
    const state: AppState = { categories: [], tasks: [base] };

    it("invierte completed de false a true y viceversa", () => {
      let next = appReducer(state, toggleTaskCompleted("t1"));
      expect(next.tasks[0].completed).toBe(true);
      next = appReducer(next, toggleTaskCompleted("t1"));
      expect(next.tasks[0].completed).toBe(false);
    });

    it("si id no existe, no cambia nada", () => {
      const next = appReducer(state, toggleTaskCompleted("x"));
      expect(next).toEqual(state);
    });
  });
});

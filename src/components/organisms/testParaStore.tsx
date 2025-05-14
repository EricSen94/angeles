import React, { ReactElement, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  addCategory,
  addTask,
  removeCategory,
  removeTask,
} from "../../features/appSlice";
import { selectAllTasks, selectCategories } from "../../features/selectors";

export const CategoryList: React.FC = () => {
  const categories = useAppSelector(selectCategories);
  const task = useAppSelector(selectAllTasks);
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDecription] = useState<string>("");
  const [taskCategorie, setTaskCategorie] = useState<string>("");

  useEffect(() => {
    if (categories.length > 0 && !taskCategorie) {
      setTaskCategorie(categories[0].id);
    }
  }, [categories, taskCategorie]);

  const handleAdd = () => {
    if (name.trim()) {
      dispatch(addCategory({ name, color }));
      setName("");
    }
  };

  const handleAddTask = () => {
    if (!taskTitle.trim() || !taskDescription.trim() || !taskCategorie.trim())
      return;
    dispatch(
      addTask({
        title: taskTitle,
        description: taskDescription,
        categoryId: taskCategorie,
      })
    );
    setTaskTitle("");
    setTaskDecription("");
  };

  return (
    <div>
      <h3>Categorías</h3>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id} style={{ color: cat.color }}>
            {cat.name}
            <button onClick={() => dispatch(removeCategory(cat.id))}>🗑</button>
          </li>
        ))}
      </ul>

      <input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button onClick={handleAdd}>Añadir categoría</button>
      {categories.length > 0 && (
        <>
          <h3>Tareas</h3>
          <ul>
            {task.map((t) => {
              const cat = categories.find((c) => c.id === t.categoryId);
              return (
                <li key={t.id}>
                  <strong>{t.title}</strong>: {t.description} (
                  {cat?.name ?? "Sin categoría"})
                  <button onClick={() => dispatch(removeTask(t.id))}>🗑</button>
                </li>
              );
            })}
          </ul>
          <input
            placeholder="Tarea"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <input
            placeholder="Descripcion"
            value={taskDescription}
            onChange={(e) => setTaskDecription(e.target.value)}
          />
          <select onChange={(e) => setTaskCategorie(e.target.value)}>
            {categories.map((cat) => (
              <option value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <button
            onClick={handleAddTask}
            disabled={
              !taskTitle.trim() ||
              !taskDescription.trim() ||
              !taskCategorie.trim()
            }
          >
            Añadir tarea
          </button>
        </>
      )}
    </div>
  );
};

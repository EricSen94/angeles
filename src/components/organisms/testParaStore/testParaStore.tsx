import React, { ReactElement, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import {
  addCategory,
  addTask,
  removeCategory,
  removeTask,
} from "../../../features/appSlice";
import { selectAllTasks, selectCategories } from "../../../features/selectors";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

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

  const hanldeTaskCategorieSelect = (e: SelectChangeEvent) => {
    setTaskCategorie(e.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }} data-testid="category-list-container">
      <Typography variant="h3">Categorías</Typography>

      {categories.map((cat) => (
        <Grid container spacing={2} data-testid={"cat-row-" + cat.name}>
          <Grid size={6}>
            <Typography
              variant="body1"
              key={cat.id}
              style={{ color: cat.color }}
            >
              {cat.name}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Button
              data-testid={"cat-row-button-" + cat.name}
              variant="outlined"
              onClick={() => dispatch(removeCategory(cat.id))}
            >
              🗑
            </Button>
          </Grid>
        </Grid>
      ))}

      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography>Nombre</Typography>
          <TextField
            data-testid="category-name-input"
            id="category-name"
            label=""
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <input
            data-testid="category-color-input"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <Button
            data-testid="add-category-button"
            onClick={handleAdd}
            variant="contained"
          >
            Añadir categoría
          </Button>
        </Grid>
      </Grid>

      {categories.length > 0 && (
        <>
          <Typography variant="h3">Tareas</Typography>
          <Grid container>
            {task.map((t) => {
              const cat = categories.find((c) => c.id === t.categoryId);
              return (
                <Grid key={t.id} size={6}>
                  <Typography variant="body1">{t.title}</Typography>
                  <Typography variant="body1">{t.description}</Typography>
                  <Typography variant="body1">
                    ({cat?.name ?? "Sin categoría"})
                  </Typography>
                  <Button
                    data-testid={"task-delete-button-" + t.title}
                    onClick={() => dispatch(removeTask(t.id))}
                  >
                    🗑
                  </Button>
                </Grid>
              );
            })}
          </Grid>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography> Titulo</Typography>
              <TextField
                data-testid="task-title-input"
                id="outlined-basic"
                label=""
                variant="outlined"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <Typography> Descripccion</Typography>
              <TextField
                data-testid="task-description-input"
                id="outlined-basic"
                label=""
                variant="outlined"
                value={taskDescription}
                onChange={(e) => setTaskDecription(e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <Typography>Categoria</Typography>
              <Select
                data-testid="task-select-input"
                value={taskCategorie}
                onChange={hanldeTaskCategorieSelect}
                sx={{ width: 100 }}
                MenuProps={{
                  PaperProps: {
                    "data-testid": "task-select-listbox",
                  },
                }}
              >
                {categories.map((cat) => (
                  <MenuItem
                    key={cat.id}
                    value={cat.id}
                    data-testid={`task-select-option-${cat.id}`}
                  >
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid size={12}>
              <Button
                data-testid="add-task-button"
                sx={{ backgroundColor: "green" }}
                variant="contained"
                onClick={handleAddTask}
                disabled={
                  !taskTitle.trim() ||
                  !taskDescription.trim() ||
                  !taskCategorie.trim()
                }
              >
                Añadir tarea
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

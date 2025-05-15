import React, { ReactElement, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  addCategory,
  addTask,
  removeCategory,
  removeTask,
} from "../../features/appSlice";
import { selectAllTasks, selectCategories } from "../../features/selectors";
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

  const hanldeTaskCategorieSelect = (e: SelectChangeEvent) => {
    setTaskCategorie(e.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h3">Categorías</Typography>

      {categories.map((cat) => (
        <Grid container spacing={2}>
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
            id="category-name"
            label=""
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <Button onClick={handleAdd} variant="contained">
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
                  <Button onClick={() => dispatch(removeTask(t.id))}>🗑</Button>
                </Grid>
              );
            })}
          </Grid>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography> Titulo</Typography>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <Typography> Descripccion</Typography>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                onChange={(e) => setTaskDecription(e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <Typography>Categoria</Typography>
              <Select onChange={hanldeTaskCategorieSelect} sx={{ width: 100 }}>
                {categories.map((cat) => (
                  <MenuItem value={cat.id}>{cat.name}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid size={12}>
              <Button
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

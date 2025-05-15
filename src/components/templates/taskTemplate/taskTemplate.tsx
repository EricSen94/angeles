import { Button, Grid, Typography } from "@mui/material";
import CategoriesList from "components/organisms/categoriesList/categoriesList";
import TaskCard from "components/organisms/taskCard/taskCard";
import TaskCompletitionSelector from "components/molecules/taskCompletitionSelector/taskCompletitionSelector";
import TaskHeader from "components/organisms/taskheader/taskHeader";
import { STRINGS } from "constans/strings";
import { Category } from "entities/categories/categories.types";
import { TaskWithColor, TaskWithColorArray } from "entities/task/task.types";
import TaskBoard from "components/organisms/tasksBoard/taskBoard";
import HeaderBar from "components/organisms/headerBar/headerBar";

interface TaskTemplateProps {
  tasksWithColor: TaskWithColor[];
  categories: Category[];
  onclick: (id: string) => void;
  showCompletedTask: boolean;
  setShowCompletedTask: (showCompletedTask: boolean) => void;
}

const TaskTemplate = ({
  tasksWithColor,
  categories,
  onclick,
  showCompletedTask,
  setShowCompletedTask,
}: TaskTemplateProps) => {
  return (
    <>
      <HeaderBar />
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        <TaskHeader />
        <CategoriesList categories={categories} />
        <TaskBoard
          tasksWithColor={tasksWithColor}
          onclick={onclick}
          showCompletedTask={showCompletedTask}
          setShowCompletedTask={setShowCompletedTask}
        />
        <Grid size={1} />
      </Grid>
    </>
  );
};
export default TaskTemplate;

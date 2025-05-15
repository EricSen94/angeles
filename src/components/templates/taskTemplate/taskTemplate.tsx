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
import AddTaskModal from "components/organisms/addTaskModal/addTaskModal";

interface TaskTemplateProps {
  tasksWithColor: TaskWithColor[];
  categories: Category[];
  finishTask: (id: string) => void;
  showCompletedTask: boolean;
  setShowCompletedTask: (showCompletedTask: boolean) => void;
  openModal: () => void;
  showAddTask: boolean;
  hideModal: () => void;
  addTask: (name: string, category: string, description: string) => void;
}

const TaskTemplate = ({
  tasksWithColor,
  categories,
  finishTask,
  showCompletedTask,
  setShowCompletedTask,
  openModal,
  showAddTask,
  hideModal,
  addTask,
}: TaskTemplateProps) => {
  return (
    <div data-testid="task-template">
      <AddTaskModal
        open={showAddTask}
        categories={categories}
        onClose={hideModal}
        onSubmit={({ name, category, description }) =>
          addTask(name, category, description)
        }
      />
      <HeaderBar />
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        <TaskHeader openModal={openModal} />
        <CategoriesList categories={categories} />
        <TaskBoard
          tasksWithColor={tasksWithColor}
          finishTask={finishTask}
          showCompletedTask={showCompletedTask}
          setShowCompletedTask={setShowCompletedTask}
        />
        <Grid size={1} />
      </Grid>
    </div>
  );
};
export default TaskTemplate;

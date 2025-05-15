import { Grid } from "@mui/material";
import TaskCompletitionSelector from "components/molecules/taskCompletitionSelector/taskCompletitionSelector";
import { TaskWithColor } from "entities/task/task.types";
import TaskCard from "../taskCard/taskCard";

interface TaskBoardProps {
  tasksWithColor: TaskWithColor[];
  finishTask: (id: string) => void;
  showCompletedTask: boolean;
  setShowCompletedTask: (showCompletedTask: boolean) => void;
}

const TaskBoard = ({
  tasksWithColor,
  finishTask,
  showCompletedTask,
  setShowCompletedTask,
}: TaskBoardProps) => {
  return (
    <Grid size={7} data-testid="task-board">
      <Grid size={12}>
        <TaskCompletitionSelector
          showCompletedTask={showCompletedTask}
          setShowCompletedTask={setShowCompletedTask}
        />
      </Grid>
      <Grid container spacing={2} sx={{ mt: 5 }} size={12}>
        {tasksWithColor.map((task, idx) => (
          <Grid size={6} key={task.id ?? idx}>
            <TaskCard task={task} onclick={finishTask} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
export default TaskBoard;

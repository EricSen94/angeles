import { Grid } from "@mui/material";
import TaskContent from "components/molecules/taskContent/taskContent";
import TaskFooter from "components/molecules/taskFooter/taskFooter";
import { TaskWithColor } from "entities/task/task.types";

interface TaskCardProps {
  task: Partial<TaskWithColor>;
  onclick: (id: string) => void;
}

const TaskCard = ({ task, onclick }: TaskCardProps) => {
  return (
    <Grid
      sx={{
        border: 1,
        borderColor: task.color,
        borderStyle: "solid",
        borderRadius: "8px",
      }}
      data-testid="task-card"
    >
      <Grid size={12}>
        <TaskContent title={task.title} description={task.description} />
      </Grid>
      <Grid size={12}>
        <TaskFooter task={task} onClick={onclick} />
      </Grid>
    </Grid>
  );
};

export default TaskCard;

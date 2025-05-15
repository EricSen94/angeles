import { Button, Grid } from "@mui/material";
import Dot from "components/atoms/dot/dot";
import { STRINGS } from "constans/strings";
import { TaskWithColor } from "entities/task/task.types";

interface TaskFooterProps {
  task: Partial<TaskWithColor>;
  onClick: (id: string) => void;
}

const TaskFooter = ({ task, onClick }: TaskFooterProps) => {
  return (
    <Grid
      container
      sx={{
        margin: "25px 25px",
      }}
      data-testid="task-footer"
    >
      <Grid
        size={6}
        sx={{
          display: "flex",
          alignItems: "end",
        }}
      >
        <Dot color={task.color!} />
      </Grid>
      <Grid size={6} sx={{ textAlign: "right" }}>
        {!task.completed && (
          <Button
            data-testid="finish-task-button"
            variant="contained"
            sx={{
              backgroundColor: "#0DD169",
              borderRadius: "6px",
              fontSize: "16px",
            }}
            onClick={() => {
              onClick(task.id!);
            }}
          >
            {STRINGS.finish_task}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
export default TaskFooter;

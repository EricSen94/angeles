import { Grid, Typography } from "@mui/material";
import { Task } from "entities/task/task.types";

const TaskContent = ({ title, description }: Partial<Task>) => {
  return (
    <Grid
      container
      rowGap={2}
      sx={{
        margin: "25px 25px",
      }}
      data-testid="task-content"
    >
      <Grid size={12} sx={{ textAlign: "left" }}>
        <Typography
          variant="h6"
          sx={{ fontSize: "20px" }}
          data-testid="task-content-title"
        >
          {title}
        </Typography>
      </Grid>
      <Grid size={12} sx={{ textAlign: "left" }}>
        <Typography
          data-testid="task-content-description"
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "16px" }}
        >
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default TaskContent;

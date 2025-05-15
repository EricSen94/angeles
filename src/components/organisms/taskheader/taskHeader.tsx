import { STRINGS } from "constans/strings";
import { Button, Grid, Typography } from "@mui/material";

interface TaskHeaderProps {
  openModal: () => void;
}

const TaskHeader = ({ openModal }: TaskHeaderProps) => {
  return (
    <Grid
      container
      size={12}
      sx={{ marginBottom: "20px" }}
      data-testid="task-header"
    >
      <Grid size={0.7} />
      <Grid
        size={5.3}
        sx={{
          display: "flex",
          alignItems: "end",
        }}
      >
        <Typography
          data-testid="task-header-title"
          variant="h4"
          color="text.secondary"
          sx={{
            fontSize: "40px",
            color: "#000000",
            fontWeight: 400,
            textAlign: "left",
          }}
        >
          {STRINGS.task}
        </Typography>
      </Grid>
      <Grid size={4.5} sx={{ textAlign: "end" }}>
        <Button
          data-testid="add-task-button"
          variant="contained"
          sx={{
            bgcolor: "#0D14D1",

            fontSize: "16",
          }}
          onClick={openModal}
        >
          {STRINGS.addTask}
        </Button>
      </Grid>
    </Grid>
  );
};
export default TaskHeader;

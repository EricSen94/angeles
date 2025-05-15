import { Button, Grid, Typography } from "@mui/material";
import { STRINGS } from "constans/strings";

const TaskHeader = () => {
  return (
    <Grid container size={12} sx={{ marginBottom: "20px" }}>
      <Grid size={0.7} />
      <Grid
        size={5.3}
        sx={{
          display: "flex",
          alignItems: "end",
        }}
      >
        <Typography
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
          variant="contained"
          sx={{
            bgcolor: "#0D14D1",

            fontSize: "16",
          }}
        >
          {STRINGS.addTask}
        </Button>
      </Grid>
    </Grid>
  );
};
export default TaskHeader;

import { Box, Button, ButtonGroup, useTheme } from "@mui/material";
import { STRINGS } from "constans/strings";
import { useEffect } from "react";

interface TaskCompletitionSelectorProps {
  showCompletedTask: boolean;
  setShowCompletedTask: (show: boolean) => void;
}

const TaskCompletitionSelector = ({
  showCompletedTask,
  setShowCompletedTask,
}: TaskCompletitionSelectorProps) => {
  const theme = useTheme();

  useEffect(() => {
    console.log(showCompletedTask);
  }, [showCompletedTask]);

  return (
    <Box
      data-testid="task-completition-selector"
      display="flex"
      justifyContent="center"
      sx={{ mt: 2 }}
    >
      <ButtonGroup
        variant="contained"
        aria-label="task status"
        sx={{
          color: "#000000",
          width: "80%",
          borderRadius: "16px",
        }}
      >
        <Button
          data-testid="pending-task-button"
          sx={{
            color: "#000000",
            fontSize: "16px",
            fontWeight: 400,
            flex: 1,
            bgcolor: !showCompletedTask ? "#D9D9D9" : "#F2F0F0",
            borderRadius: "8px 0px 0px 8px",
          }}
          onClick={() => setShowCompletedTask(false)}
        >
          {STRINGS.pendingTask}
        </Button>
        <Button
        data-testid="completed-task-button"
          sx={{
            color: "#000000",
            fontSize: "16px",
            fontWeight: 400,
            flex: 1,
            bgcolor: showCompletedTask ? "#D9D9D9" : "#F2F0F0",
            borderRadius: "0px 8px 8px 0px",
          }}
          onClick={() => setShowCompletedTask(true)}
        >
          {STRINGS.completedTask}
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default TaskCompletitionSelector;

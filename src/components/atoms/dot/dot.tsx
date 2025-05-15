import { Box } from "@mui/material";

const Dot = ({ color }: { color: string }) => {
  return (
    <Box
      data-testid="dot"
      sx={{
        width: 20,
        height: 20,
        bgcolor: color,
        borderRadius: "50%",
        display: "inline-block",
      }}
    />
  );
};
export default Dot;

import React from "react";
import { Box, Toolbar, Typography, useTheme } from "@mui/material";

const TopBar: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        data-testid="header-bar"
        component="header"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: 83,
          bgcolor: "#D9D9D9",
          color: "common.white",
          display: "flex",
          alignItems: "center",
          px: 2,
          zIndex: theme.zIndex.appBar + 1,
        }}
      ></Box>

      <Toolbar sx={{ minHeight: 83, marginBottom: "60px" }} />
    </>
  );
};

export default TopBar;

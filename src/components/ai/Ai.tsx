import { AutoGraph } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export const Ai = () => {
  // const theme = useTheme();

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <AutoGraph sx={{ fontSize: 32, color: "white" }} />

      <Typography color="white" variant="body2">
        Coming soon!
      </Typography>
    </Box>
  );
};

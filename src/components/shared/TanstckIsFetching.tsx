import { Box, Chip, LinearProgress } from "@mui/material";
import { useIsFetching } from "@tanstack/react-query";
interface TanstckIsFetchingProps {}

export function TanstckIsFetching({}: TanstckIsFetchingProps) {
  const is_fetching = useIsFetching();
  if (is_fetching < 1) {
    return null;
  }
  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <LinearProgress />
      <Chip
        label={is_fetching}
        variant="outlined"
        size="small"
        className="absolute  top-0"
      />
    </Box>
  );
}

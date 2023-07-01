import React from "react";
import { Box, CircularProgress } from "../materialUI";
import { PRIMARY_500, fullWidthBoxStyle } from "../../styles";

const Loader = ({ 
  size,
  color,
}: { 
  size?: "small" | "medium";
  color?: string;
}) => {

  return (
    <Box sx={{...fullWidthBoxStyle, height: "100%" }}>
      <CircularProgress sx={{ color: color ?? PRIMARY_500, fontSize: size ?? "medium" }} />
    </Box>
  );
}

export default Loader;
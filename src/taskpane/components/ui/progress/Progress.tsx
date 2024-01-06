import { Box, CircularProgress, Typography } from "@mui/material";
import * as React from "react";

export interface Props {
  message?: string;
  title?: string;
}

export const Progress = ({ message, title }: Props) => {
  return (
    <Box>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="caption">{message}</Typography>
      <CircularProgress color="secondary" />
    </Box>
  );
};

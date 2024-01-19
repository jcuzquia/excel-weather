import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import Link from "../Link/Link";

interface Props {
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  href: string;
}

const DashboardOption = ({ subtitle, description, href, icon }: Props) => {
  return (
    <Link href={href}>
      <Paper>
        <Box display={"flex"} alignItems={"center"} pl={2}>
          {icon}
          <Box display={"flex"} pl={2} sx={{ flexDirection: "column" }}>
            <Typography variant="subtitle1">{subtitle}</Typography>
            <Typography variant="caption">{description}</Typography>
          </Box>
        </Box>
      </Paper>
    </Link>
  );
};

export default DashboardOption;

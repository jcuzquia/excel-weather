import { Box, Typography } from "@mui/material";
import React from "react";
import Link from "../../components/ui/Link/Link";

interface Props {
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  href: string;
}

const DashboardOption = ({ subtitle, description, href, icon }: Props) => {
  return (
    <Link href={href}>
      <Box display={"flex"} alignItems={"center"} pl={2}>
        {icon}
        <Box display={"flex"} pl={2} sx={{ flexDirection: "column" }}>
          <Typography variant="subtitle1">{subtitle}</Typography>
          <Typography variant="caption">{description}</Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default DashboardOption;

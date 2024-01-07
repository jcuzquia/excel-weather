import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import theme from "../../styles/theme";

interface Props {
  title: string;
  icon: React.ReactNode;
}

export const MainListItem = ({ title, icon }: Props) => {
  return (
    <ListItem>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>
          <Typography variant="subtitle1" color={theme.palette.text.primary}>
            {title}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

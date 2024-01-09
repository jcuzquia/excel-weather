import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import theme from "../../styles/theme";
import { useHistory } from "react-router-dom";

interface Props {
  title: string;
  icon: React.ReactNode;
  href: string;
}

export const MainListItem = ({ title, icon, href }: Props) => {
  const history = useHistory();
  return (
    <ListItem>
      <ListItemButton onClick={() => history.push(href)}>
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

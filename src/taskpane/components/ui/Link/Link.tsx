import React from "react";
import { Link as MuiLink } from "@mui/material";
import { LinkProps } from "@mui/material/Link/Link";
import { Link as ReactRouterLink } from "react-router-dom";

const Link: React.FC<LinkProps> = (props) => {
  return <MuiLink {...props} component={ReactRouterLink} to={props.href ?? "#"} sx={{ textDecoration: "none" }} />;
};

export default Link;

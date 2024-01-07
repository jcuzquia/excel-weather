import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthStore } from "../../../../stores/auth/auth.store";
import Link from "../Link/Link";

export const SettingsMenu = () => {
  const anchorElUser = React.useRef<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const logoutUser = useAuthStore((state) => state.logoutUser);
  const user = useAuthStore((state) => state.checkAuthStatus());

  const history = useHistory();

  const handleOpenUserMenu = () => {
    setOpen(true);
  };
  const handleCloseUserMenu = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    history.push("/");
  };
  console.log(status);

  if (user) {
    return (
      <Box sx={{ flexGrow: 0 }} ref={anchorElUser}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px", display: { xs: "block", md: "none" } }}
          id="menu-appbar"
          anchorEl={anchorElUser.current}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Link href="/profile">
              <Typography textAlign="center">Profile</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Account</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Link href="/dashboard">
              <Typography textAlign="center">Dashboard</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Link href="/nrel-weather">
              <Typography textAlign="center">Get Weather</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
  } else {
    return (
      <Box display={"flex"} gap={1}>
        <Button variant="outlined" color="primary" size="small" onClick={() => history.push("/login")}>
          Login
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={() => history.push("/signup")}>
          Signup
        </Button>
      </Box>
    );
  }
};

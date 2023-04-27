import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../../../firebase/config";
import { logout, selectUser } from "../../../../redux/userSlice";
import Link from "../Link/Link";
import { useTypedSelector } from "../../../../redux/store";

const SettingsMenu = () => {
  const anchorElUser = React.useRef<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const user = useTypedSelector(selectUser);
  const dispatch = useDispatch();

  const handleOpenUserMenu = () => {
    setOpen(true);
  };
  const handleCloseUserMenu = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    auth.signOut();
  };

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
            <Typography textAlign="center">Profile</Typography>
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
    return null;
  }
};

export default SettingsMenu;
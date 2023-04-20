import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { selectUser } from "../../../../redux/userSlice";
import Link from "../Link/Link";
import SettingsMenu from "./SettingsMenu";
import { useTypedSelector } from "../../../../redux/store";

const Navbar = () => {
  const user = useTypedSelector(selectUser);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Excel Weather
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link href={"/"} sx={{ backgroundColor: "transparent" }}>
                  <Typography textAlign="center">Home</Typography>
                </Link>
              </MenuItem>
              {!user && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href={"/signup"}>
                    <Typography textAlign="center">Signup</Typography>
                  </Link>
                </MenuItem>
              )}
              {!user && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href={"/login"}>
                    <Typography textAlign="center">Login</Typography>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Excel Weather
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link href="/">
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                Home
              </Button>
            </Link>
            {!user && (
              <Box>
                <Link href="/signup">
                  <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                    Signup
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                    variant="outlined"
                  >
                    Login
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
          <SettingsMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

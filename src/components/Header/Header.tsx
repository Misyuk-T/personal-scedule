import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";

import { useTypedDispatch, useTypedSelector } from "redux/store";
import { logoutUser, observeAuth, openLoginPopup } from "actions/login";
import { observeSchedules } from "actions/schedule";
import _get from "lodash.get";

import logo from "assets/logo.png";

const pages = ["calendar", "schedule"];

const Header = () => {
  const { user, isAuthorized } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    dispatch(observeAuth());
  }, [dispatch]);

  useEffect(() => {
    const origin = _get(location, "state.from.pathname", "/");
    location !== origin && navigate(origin);
  }, [isAuthorized]);

  useEffect(() => {
    if (user.schedules) {
      dispatch(observeSchedules(user.schedules));
    }
  }, [dispatch, user.schedules]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Box
              component="img"
              mr={2}
              alt="logo"
              src={logo}
              sx={{
                height: 75,
                width: 120,
              }}
            />
          </Link>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {isAuthorized &&
              pages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  to={page}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
          </Box>

          {isAuthorized ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.name} src={user.photo} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={!!anchorElUser}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button variant="text" component={Link} to="/profile">
                    Profile
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button variant="text" onClick={logoutUser}>
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={openLoginPopup}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;

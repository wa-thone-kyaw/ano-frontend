import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { drawerWidth } from "../constants";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "drawerOpen",
})(({ theme, drawerOpen }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(drawerOpen && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: "#cb2f30",
}));

const AppBarComponent = ({ drawerOpen, handleDrawerOpen }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { isAuthenticated, signOut } = useAuth();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut();
    navigate("/sign-in"); // Redirect to sign-in page
    handleMenuClose();
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false);
      });
    }
  };

  return (
    <AppBar position="fixed" drawerOpen={drawerOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(drawerOpen && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        {/* <Typography variant="h6" noWrap component="div">
          Aung Ngwe Oh
        </Typography> */}
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          size="large"
          edge="end"
          aria-label="fullscreen toggle"
          aria-controls={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleFullScreen}
          color="inherit"
        >
          {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={handleMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          {isAuthenticated ? (
            <>
              <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
              <Divider />
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </>
          ) : (
            <MenuItem onClick={() => navigate("/sign-in")}>Sign In</MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;

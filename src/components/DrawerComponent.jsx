// src/components/DrawerComponent.jsx
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import Collapse from "@mui/material/Collapse";
import { Link } from "react-router-dom";
import { drawerWidth } from "../constants";
import DrawerHeaderComponent from "./DrawerHeader";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ViewListIcon from "@mui/icons-material/ViewList";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";

// Styled Drawer Component
const DrawerComponent = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "#cb2f30",
    color: "#FFDB00", // White text color
  },
}));

const Sidebar = ({ drawerOpen, handleDrawerClose }) => {
  const [open, setOpen] = useState(true); // Default open

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <DrawerComponent variant="persistent" anchor="left" open={drawerOpen}>
      <DrawerHeaderComponent onClose={handleDrawerClose} />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/home">
            <ListItemIcon>
              <HomeIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <ShoppingCartIcon style={{ color: "#fff" }} />
          </ListItemIcon>
          <ListItemText primary="Products" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/products">
              <ListItemIcon>
                <ViewListIcon style={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Product List" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/add-product">
              <ListItemIcon>
                <AddBoxIcon style={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Add Product" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/orders">
            <ListItemIcon>
              <AssignmentIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/customers">
            <ListItemIcon>
              <PeopleIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/settings">
            <ListItemIcon>
              <SettingsIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </DrawerComponent>
  );
};

export default Sidebar;

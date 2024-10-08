import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { drawerWidth } from "../constants";

const Main = styled(Box, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0, // For when drawer is open
    }),
    marginTop: theme.spacing(8),
  })
);

const MainContent = ({ drawerOpen, children }) => (
  <Main open={drawerOpen}>{children}</Main>
);

export default MainContent;

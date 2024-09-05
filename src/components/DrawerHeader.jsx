import React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import logo from "../assets/images/ano.jpg";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
  backgroundColor: "#cb2f30",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 700,
  color: "#FFDB00",
  fontFamily: "'Roboto', sans-serif",
  marginLeft: theme.spacing(2),
}));

const Logo = styled("img")({
  width: 60,
  height: 60,
  marginRight: 16,
});

const DrawerHeaderComponent = ({ onClose }) => {
  return (
    <DrawerHeader>
      <Box display="flex" alignItems="center">
        <Logo src={logo} alt="Logo" />
        <StyledTypography variant="h8" noWrap>
          ANO
        </StyledTypography>
      </Box>
      <Box>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon style={{ color: "#fff" }} />
        </IconButton>
      </Box>
    </DrawerHeader>
  );
};

export default DrawerHeaderComponent;

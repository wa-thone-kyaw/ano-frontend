import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const SignOutPage = ({ onSignOut }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    onSignOut();
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        p: 3,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Are you sure you want to sign out?
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSignOut}
        sx={{ mt: 2, mr: 2 }}
      >
        Sign Out
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/")}
        sx={{ mt: 2 }}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default SignOutPage;

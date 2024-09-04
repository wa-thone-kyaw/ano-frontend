import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const Root = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background:
    "url('/path-to-your-background-image.jpg') no-repeat center center/cover",
  textAlign: "center",
  color: "#fff",
  padding: theme.spacing(2),
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.7)", // Slightly darker background for better contrast
  padding: theme.spacing(5),
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)", // Add shadow for depth
  maxWidth: "600px", // Limit width for better readability
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem", // Adjusted for a better look on smaller screens
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
  color: "#ffffff",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem", // Responsive font size for mobile devices
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.3rem",
  marginBottom: theme.spacing(3),
  color: "#ffffff",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "1rem",
  padding: theme.spacing(1.5, 5),
  borderRadius: "25px", // Rounded corners for the button
  backgroundColor: "#3f51b5", // Primary color of your theme
  color: "#fff",
  transition: "transform 0.3s, box-shadow 0.3s", // Smooth hover effect
  "&:hover": {
    transform: "translateY(-2px)", // Slight upward movement on hover
    boxShadow: "0 8px 20px rgba(63, 81, 181, 0.3)", // Shadow effect on hover
    backgroundColor: "#303f9f", // Darker shade on hover
  },
}));

const Home = () => {
  return (
    <Root>
      <ContentContainer>
        <Title variant="h1">Welcome to Aung Ngwe Oh</Title>
        <Subtitle variant="h5">
          Leading Provider of Plastic Materials and Products in Yangon
        </Subtitle>
        <StyledButton variant="contained">Learn More</StyledButton>
      </ContentContainer>
    </Root>
  );
};

export default Home;

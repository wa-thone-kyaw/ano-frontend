import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Avatar,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from your API
    fetch("http://ano.koneloneshin.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProductCount(data.length); // Assuming the response is an array of products
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ padding: "40px" }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "40px" }}
      >
        Welcome to the Dashboard!
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                padding: "20px",
                textAlign: "center",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Avatar
                  sx={{
                    bgcolor: deepPurple[500],
                    width: 56,
                    height: 56,
                    margin: "0 auto 20px",
                  }}
                >
                  P
                </Avatar>
                <Typography variant="h6" component="div" gutterBottom>
                  Total Products
                </Typography>
                <Typography variant="h3" color="primary">
                  {productCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* You can add more cards here for other statistics */}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;

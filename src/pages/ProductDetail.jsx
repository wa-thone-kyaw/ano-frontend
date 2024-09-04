import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Box,
  CircularProgress,
  Divider,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h6" align="center" color="error">
          Product not found.
        </Typography>
      </Container>
    );
  }

  const imageUrl = product.photo_url
    ? `http://localhost:5000/uploads/${product.photo_url}`
    : "";

  return (
    <Container>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Back
      </Button>

      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={imageUrl}
              alt={product.name}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 1,
                border: "1px solid #ddd",
                boxShadow: 2,
              }}
            />
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              <Chip
                icon={<InfoIcon />}
                label="Details"
                sx={{ marginBottom: 1 }}
              />
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Group:</strong> {product.group_name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Size:</strong> {product.size}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Packaging:</strong> {product.packaging}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Color:</strong> {product.color}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Price:</strong> ${product.price}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Raw Material Type:</strong> {product.raw_material_type}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Machine Type:</strong> {product.machine_type}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>MO Number:</strong> {product.mo_number}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetail;

import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    group_name: "",
    size: "",
    packaging: "",
    color: "",
    price: "",
    raw_material_type: "",
    machine_type: "",
    mo_number: "",
    photo: null,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProductData({ ...productData, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });

    axios
      .post("http://ano.koneloneshin.com/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setSuccessMessage("Product added successfully!");
        setErrorMessage("");
        setProductData({
          name: "",
          group_name: "",
          size: "",
          packaging: "",
          color: "",
          price: "",
          raw_material_type: "",
          machine_type: "",
          mo_number: "",
          photo: null,
        });
      })
      .catch((error) => {
        setErrorMessage("Failed to add product. Please try again.");
        setSuccessMessage("");
      });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Add Product
          </Typography>

          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {[
                { name: "name", label: "Product Name" },
                { name: "group_name", label: "Group Name" },
                { name: "size", label: "Size" },
                { name: "packaging", label: "Packaging" },
                { name: "color", label: "Color" },
                { name: "price", label: "Price" },
                { name: "raw_material_type", label: "Raw Material Type" },
                { name: "machine_type", label: "Machine Type" },
                { name: "mo_number", label: "MO Number" },
              ].map((field) => (
                <Grid item xs={12} sm={6} key={field.name}>
                  <TextField
                    name={field.name}
                    label={field.label}
                    fullWidth
                    value={productData[field.name]}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  color="primary"
                  startIcon={<UploadFileIcon />}
                >
                  Upload Photo
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>
            </Grid>

            <CardActions sx={{ justifyContent: "center", mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<AddCircleOutlineIcon />}
                size="large"
              >
                Add Product
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddProduct;

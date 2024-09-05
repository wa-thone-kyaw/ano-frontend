import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/apiConfig";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  IconButton,
  Tooltip,
  Box,
  TablePagination,
  useTheme,
  DialogContentText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [groupFilter, setGroupFilter] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalProducts, setTotalProducts] = useState(0);
  const [photoFile, setPhotoFile] = useState(null);

  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [page, rowsPerPage]);

  useEffect(() => {
    filterProducts();
  }, [groupFilter, nameSearch, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products?_page=${page + 1}&_limit=${rowsPerPage}`
      );
      const total = parseInt(response.headers["x-total-count"], 10);
      setTotalProducts(total);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filterProducts = () => {
    const filtered = products.filter((product) => {
      return (
        product.group_name.toLowerCase().includes(groupFilter.toLowerCase()) &&
        product.name.toLowerCase().includes(nameSearch.toLowerCase())
      );
    });
    setFilteredProducts(filtered);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
    setSelectedImage(null);
  };

  const handleDeleteProduct = (id) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteProduct = () => {
    axios
      .delete(`${API_BASE_URL}/products/${productToDelete}`)
      .then(() => {
        fetchProducts();
        setDeleteDialogOpen(false);
        setProductToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleViewDetails = (id) => {
    navigate(`/products/${id}`);
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setProductToEdit(null);
    setPhotoFile(null);
  };

  const handleFileChange = (event) => {
    setPhotoFile(event.target.files[0]);
  };

  const handleSaveEdit = () => {
    const formData = new FormData();
    formData.append("name", productToEdit.name);
    formData.append("group_name", productToEdit.group_name);
    formData.append("size", productToEdit.size);
    formData.append("color", productToEdit.color);
    formData.append("mo_number", productToEdit.mo_number); // Changed price to mo_number
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    axios
      .put(`${API_BASE_URL}/products/${productToEdit.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        fetchProducts();
        handleCloseEditDialog();
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Product Management
      </Typography>

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Group"
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Search by Name"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Group</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>MO Number</TableCell> <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.photo_url ? (
                    <img
                      src={`${API_BASE_URL}/uploads/${product.photo_url}`}
                      alt={product.name}
                      style={{
                        width: 100,
                        height: "auto",
                        cursor: "pointer",
                      }}
                      onClick={() => handleImageClick(product.photo_url)}
                    />
                  ) : (
                    <Box
                      width={100}
                      height={100}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      bgcolor={theme.palette.grey[300]}
                    >
                      <Typography variant="caption">No Image</Typography>
                    </Box>
                  )}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.group_name}</TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.mo_number}</TableCell>{" "}
                <TableCell>
                  <Tooltip title="View Details">
                    <IconButton
                      color="primary"
                      onClick={() => handleViewDetails(product.id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton
                      color="secondary"
                      onClick={() => handleEditProduct(product)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalProducts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog
        open={openImageDialog}
        onClose={handleCloseImageDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Product Image</DialogTitle>
        <DialogContent>
          {selectedImage && (
            <img
              src={`${API_BASE_URL}/uploads/${selectedImage}`}
              alt="Product"
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {productToEdit && (
        <Dialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={productToEdit.name}
                  onChange={(e) =>
                    setProductToEdit({
                      ...productToEdit,
                      name: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Group Name"
                  value={productToEdit.group_name}
                  onChange={(e) =>
                    setProductToEdit({
                      ...productToEdit,
                      group_name: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Size"
                  value={productToEdit.size}
                  onChange={(e) =>
                    setProductToEdit({
                      ...productToEdit,
                      size: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Color"
                  value={productToEdit.color}
                  onChange={(e) =>
                    setProductToEdit({
                      ...productToEdit,
                      color: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="MO Number"
                  value={productToEdit.mo_number}
                  onChange={(e) =>
                    setProductToEdit({
                      ...productToEdit,
                      mo_number: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <input type="file" onChange={handleFileChange} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} color="secondary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteProduct} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Products;

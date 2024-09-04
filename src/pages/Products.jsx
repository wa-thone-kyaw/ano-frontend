import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductPrint.css";
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
  useMediaQuery,
  DialogContentText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import { useTheme } from "@mui/material/styles";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [groupFilter, setGroupFilter] = useState("");
  const [rawMaterialFilter, setRawMaterialFilter] = useState("");
  const [machineTypeFilter, setMachineTypeFilter] = useState("");
  const [moNumberFilter, setMoNumberFilter] = useState("");
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
  const [photoFile, setPhotoFile] = useState(null); // State for the photo file

  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [page, rowsPerPage]);

  useEffect(() => {
    filterProducts();
  }, [
    groupFilter,
    rawMaterialFilter,
    machineTypeFilter,
    moNumberFilter,
    nameSearch,
    products,
  ]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://ano.koneloneshin.com/products?_page=${
          page + 1
        }&_limit=${rowsPerPage}`
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
        product.raw_material_type
          .toLowerCase()
          .includes(rawMaterialFilter.toLowerCase()) &&
        product.machine_type
          .toLowerCase()
          .includes(machineTypeFilter.toLowerCase()) &&
        product.mo_number
          .toLowerCase()
          .includes(moNumberFilter.toLowerCase()) &&
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

  const handleDownloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Aung Ngwe Oh Plastic Factory",
        "",
        "Product Name,Group,Size,Packaging,Color,Price,Raw Material Type,Machine Type,MO Number",
        "",
        ...filteredProducts.map((product) =>
          [
            product.name,
            product.group_name,
            product.size,
            product.packaging,
            product.color,
            product.price,
            product.raw_material_type,
            product.machine_type,
            product.mo_number,
          ].join(",")
        ),
      ].join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDeleteProduct = (id) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteProduct = () => {
    axios
      .delete(`http://ano.koneloneshin.com/products/${productToDelete}`)
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
    setPhotoFile(null); // Clear the photo file when closing the dialog
  };

  const handleFileChange = (event) => {
    setPhotoFile(event.target.files[0]);
  };

  const handleSaveEdit = () => {
    const formData = new FormData();
    formData.append("name", productToEdit.name);
    formData.append("group_name", productToEdit.group_name);
    formData.append("size", productToEdit.size);
    formData.append("packaging", productToEdit.packaging);
    formData.append("color", productToEdit.color);
    formData.append("price", productToEdit.price);
    formData.append("raw_material_type", productToEdit.raw_material_type);
    formData.append("machine_type", productToEdit.machine_type);
    formData.append("mo_number", productToEdit.mo_number);
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    axios
      .put(
        `http://ano.koneloneshin.com/products/${productToEdit.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
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
        {/* Group Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Group"
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
          />
        </Grid>

        {/* Raw Material Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Raw Material Type"
            value={rawMaterialFilter}
            onChange={(e) => setRawMaterialFilter(e.target.value)}
          />
        </Grid>

        {/* Machine Type Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Machine Type"
            value={machineTypeFilter}
            onChange={(e) => setMachineTypeFilter(e.target.value)}
          />
        </Grid>

        {/* MO Number Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="MO Number"
            value={moNumberFilter}
            onChange={(e) => setMoNumberFilter(e.target.value)}
          />
        </Grid>

        {/* Product Name Search */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Search by Name"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
          />
        </Grid>

        {/* Actions (Download and Print) */}
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadCSV}
            fullWidth
          >
            Download CSV
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
            fullWidth
          >
            Print
          </Button>
        </Grid>
      </Grid>
      <div className="printable-area">
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Photo</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Packaging</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Raw Material</TableCell>
                <TableCell>Machine Type</TableCell>
                <TableCell>MO Number</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.photo_url ? (
                      <img
                        src={`http://ano.koneloneshin.com/uploads/${product.photo_url}`}
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
                  <TableCell>{product.packaging}</TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.raw_material_type}</TableCell>
                  <TableCell>{product.machine_type}</TableCell>
                  <TableCell>{product.mo_number}</TableCell>
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

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalProducts}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
      {/* Image Dialog */}
      <Dialog open={openImageDialog} onClose={handleCloseImageDialog}>
        <DialogTitle>Product Image</DialogTitle>
        <DialogContent>
          {selectedImage && (
            <img
              src={`http://ano.koneloneshin.com/uploads/${selectedImage}`}
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteProduct} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {productToEdit && (
            <>
              <TextField
                fullWidth
                label="Product Name"
                value={productToEdit.name}
                onChange={(e) =>
                  setProductToEdit({
                    ...productToEdit,
                    name: e.target.value,
                  })
                }
                style={{ marginBottom: "16px" }}
              />
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
                style={{ marginBottom: "16px" }}
              />
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
                style={{ marginBottom: "16px" }}
              />
              <TextField
                fullWidth
                label="Packaging"
                value={productToEdit.packaging}
                onChange={(e) =>
                  setProductToEdit({
                    ...productToEdit,
                    packaging: e.target.value,
                  })
                }
                style={{ marginBottom: "16px" }}
              />
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
                style={{ marginBottom: "16px" }}
              />
              <TextField
                fullWidth
                label="Price"
                value={productToEdit.price}
                onChange={(e) =>
                  setProductToEdit({
                    ...productToEdit,
                    price: e.target.value,
                  })
                }
                style={{ marginBottom: "16px" }}
              />
              <TextField
                fullWidth
                label="Raw Material Type"
                value={productToEdit.raw_material_type}
                onChange={(e) =>
                  setProductToEdit({
                    ...productToEdit,
                    raw_material_type: e.target.value,
                  })
                }
                style={{ marginBottom: "16px" }}
              />
              <TextField
                fullWidth
                label="Machine Type"
                value={productToEdit.machine_type}
                onChange={(e) =>
                  setProductToEdit({
                    ...productToEdit,
                    machine_type: e.target.value,
                  })
                }
                style={{ marginBottom: "16px" }}
              />
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
                style={{ marginBottom: "16px" }}
              />
              <input
                type="file"
                onChange={handleFileChange}
                style={{ marginTop: "16px" }}
              />
            </>
          )}
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
    </Container>
  );
};

export default Products;

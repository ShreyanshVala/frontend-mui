import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
  Alert,
  CircularProgress,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

export const Read = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [redirectLoading, setRedirectLoading] = useState(false);

  // Function to fetch data using axios
  async function getData() {
    setLoading(true);
    setError("");
    try {
      // const response = await axios.get("https://frontend-mui.vercel.app/get");
      const response = await axios.get(`${BASE_URL}/get`);
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  }

  // Handle item deletion using axios
  const handleDelete = async () => {
    if (!deleteId) return;

    setDeletingId(deleteId); // Set the current deleting item's ID to show the loader
    try {
      const response = await axios.delete(
        // `https://frontend-mui.vercel.app/delete/${deleteId}`
        `${BASE_URL}/delete/${deleteId}`
      );

      setData((prevData) => prevData.filter((item) => item._id !== deleteId));
      setRedirectLoading(true); // Show loader during redirect
      setTimeout(() => {
        setRedirectLoading(false);
      }, 1000);
    } catch (err) {
      setError("Failed to delete item.");
    } finally {
      setDeletingId(null); // Stop showing the loader after deletion
      setOpenDialog(false); // Close the dialog
    }
  };

  // Open confirmation dialog before deleting
  const openDeleteDialog = (id) => {
    setDeleteId(id); // Set the ID of the item to delete
    setOpenDialog(true); // Open the dialog
  };

  // Close dialog without deleting
  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
    setDeleteId(null); // Clear the deleteId
  };

  // Fetch data on component mount
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container sx={{ my: 2 }}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "700",
          fontSize: "2rem",
          color: "#333",
          letterSpacing: "0.1rem",
          textTransform: "uppercase",
        }}
      >
        All Data
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading || redirectLoading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {data.length > 0 ? (
            data.map((ele) => (
              <Grid item xs={12} sm={6} md={3} key={ele._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {ele.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {ele.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {ele.mobile}
                    </Typography>

                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => openDeleteDialog(ele._id)}
                      disabled={deletingId === ele._id}
                      sx={{ position: "relative" }}
                    >
                      {deletingId === ele._id ? (
                        <CircularProgress
                          size={24}
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            marginTop: "-12px",
                            marginLeft: "-12px",
                          }}
                        />
                      ) : (
                        "Delete"
                      )}
                    </Button>

                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/${ele._id}`}
                      sx={{ ml: 1 }}
                    >
                      Edit
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" align="center">
              No data available
            </Typography>
          )}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            {deletingId ? <CircularProgress size={20} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

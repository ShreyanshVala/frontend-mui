import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  TextField,
  Button,
  Container,
  Typography,
  FormControl,
  FormHelperText,
  CircularProgress,
  Box,
  Card,
  CardContent,
} from "@mui/material";

export const Create = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // Fixed typo

  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTitleError("");
    setDescriptionError("");
    setError("");

    let isValid = true;

    // Validate title
    if (!title) {
      setTitleError("Title is required");
      isValid = false;
    }

    // Validate description
    if (!description) {
      setDescriptionError("Description is required.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const newPost = { title, description }; // Ensure correct field name
    setLoading(true);

    try {
      let header = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      // Make the API call to add the data
      const response = await axios.post(`${BASE_URL}/post/add`, newPost, {
        headers: header,
      });

      const result = response.data;

      // Reset form inputs
      setTitle("");
      setDescription("");

      setLoading(false);

      // Navigate to Read page after successful submission
      navigate("/read", { replace: true });
    } catch (error) {
      setError("Error: Could not submit the data. Please try again.");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/read", { replace: true });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (titleError) setTitleError("");
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // Fixed typo
    if (descriptionError) setDescriptionError(""); // Fixed typo
  };

  return (
    <Container
      sx={{
        my: 2,
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('your-image-url-here')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
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
        Enter the data
      </Typography>

      <Card
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 4,
          p: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FormControl error variant="standard" fullWidth>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={title}
                onChange={handleTitleChange}
                error={Boolean(titleError)}
                InputLabelProps={{
                  sx: {
                    fontSize: "1rem",
                    fontWeight: "500",
                  },
                }}
              />
              <FormHelperText
                sx={{
                  marginTop: "-7px",
                  fontSize: "-1rem",
                  fontWeight: "500",
                  color: "red",
                }}
                id="component-error-text"
              >
                {titleError}
              </FormHelperText>
            </FormControl>

            <FormControl error variant="standard" fullWidth>
              <TextField
                label="Description" // Fixed typo in label
                variant="outlined"
                fullWidth
                margin="normal"
                value={description} // Fixed typo
                onChange={handleDescriptionChange} // Fixed typo
                error={Boolean(descriptionError)} // Fixed typo
              />
              <FormHelperText
                sx={{
                  marginTop: "-7px",
                  fontSize: "-1rem",
                  fontWeight: "500",
                  color: "red",
                }}
                id="component-error-text"
              >
                {descriptionError}
              </FormHelperText>
            </FormControl>

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mr: 1 }}
                onClick={handleCancel}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ ml: 1 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

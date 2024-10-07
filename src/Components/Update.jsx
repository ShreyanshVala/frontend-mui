import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

export const Update = () => {
  const { id } = useParams(); // Get the ID from URL parameters
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [initialTitle, setInitialTitle] = useState(""); // To store initial title
  const [initialDescription, setInitialDescription] = useState(""); // To store initial description
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/post/get/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const post = response.data;

        // Check if post data is valid
        if (post) {
          setTitle(post.title);
          setDescription(post.description);
          setInitialTitle(post.title); // Set initial title
          setInitialDescription(post.description); // Set initial description
        } else {
          setError("Post not found");
        }
      } catch (err) {
        setError("Error fetching post data");
        console.error("Error fetching post data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [BASE_URL, id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Check if values have changed
    if (title === initialTitle && description === initialDescription) {
      setError("No changes were made to the post.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${BASE_URL}/post/update/${id}`, // Ensure you use the full URL
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/read");
    } catch (err) {
      setError("Error updating post");
      console.error("Error updating post:", err); // Log error for debugging
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          textAlign: "center",
          color: "black",
          marginBottom: "20px",
          fontWeight: "bold",
          marginTop: "30px",
        }}
      >
        Update Post
      </Typography>

      {error && <Typography color="error">{error}</Typography>}
      <Card>
        <CardContent>
          <form onSubmit={handleUpdate}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";

export const Read = () => {
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // Retrieve token from storage
        const response = await axios.get(`${BASE_URL}/post/get`, {
          headers: { Authorization: `Bearer ${token}` }, // Send token in header
        });
        console.log("Response Data:", response.data); // Debug: Log the response data
        setPosts(response.data); // Ensure this matches your API response structure
        setError("");
      } catch (err) {
        console.error("Error fetching posts:", err); // Debug: Log any errors
        setError("Error fetching posts");
      } finally {
        setLoading(false); // Ensure loading is false regardless of success or failure
      }
    };

    fetchPosts();
  }, [BASE_URL]);

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // Retrieve token from storage
        await axios.delete(`${BASE_URL}/post/delete/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the header
          },
        });
        // Update the state to remove the deleted post
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
        setError("");
      } catch (err) {
        console.error(
          "Delete error:",
          err.response ? err.response.data : err.message
        );
        setError(err.response?.data?.error || "Error deleting post"); // Show specific error message if available
      } finally {
        setLoading(false); // Ensure loading is false regardless of success or failure
      }
    }
  };

  const handleUpdateClick = (postId) => {
    navigate(`/update/${postId}`);
  };

  return (
    <Container>
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
        All Posts
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post._id} sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" component="h4">
                {post.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {post.description}
              </Typography>
              <Button
                variant="contained"
                color="error"
                sx={{
                  mt: 2,
                  mr: 1,
                  minWidth: "120px", // Ensures a minimum width for uniform button size
                  fontWeight: "bold", // Makes the text stand out
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Adds a subtle shadow
                  "&:hover": {
                    backgroundColor: "#d32f2f", // Darker shade on hover
                  },
                }}
                onClick={() => handleDelete(post._id)}
              >
                Delete
              </Button>

              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  minWidth: "120px", // Ensures a minimum width for uniform button size
                  fontWeight: "bold",
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
                onClick={() => handleUpdateClick(post._id)} // Pass post._id as an argument
              >
                Update
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No posts available</Typography>
      )}
    </Container>
  );
};

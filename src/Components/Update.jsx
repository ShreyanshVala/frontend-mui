import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  CircularProgress,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios"; // Import axios

export const Update = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [initialData, setInitialData] = useState({
    name: "",
    email: "",
    mobile: "",
  }); // New state to track initial data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name === initialData.name &&
      email === initialData.email &&
      mobile === initialData.mobile
    ) {
      setError("No changes detected.");
      return;
    }

    if (!name || !email || !mobile) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const updateUser = { name, email, mobile };

    setLoading(true);

    try {
      const response = await axios.patch(
        `${BASE_URL}/update/${id}`,
        updateUser
      );

      if (response.status !== 200) {
        setError(response.data.error || "An unknown error occurred.");
        setLoading(false);
        return;
      }

      setTimeout(() => {
        setLoading(false);
        navigate("/", { replace: true });
      }, 1000);
    } catch (error) {
      setError("Error: Could not update the data.");
      setLoading(false);
    }
  };

  const getSingleUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/get/${id}`);

      if (response.status !== 200) {
        setError(response.data.error);
        setLoading(false);
        return;
      }

      const result = response.data;
      setName(result.name);
      setEmail(result.email);
      setMobile(result.mobile);
      setInitialData({
        name: result.name,
        email: result.email,
        mobile: result.mobile,
      });
      setError("");
      setLoading(false);
    } catch (error) {
      setError("Error fetching user data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, [id]);

  return (
    <Container sx={{ my: 3 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          fontFamily: "'Poppins', sans-serif", // Stylish font family
          fontWeight: "700", // Bold font weight
          fontSize: "2rem", // Font size for large text
          color: "#333", // Darker color for better contrast
          letterSpacing: "0.1rem", // Add letter spacing for elegance
          textTransform: "uppercase", // Uppercase text
        }}
      >
        Edit The Data
      </Typography>

      <Card sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />

            <TextField
              label="Email Address"
              variant="outlined"
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />

            <TextField
              label="Mobile Number"
              variant="outlined"
              margin="normal"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              fullWidth
            />

            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mr: 1 }}
                onClick={() => navigate("/", { replace: true })}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ ml: 1 }}
                disabled={loading} // Disable button while loading
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

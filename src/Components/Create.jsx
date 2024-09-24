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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setMobileError("");
    setError("");

    let isValid = true;

    if (!name) {
      setNameError("Name is required");
      isValid = false;
    }

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (!mobile) {
      setMobileError("Mobile Number is required.");
      isValid = false;
    } else if (!/^\d{10}$/.test(mobile)) {
      setMobileError("Mobile number must be exactly 10 digits.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const addUser = { name, email, mobile };

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/add", addUser);

      const result = response.data;

      if (response.status !== 200 && response.status !== 201) {
        setError(result.error || "An unknown error occurred.");
        if (result.error === "Email address already in use") {
          setEmailError(result.error);
        }
        setLoading(false);
        return;
      }

      setError("");
      setName("");
      setEmail("");
      setMobile("");

      setTimeout(() => {
        setLoading(false);
        navigate("/", { replace: true });
      }, 1000);
    } catch (error) {
      setError("Error: Could not use the same email address.");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/", { replace: true });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (nameError) setNameError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a Valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    if (mobileError) setMobileError("");
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
            <FormControl error={nameError} variant="standard" fullWidth>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={handleNameChange}
                error={nameError}
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
                {nameError}
              </FormHelperText>
            </FormControl>

            <FormControl error variant="standard" fullWidth>
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
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
                {emailError}
              </FormHelperText>
            </FormControl>

            <FormControl error variant="standard" fullWidth>
              <TextField
                label="Mobile Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={mobile}
                onChange={handleMobileChange}
                FormHelperText={mobileError}
                error={mobileError}
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
                {mobileError}
              </FormHelperText>
            </FormControl>

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

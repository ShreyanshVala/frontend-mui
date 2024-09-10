import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";

export const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!name || !email || !age) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const addUser = { name, email, age: Number(age) };
    try {
      const response = await fetch("http://localhost:5000/post", {
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error || "An unknown error occurred.");
        return;
      }

      // Reset form and error state if submission is successful
      console.log(result);
      setError("");
      setName("");
      setEmail("");
      setAge("");
      navigate("/", { replace: true });
    } catch (error) {
      setError("Error: Could not use the same email address.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Enter the data
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Age"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

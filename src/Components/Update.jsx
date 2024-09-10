import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";

export const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !age) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const updateUser = { name, email, age: Number(age) };
    try {
      const response = await fetch(`http://localhost:5000/update/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updateUser),
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

      console.log(result);
      navigate("/:id", { replace: true });
    } catch (error) {
      setError("Error: Could not use the same email address.");
    }
  };

  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:5000/get/${id}`);
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      setError("");
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <Container sx={{ my: 3 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <Typography variant="h4" align="center" gutterBottom>
        Edit The Data
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ minWidth: "700px" }}
        />

        <TextField
          label="Email Address"
          variant="outlined"
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ minWidth: "700px" }}
        />

        <TextField
          label="Age"
          variant="outlined"
          margin="normal"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          sx={{ minWidth: "700px" }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, minWidth: "700px" }}
        >
          Submit
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, minWidth: "700px" }}
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
      </form>
    </Container>
  );
};

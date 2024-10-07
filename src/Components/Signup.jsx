import React, { useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { Box, TextField, Button, FormControl } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate, Link } from "react-router-dom";

export const Signup = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [firstNameError, setfirstNameError] = useState("");
  const [lastNameError, setlastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const onchangefirstNameError = (e) => {
    setfirstName(e.target.value);
    if (e.target.value.length < 3) {
      setfirstNameError("Name must be greater than three characters");
    } else if (/\d/.test(e.target.value)) {
      setfirstNameError("Digits are not allowed");
    } else {
      setfirstNameError("");
    }
  };

  const onchangelastNameError = (e) => {
    setlastName(e.target.value);
    if (e.target.value.length < 3) {
      setlastNameError("Name must be greater than three characters");
    } else if (/\d/.test(e.target.value)) {
      setlastNameError("Digits are not allowed");
    } else {
      setlastNameError("");
    }
  };

  const onchangeEmailError = (e) => {
    setEmail(e.target.value);
    if (!/\S+@\S+\.\S+/.test(e.target.value)) {
      setEmailError("Entered value does not match email format");
    } else {
      setEmailError("");
    }
  };

  const onchangePasswordError = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const onchangeconfirmPasswordError = (e) => {
    setconfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setconfirmPasswordError("Passwords do not match");
    } else {
      setconfirmPasswordError("");
    }
  };

  const handleSubmit = async () => {
    if (!firstName) {
      setfirstNameError("First Name is required");
    }
    if (!lastName) {
      setlastNameError("Last Name is required");
    }
    if (!email) {
      setEmailError("Email is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }
    if (!confirmPassword) {
      setconfirmPasswordError("Confirm Password is required");
    }

    if (
      firstName &&
      lastName &&
      email &&
      password &&
      confirmPassword &&
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      // API call to register user
      try {
        const response = await axios.post(
          "http://localhost:3000/api/register",
          {
            firstName,
            lastName,
            email,
            password,
          }
        );

        if (response.status === 201) {
          alert("User registered successfully");
          navigate("/");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.message);
        } else {
          alert("An error occurred while registering. Please try again.");
        }
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        margin="16px"
        marginTop="100px"
        maxWidth="400px"
        width="100%"
        sx={{
          width: {
            xs: "90%",
            sm: "400px",
            md: "500px",
            lg: "600px",
          },
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.4)",
          borderRadius: "10px",
          padding: "30px",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>

        <FormControl error variant="standard" fullWidth>
          <TextField
            label="First Name"
            margin="normal"
            value={firstName}
            onChange={onchangefirstNameError}
            error={!!firstNameError}
          />
          <FormHelperText sx={{ marginTop: "-7px" }}>
            {firstNameError}
          </FormHelperText>
        </FormControl>

        <FormControl error variant="standard" fullWidth>
          <TextField
            label="Last Name"
            margin="normal"
            value={lastName}
            onChange={onchangelastNameError}
            error={!!lastNameError}
          />
          <FormHelperText sx={{ marginTop: "-7px" }}>
            {lastNameError}
          </FormHelperText>
        </FormControl>

        <FormControl error variant="standard" fullWidth>
          <TextField
            label="Email"
            margin="normal"
            value={email}
            onChange={onchangeEmailError}
            error={!!emailError}
          />
          <FormHelperText sx={{ marginTop: "-7px" }}>
            {emailError}
          </FormHelperText>
        </FormControl>

        <FormControl error variant="standard" fullWidth>
          <TextField
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={onchangePasswordError}
            error={!!passwordError}
          />
          <FormHelperText sx={{ marginTop: "-7px" }}>
            {passwordError}
          </FormHelperText>
        </FormControl>

        <FormControl error variant="standard" fullWidth>
          <TextField
            label="Confirm Password"
            type="password"
            margin="normal"
            value={confirmPassword}
            onChange={onchangeconfirmPasswordError}
            error={!!confirmPasswordError}
          />
          <FormHelperText sx={{ marginTop: "-7px" }}>
            {confirmPasswordError}
          </FormHelperText>
        </FormControl>

        <Button
          sx={{ marginTop: "13px" }}
          variant="contained"
          fullWidth
          onClick={handleSubmit}
        >
          Signup
        </Button>

        <Typography sx={{ marginTop: "20px" }}>
          Already have an account?{" "}
          <Link to="/" sx={{ textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

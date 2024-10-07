import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(""); // State for login error
  const navigate = useNavigate();

  const onchangeEmailError = (e) => {
    setEmail(e.target.value);
    if (!/\S+@\S+\.\S+/.test(e.target.value)) {
      setEmailError("Entered value does not match email format");
    } else {
      setEmailError("");
    }
  };

  const onChangePasswordError = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError("Password must have at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async () => {
    setLoginError(""); // Reset login error before each submission

    if (!email || !password) {
      setEmailError(!email ? "Email is required" : "");
      setPasswordError(!password ? "Password is required" : "");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      const { token } = response.data;

      // Save the token in local storage
      localStorage.setItem("token", token);

      // Navigate to a protected route upon successful login

      navigate("/read", { replace: true });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginError("Invalid email or password. Please try again.");
      } else if (error.response && error.response.status === 404) {
        setLoginError("User not found. Please register first.");
      } else {
        setLoginError("User Not Found Please Signup ");
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
        margin="19px"
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
          Login
        </Typography>

        <FormControl error variant="standard" fullWidth>
          <TextField
            id="outlined-email-input"
            label="Email"
            margin="normal"
            value={email}
            onChange={onchangeEmailError}
            error={!!emailError}
          />
          <FormHelperText sx={{ marginTop: "-7px" }} id="component-error-text">
            {emailError}
          </FormHelperText>
        </FormControl>

        <FormControl error variant="standard" fullWidth>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
            value={password}
            onChange={onChangePasswordError}
            error={!!passwordError}
          />
          <FormHelperText sx={{ marginTop: "-7px" }} id="component-error-text">
            {passwordError}
          </FormHelperText>
        </FormControl>

        {loginError && (
          <Typography color="error" sx={{ marginTop: "10px" }}>
            {loginError}
          </Typography>
        )}

        <Button
          sx={{ marginTop: "13px" }}
          variant="contained"
          fullWidth
          onClick={handleSubmit}
        >
          Login
        </Button>

        <Typography sx={{ marginTop: "20px" }}>
          Don't have an account?{" "}
          <Link to="/Signup" sx={{ textDecoration: "none" }}>
            Signup
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Clear the user token or session information
    localStorage.removeItem("token"); // Assuming token is stored in localStorage
    sessionStorage.clear();

    navigate("/", { replace: true }); // Redirect to login page after logout
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography
          variant="h4"
          sx={{
            flexGrow: 1,
            textAlign: "left",
            fontFamily: "'Poppins', sans-serif", // Stylish font family
            fontWeight: "700", // Bold font weight
            fontSize: "2rem", // Font size for large text
            color: "#333", // Darker color for better contrast
            letterSpacing: "0.1rem", // Add letter spacing for elegance
            textTransform: "uppercase", // Uppercase text for strong emphasis
          }}
        >
          MERN
        </Typography>

        <Box sx={{ display: "flex" }}>
          <Button
            color="inherit"
            component={Link}
            to="/create"
            sx={{
              fontFamily: "'Poppins', sans-serif", // Stylish font family
              fontWeight: "500", // Slightly bold font weight
              fontSize: "1rem", // Font size
              color: "#333", // Darker color for text
              letterSpacing: "0.05rem", // Add letter spacing for elegance
              textTransform: "uppercase", // Uppercase text for consistency
              padding: "8px 16px", // Add padding for button size
              "&:hover": {
                backgroundColor: "#f5f5f5", // Add subtle hover effect
              },
            }}
          >
            Create Post
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/read"
            sx={{
              fontFamily: "'Poppins', sans-serif", // Stylish font family
              fontWeight: "500", // Slightly bold font weight
              fontSize: "1rem", // Font size
              color: "#333", // Darker color for text
              letterSpacing: "0.05rem", // Add letter spacing for elegance
              textTransform: "uppercase", // Uppercase text for consistency
              padding: "8px 16px", // Add padding for button size
              "&:hover": {
                backgroundColor: "#f5f5f5", // Add subtle hover effect
              },
            }}
          >
            AllPost
          </Button>

          <Button
            color="inherit"
            sx={{
              fontFamily: "'Poppins', sans-serif", // Stylish font family
              fontWeight: "500", // Slightly bold font weight
              fontSize: "1rem", // Font size
              color: "#333", // Darker color for text
              letterSpacing: "0.05rem", // Add letter spacing for elegance
              textTransform: "uppercase", // Uppercase text for consistency
              padding: "8px 16px", // Add padding for button size
              "&:hover": {
                backgroundColor: "#f5f5f5", // Add subtle hover effect
              },
            }}
            onClick={handleLogout} // Call handleLogout on button click
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export const Navbar = () => {
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
            to="/"
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
            All Post
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

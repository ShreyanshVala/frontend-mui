import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export const Navbar = () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1, textAlign: "left" }}>
          MERN
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Button color="inherit" component={Link} to="/create">
            Create Post
          </Button>
          <Button color="inherit" component={Link} to="/">
            All Post
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

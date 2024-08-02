import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: "80px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>

          <Button variant="text" href="/">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              color={"white"}
            >
              Wida Tech
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

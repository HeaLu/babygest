import React from "react";
import Container from "@mui/material/Container";
import Bar from "./Bar";
import Navigation from "./Navigation";
import { Box } from "@mui/system";

const Layout = ({ children }) => {
  return (
    <Container maxWidth="sm" disableGutters={true}>
      <Bar />
      <Box sx={{ pb: 7 }}>
        {children}
        <Navigation />
      </Box>
    </Container>
  );
};

export default Layout;

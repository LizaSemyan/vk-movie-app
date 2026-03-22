import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const AppLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Box sx={{ flex: 1, padding: 2 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default AppLayout;

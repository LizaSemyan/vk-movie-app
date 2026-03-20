import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ padding: 2 }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default AppLayout;

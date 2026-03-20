import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Movie App
          </Typography>

          <Button color="inherit" component={Link} to="/">
            Movies
          </Button>
          <Button color="inherit" component={Link} to="/favorites">
            Favorites
          </Button>
          <Button color="inherit" component={Link} to="/compare">
            Compare
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 2 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default AppLayout;

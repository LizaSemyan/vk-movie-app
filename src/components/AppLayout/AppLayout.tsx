import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { AppRoutes } from "../../application";

const AppLayout = () => {
  const navItems = AppRoutes.filter((route) => route.showInNav);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Movie App
          </Typography>

          {navItems.map((route) => {
            const to = route.index ? "/" : `/${route.path}`;
            return (
              <Button color="inherit" component={Link} to={to} key={to}>
                {route.label}
              </Button>
            );
          })}
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 2 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default AppLayout;

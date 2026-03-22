import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { AppRoutes } from "../../application";

const Navbar = () => {
  const navItems = AppRoutes.filter((route) => route.showInNav);

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Movie App
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            {navItems.map((route) => {
              const to = route.index ? "/" : `/${route.path}`;
              return (
                <Button
                  color="inherit"
                  component={NavLink}
                  to={to}
                  key={to}
                  sx={{
                    px: { xs: 1, sm: 2 },
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#b23bd069",
                      color: "#fff",
                    },

                    "&.active": {
                      backgroundColor: "#ad4ae279",
                      color: "#fff",
                    },
                  }}
                >
                  {route.label}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;

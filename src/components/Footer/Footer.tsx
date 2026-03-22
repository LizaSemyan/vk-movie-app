import { Box, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ textAlign: "center", py: 2 }}>
      <Typography variant="body2">
        © 2026 Movie App · by LizaSemyan ·{" "}
        <Link
          href="https://github.com/LizaSemyan"
          target="_blank"
          rel="noopener"
          underline="hover"
        >
          GitHub
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;

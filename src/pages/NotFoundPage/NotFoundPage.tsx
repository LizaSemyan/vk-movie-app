import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Stack
      spacing={3}
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "60vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: 700 }}>
        404
      </Typography>

      <Typography variant="h5">Страница не найдена</Typography>

      <Typography variant="body1">
        Возможно, вы перешли по неверной ссылке
      </Typography>

      <Button variant="contained" component={Link} to="/" sx={{ mt: 2 }}>
        На главную
      </Button>
    </Stack>
  );
};

export default NotFoundPage;

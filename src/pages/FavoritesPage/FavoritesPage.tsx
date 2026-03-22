import { Box, Stack, Typography } from "@mui/material";
import MovieCard from "../../components/MovieCard";
import { useFavorites } from "../../hooks/useFavorites";

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <Stack spacing={4} alignItems="center">
      <Typography variant="h4">Избранное</Typography>

      {favorites.length === 0 ? (
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "80%",
            minHeight: 300,
            borderRadius: 3,
            backgroundColor: "#1e1d1d",
            textAlign: "center",
            px: 3,
            ml: "auto",
            mr: "auto",
            display: "flex",
          }}
        >
          <Typography variant="h6">Список избранного пока пуст</Typography>
          <Typography variant="body1">
            Добавьте фильмы в избранное со страницы списка или со страницы
            фильма.
          </Typography>
        </Stack>
      ) : (
        <Box
          sx={{
            display: "grid",
            width: "80%",
            mx: "auto",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 2,
          }}
        >
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite
              onRemoveFromFavorites={removeFavorite}
            />
          ))}
        </Box>
      )}
    </Stack>
  );
};

export default FavoritesPage;

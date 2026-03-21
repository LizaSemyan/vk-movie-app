import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useMovie } from "../../hooks/useMovie";
import {
  DEFAULT_MOVIE_GENRE_COLOR,
  MOVIE_GENRE_COLORS,
} from "../../constants/movieGenres";
import { getMovieMeta } from "../../utils/getMovieMeta";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const { data: movie, isLoading, isError, error } = useMovie(id);

  const errorMessage =
    error instanceof Error ? error.message : "Неизвестная ошибка";

  const handleGoBack = () => {
    const from =
      typeof location.state === "object" &&
      location.state !== null &&
      "from" in location.state
        ? String(location.state.from)
        : "/";

    navigate(from);
  };

  const { title, posterUrl, description, rating, releaseDate, genres } =
    getMovieMeta(movie);

  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: "auto",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "start",
          mb: 1,
        }}
      >
        <IconButton
          onClick={handleGoBack}
          sx={{ color: "#c9d1de" }}
          aria-label="Назад к списку фильмов"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body1" sx={{ fontWeight: 700, color: "#c9d1de" }}>
          К списку фильмов
        </Typography>
      </Box>
      {isLoading ? (
        <Box>Загрузка фильма...</Box>
      ) : isError ? (
        <Box>Ошибка: {errorMessage}</Box>
      ) : !movie ? (
        <Box>Фильм не найден</Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "400px 1fr",
            },
            gap: 4,
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              width: "100%",
              aspectRatio: "2 / 3",
              borderRadius: 3,
              overflow: "hidden",
              backgroundColor: "#1e1d1d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {posterUrl ? (
              <Box
                component="img"
                src={posterUrl}
                alt={title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  color: "rgba(255,255,255,0.7)",
                  textAlign: "center",
                  px: 2,
                }}
              >
                <MovieIcon sx={{ fontSize: 56 }} />
                <Typography variant="body2">Постер отсутствует</Typography>
              </Box>
            )}
          </Box>

          <Box>
            <Typography
              variant="h4"
              sx={{ mb: 2, fontWeight: 700, color: "#c9d1de" }}
            >
              {title}
            </Typography>

            <Stack
              direction="column"
              spacing={1.5}
              sx={{ mb: 3, alignItems: "start" }}
            >
              <Typography variant="body1">
                <Box
                  component="span"
                  sx={{ fontWeight: 600, color: "#c9d1de" }}
                >
                  Рейтинг:
                </Box>{" "}
                {rating}
              </Typography>

              <Typography variant="body1">
                <Box
                  component="span"
                  sx={{ fontWeight: 600, color: "#c9d1de" }}
                >
                  Дата выхода:
                </Box>{" "}
                {releaseDate}
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  alignItems: "start",
                }}
              >
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <Box
                    component="span"
                    sx={{ fontWeight: 600, color: "#c9d1de" }}
                  >
                    Жанры:
                  </Box>
                </Typography>

                {genres.length > 0 ? (
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {genres.map((genre) => {
                      const backgroundColor =
                        MOVIE_GENRE_COLORS[genre.name] ??
                        DEFAULT_MOVIE_GENRE_COLOR;

                      return (
                        <Chip
                          key={genre.name}
                          label={genre.name}
                          sx={{
                            backgroundColor,
                            color: "#fff",
                            fontWeight: 500,
                          }}
                        />
                      );
                    })}
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Жанры не указаны
                  </Typography>
                )}
              </Box>
            </Stack>

            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 1.5, color: "#c9d1de" }}
              >
                Описание
              </Typography>

              {description.split("\n").map((paragraph, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    color: "#c9d1de",
                    textAlign: "justify",
                    textIndent: "2em",
                    mb: 1,
                  }}
                >
                  {paragraph}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MoviePage;

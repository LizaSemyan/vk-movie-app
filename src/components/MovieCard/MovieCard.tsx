import type { MovieListItem } from "../../types/movie";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Link, useLocation } from "react-router-dom";

interface MovieCardProps {
  movie: MovieListItem;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const location = useLocation();

  const posterUrl = movie.poster?.previewUrl || movie.poster?.url;
  const title = movie.name || movie.alternativeName || "Без названия";
  const rating = movie.rating?.kp || movie.rating?.imdb || "—";
  const year = movie.year || "Год неизвестен";

  const handleOpenMovie = () => {
    sessionStorage.setItem("moviesPageScrollY", String(window.scrollY));
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "#1e1d1d",
        color: "#fff",
      }}
    >
      <CardActionArea
        component={Link}
        to={`/movie/${movie.id}`}
        state={{
          from: `${location.pathname}${location.search}`,
        }}
        onClick={handleOpenMovie}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            width: "100%",
            aspectRatio: "2 / 3",
            backgroundColor: "#2c2a2a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {posterUrl ? (
            <CardMedia
              component="img"
              image={posterUrl}
              alt={title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
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
                px: 2,
                textAlign: "center",
              }}
            >
              <MovieIcon sx={{ fontSize: 48, opacity: 0.8 }} />
              <Typography variant="body2">Постер отсутствует</Typography>
            </Box>
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              fontSize: "1rem",
              fontWeight: 600,
              lineHeight: 1.3,
              minHeight: "2.6em",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.75)", mb: 0.5 }}
          >
            Год: {year}
          </Typography>

          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.75)" }}>
            Рейтинг: {rating}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;

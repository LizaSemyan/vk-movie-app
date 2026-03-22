import type { MouseEvent } from "react";
import type { MovieListItem } from "../../types/movie";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import MovieIcon from "@mui/icons-material/Movie";
import { Link, useLocation } from "react-router-dom";

interface MovieCardProps {
  movie: MovieListItem;
  isFavorite?: boolean;
  isInCompare?: boolean;
  onAddToFavorites?: (movie: MovieListItem) => void;
  onRemoveFromFavorites?: (movieId: number) => void;
  onAddToCompare?: (movie: MovieListItem) => void;
  onRemoveFromCompare?: (movieId: number) => void;
}

const MovieCard = ({
  movie,
  isFavorite = false,
  isInCompare = false,
  onAddToFavorites,
  onRemoveFromFavorites,
  onAddToCompare,
  onRemoveFromCompare,
}: MovieCardProps) => {
  const location = useLocation();

  const posterUrl = movie.poster?.previewUrl || movie.poster?.url;
  const title = movie.name || movie.alternativeName || "Без названия";
  const rating = movie.rating?.kp || movie.rating?.imdb || "—";
  const year = movie.year || "Год неизвестен";

  const handleOpenMovie = () => {
    sessionStorage.setItem("moviesPageScrollY", String(window.scrollY));
  };

  const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isFavorite) {
      onRemoveFromFavorites?.(movie.id);
      return;
    }

    onAddToFavorites?.(movie);
  };

  const handleCompareClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isInCompare) {
      onRemoveFromCompare?.(movie.id);
      return;
    }

    onAddToCompare?.(movie);
  };

  const canShowFavoriteButton = Boolean(
    onAddToFavorites || onRemoveFromFavorites,
  );

  const canShowCompareButton = Boolean(onAddToCompare || onRemoveFromCompare);

  return (
    <Card
      sx={{
        position: "relative",
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

      {canShowCompareButton ? (
        <IconButton
          aria-label={
            isInCompare ? "Убрать из сравнения" : "Добавить в сравнение"
          }
          onClick={handleCompareClick}
          disableRipple
          disableFocusRipple
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            width: 42,
            height: 42,
            zIndex: 2,
            backgroundColor: isInCompare
              ? "rgba(201, 209, 222, 0.92)"
              : "rgba(0, 0, 0, 0.55)",
            backdropFilter: "blur(4px)",
            color: isInCompare ? "#161b22" : "#fff",
            border: "1px solid rgba(255,255,255,0.14)",
            "&:hover": {
              backgroundColor: isInCompare
                ? "rgba(201, 209, 222, 1)"
                : "rgba(0, 0, 0, 0.72)",
            },
          }}
        >
          <CompareArrowsIcon />
        </IconButton>
      ) : null}

      {canShowFavoriteButton ? (
        <IconButton
          aria-label={
            isFavorite ? "Убрать из избранного" : "Добавить в избранное"
          }
          onClick={handleFavoriteClick}
          disableRipple
          disableFocusRipple
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 42,
            height: 42,
            zIndex: 2,
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            backdropFilter: "blur(4px)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.14)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.72)",
            },
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      ) : null}
    </Card>
  );
};

export default MovieCard;

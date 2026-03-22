import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton, Fade } from "@mui/material";

import { useMovies } from "../../hooks/useMovies";
import { useMovieFilters } from "../../hooks/useMovieFilters";
import { useFavorites } from "../../hooks/useFavorites";
import { useCompare } from "../../hooks/useCompare";
import { mapMovieFiltersToQueryParams } from "../../utils/mapMovieFilters";
import {
  MovieCard,
  MoviesFilters,
  AddToFavoritesModal,
} from "../../components";
import {
  createEmptyFilters,
  type MovieFilters,
  type MovieListItem,
} from "../../types/movie";
import { validateMovieFilters as validateFilters } from "../../utils/validateMovieFilters";
import { MOVIE_GENRE_OPTIONS } from "../../constants/movieGenres";

const MoviesPage = () => {
  const location = useLocation();
  const { filters, setFilters, resetFilters } = useMovieFilters();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [draftFilters, setDraftFilters] = useState<MovieFilters>(filters);
  const [selectedMovie, setSelectedMovie] = useState<MovieListItem | null>(
    null,
  );
  const [isAddToFavoritesModalOpen, setIsAddToFavoritesModalOpen] =
    useState(false);

  useEffect(() => {
    setDraftFilters(filters);
  }, [filters]);

  const validationErrors = useMemo(() => {
    return validateFilters(draftFilters);
  }, [draftFilters]);

  const hasValidationErrors = Object.keys(validationErrors).length > 0;

  const moviesQueryParams = useMemo(() => {
    return mapMovieFiltersToQueryParams(filters);
  }, [filters]);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovies(moviesQueryParams);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const savedScrollY = sessionStorage.getItem("moviesPageScrollY");

    if (!savedScrollY) {
      return;
    }

    window.scrollTo({
      top: Number(savedScrollY),
      behavior: "auto",
    });

    sessionStorage.removeItem("moviesPageScrollY");
  }, [isLoading, location.key]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const movies = data?.pages.flatMap((page) => page.docs) ?? [];

  useEffect(() => {
    const target = observerRef.current;

    if (!target || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "200px",
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleFilters = () => {
    if (hasValidationErrors) {
      return;
    }

    setFilters(draftFilters);
  };

  const handleResetFilters = () => {
    const emptyFilters = createEmptyFilters();

    setDraftFilters(emptyFilters);
    resetFilters();
  };

  const handleOpenAddToFavoritesModal = (movie: MovieListItem) => {
    setSelectedMovie(movie);
    setIsAddToFavoritesModalOpen(true);
  };

  const handleCloseAddToFavoritesModal = () => {
    setIsAddToFavoritesModalOpen(false);
    setSelectedMovie(null);
  };

  const handleConfirmAddToFavorites = (movie: MovieListItem) => {
    addFavorite(movie);
    handleCloseAddToFavoritesModal();
  };

  const errorMessage =
    error instanceof Error ? error.message : "Неизвестная ошибка";

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Фильмы
      </Typography>

      <MoviesFilters
        value={draftFilters}
        errors={validationErrors}
        genreOptions={MOVIE_GENRE_OPTIONS}
        onChange={setDraftFilters}
        onApply={handleFilters}
        onReset={handleResetFilters}
        applyDisabled={hasValidationErrors}
      />
      {isLoading ? (
        <Box>Загрузка фильмов...</Box>
      ) : isError ? (
        <Box>Ошибка: {errorMessage}</Box>
      ) : movies.length === 0 ? (
        <Box>Фильмы не найдены</Box>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              width: { xs: "95%", sm: "80%" },
              mx: "auto",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 2,
            }}
          >
            {movies.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={isFavorite(movie.id)}
                  isInCompare={isInCompare(movie.id)}
                  onAddToFavorites={handleOpenAddToFavoritesModal}
                  onRemoveFromFavorites={removeFavorite}
                  onAddToCompare={addToCompare}
                  onRemoveFromCompare={removeFromCompare}
                />
              );
            })}
          </Box>
          <Box ref={observerRef} sx={{ height: 1 }} />

          {isFetchingNextPage && (
            <Typography sx={{ mt: 2, textAlign: "center" }}>
              Загружаем ещё...
            </Typography>
          )}

          {!hasNextPage && movies.length > 0 && (
            <Typography sx={{ mt: 2, textAlign: "center" }}>
              Фильмы закончились
            </Typography>
          )}
        </>
      )}
      <AddToFavoritesModal
        open={isAddToFavoritesModalOpen}
        movie={selectedMovie}
        onClose={handleCloseAddToFavoritesModal}
        onConfirm={handleConfirmAddToFavorites}
      />
      <Fade in={showScrollTop}>
        <IconButton
          onClick={handleScrollToTop}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            width: 48,
            height: 48,
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(6px)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.15)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              transform: "scale(1.1)",
            },
            transition: "all 0.2s ease",
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      </Fade>
    </Box>
  );
};

export default MoviesPage;

import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

import { useMovies } from "../../hooks/useMovies";
import { useMovieFilters } from "../../hooks/useMovieFilters";
import { mapMovieFiltersToQueryParams } from "../../utils/mapMovieFilters";
import { MovieCard, MoviesFilters } from "../../components";
import { createEmptyFilters, type MovieFilters } from "../../types/movie";
import { validateMovieFilters as validateFilters } from "../../utils/validateMovieFilters";
import { MOVIE_GENRE_OPTIONS } from "../../constants/movieGenres";

const MoviesPage = () => {
  const { filters, setFilters, resetFilters } = useMovieFilters();

  const [draftFilters, setDraftFilters] = useState<MovieFilters>(filters);

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

  const errorMessage =
    error instanceof Error ? error.message : "Неизвестная ошибка";

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
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
              width: "80%",
              mx: "auto",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: 2,
            }}
          >
            {movies.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
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
    </Box>
  );
};

export default MoviesPage;

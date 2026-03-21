import { useEffect, useRef } from "react";
import { useMovies } from "../../hooks/useMovies";
import { MovieCard } from "../../components";
import { Box, Typography } from "@mui/material";

const MoviesPage = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovies({ limit: 50 });

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

  const errorMessage =
    error instanceof Error ? error.message : "Неизвестная ошибка";

  if (isLoading) {
    return <Box>Загрузка фильмов...</Box>;
  }

  if (isError) {
    return <Box>Ошибка: {errorMessage}</Box>;
  }

  if (movies.length === 0) {
    return <Box>Фильмы не найдены</Box>;
  }

  return (
    <Box>
      <Typography variant="h4">Фильмы</Typography>

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
    </Box>
  );
};

export default MoviesPage;

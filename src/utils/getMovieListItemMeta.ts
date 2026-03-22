import type { MovieListItem } from "../types/movie";

export const getMovieListItemMeta = (movie?: MovieListItem) => {
  return {
    title: movie?.name || movie?.alternativeName || "Без названия",
    posterUrl: movie?.poster?.previewUrl || movie?.poster?.url,
    year: movie?.year ? String(movie.year) : "—",
    rating: String(movie?.rating?.kp || movie?.rating?.imdb || "—"),
    genres: movie?.genres ?? [],
    movieLength: movie?.movieLength ? `${movie.movieLength} мин.` : "—",
  };
};

import type { MovieDetails, MovieListItem } from "../types/movie";

export const mapMovieDetailsToListItem = (
  movie: MovieDetails | undefined,
): MovieListItem | null => {
  if (!movie) {
    return null;
  }

  return {
    id: movie.id,
    name: movie.name,
    alternativeName: movie.alternativeName,
    year: movie.year,
    shortDescription: movie.shortDescription,
    movieLength: movie.movieLength,
    poster: movie.poster,
    rating: movie.rating,
    genres: movie.genres,
  };
};

import type { MovieDetails } from "../types/movie";
import { formatDate } from "./formatDate";

export const getMovieMeta = (movie: MovieDetails | undefined) => {
  return {
    title: movie?.name || movie?.alternativeName || "Без названия",
    posterUrl: movie?.poster?.url || movie?.poster?.previewUrl,
    description:
      movie?.description || movie?.shortDescription || "Описание отсутствует",
    rating: movie?.rating?.kp || movie?.rating?.imdb || "—",
    releaseDate: formatDate(
      movie?.premiere?.world ||
        movie?.premiere?.russia ||
        movie?.premiere?.digital ||
        movie?.premiere?.cinema,
    ),

    genres: movie?.genres ?? [],
  };
};

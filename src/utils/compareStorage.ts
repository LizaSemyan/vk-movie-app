import type { MovieListItem } from "../types/movie";
import { COMPARE_STORAGE_KEY } from "../constants/storage";

const isMovieListItem = (value: unknown): value is MovieListItem => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return "id" in value && typeof value.id === "number";
};

export const getComparedMoviesFromStorage = (): MovieListItem[] => {
  try {
    const rawValue = localStorage.getItem(COMPARE_STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isMovieListItem).slice(0, 2);
  } catch {
    return [];
  }
};

export const saveComparedMoviesToStorage = (
  comparedMovies: MovieListItem[],
): void => {
  try {
    localStorage.setItem(
      COMPARE_STORAGE_KEY,
      JSON.stringify(comparedMovies.slice(0, 2)),
    );
  } catch {
    //
  }
};

import type { MovieListItem } from "../types/movie";
import { FAVORITES_STORAGE_KEY } from "../constants/storage";

const isMovieListItem = (value: unknown): value is MovieListItem => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return "id" in value && typeof value.id === "number";
};

export const getFavoritesFromStorage = (): MovieListItem[] => {
  try {
    const rawValue = localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isMovieListItem);
  } catch {
    return [];
  }
};

export const saveFavoritesToStorage = (favorites: MovieListItem[]): void => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // подумать
  }
};

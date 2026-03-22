import { useSyncExternalStore } from "react";
import type { MovieListItem } from "../types/movie";
import {
  getFavoritesFromStorage,
  saveFavoritesToStorage,
} from "../utils/favoritesStorage";

type FavoritesListener = () => void;

let favoritesState: MovieListItem[] = getFavoritesFromStorage();
const listeners = new Set<FavoritesListener>();

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

const setFavoritesState = (nextFavorites: MovieListItem[]) => {
  favoritesState = nextFavorites;
  saveFavoritesToStorage(favoritesState);
  emitChange();
};

const subscribe = (listener: FavoritesListener) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => favoritesState;

const addFavorite = (movie: MovieListItem) => {
  const isAlreadyAdded = favoritesState.some(
    (favoriteMovie) => favoriteMovie.id === movie.id,
  );

  if (isAlreadyAdded) {
    return;
  }

  setFavoritesState([...favoritesState, movie]);
};

const removeFavorite = (movieId: number) => {
  setFavoritesState(
    favoritesState.filter((favoriteMovie) => favoriteMovie.id !== movieId),
  );
};

const isFavorite = (movieId: number) => {
  return favoritesState.some((favoriteMovie) => favoriteMovie.id === movieId);
};

const clearFavorites = () => {
  setFavoritesState([]);
};

export const useFavorites = () => {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
  };
};

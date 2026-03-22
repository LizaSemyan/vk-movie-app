import { useSyncExternalStore } from "react";
import type { MovieListItem } from "../types/movie";
import {
  getComparedMoviesFromStorage,
  saveComparedMoviesToStorage,
} from "../utils/compareStorage";

type CompareListener = () => void;

let compareState: MovieListItem[] = getComparedMoviesFromStorage();
const listeners = new Set<CompareListener>();

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

const setCompareState = (nextComparedMovies: MovieListItem[]) => {
  compareState = nextComparedMovies.slice(0, 2);
  saveComparedMoviesToStorage(compareState);
  emitChange();
};

const subscribe = (listener: CompareListener) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => compareState;

const addToCompare = (movie: MovieListItem) => {
  const isAlreadyInCompare = compareState.some(
    (comparedMovie) => comparedMovie.id === movie.id,
  );

  if (isAlreadyInCompare) {
    return;
  }

  if (compareState.length < 2) {
    setCompareState([...compareState, movie]);
    return;
  }

  setCompareState([compareState[1], movie]);
};

const removeFromCompare = (movieId: number) => {
  setCompareState(
    compareState.filter((comparedMovie) => comparedMovie.id !== movieId),
  );
};

const isInCompare = (movieId: number) => {
  return compareState.some((comparedMovie) => comparedMovie.id === movieId);
};

const clearCompare = () => {
  setCompareState([]);
};

export const useCompare = () => {
  const comparedMovies = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot,
  );

  return {
    comparedMovies,
    addToCompare,
    removeFromCompare,
    isInCompare,
    clearCompare,
  };
};

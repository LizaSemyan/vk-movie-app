import type { MovieFilters } from "../types/movie";
import {
  MIN_RATING,
  MAX_RATING,
  MIN_YEAR,
  MAX_YEAR,
} from "../constants/movieFilters";

export type NumberFilterField =
  | "ratingFrom"
  | "ratingTo"
  | "yearFrom"
  | "yearTo";

export type MoviesFiltersErrors = Partial<Record<NumberFilterField, string>>;

export const validateMovieFilters = (
  filters: MovieFilters,
): MoviesFiltersErrors => {
  const errors: MoviesFiltersErrors = {};

  const { ratingFrom, ratingTo, yearFrom, yearTo } = filters;

  if (ratingFrom !== undefined) {
    if (ratingFrom < MIN_RATING || ratingFrom > MAX_RATING) {
      errors.ratingFrom = `Значение рейтинга должно быть от ${MIN_RATING} до ${MAX_RATING}`;
    }
  }

  if (ratingTo !== undefined) {
    if (ratingTo < MIN_RATING || ratingTo > MAX_RATING) {
      errors.ratingTo = `Значение рейтинга должно быть от ${MIN_RATING} до ${MAX_RATING}`;
    }
  }

  if (
    ratingFrom !== undefined &&
    ratingTo !== undefined &&
    ratingFrom > ratingTo
  ) {
    errors.ratingFrom =
      "Начало диапазона должно быть меньше или равно концу диапазона";
    errors.ratingTo =
      "Конец диапазона должен быть больше или равен началу диапазона";
  }

  if (yearFrom !== undefined) {
    if (yearFrom < MIN_YEAR || yearFrom > MAX_YEAR) {
      errors.yearFrom = `Год от должен быть в диапазоне от ${MIN_YEAR} до ${MAX_YEAR}`;
    } else if (!Number.isInteger(yearFrom)) {
      errors.yearFrom = "Год от должен быть целым числом";
    }
  }

  if (yearTo !== undefined) {
    if (yearTo < MIN_YEAR || yearTo > MAX_YEAR) {
      errors.yearTo = `Год до должен быть в диапазоне от ${MIN_YEAR} до ${MAX_YEAR}`;
    } else if (!Number.isInteger(yearTo)) {
      errors.yearTo = "Год до должен быть целым числом";
    }
  }

  if (yearFrom !== undefined && yearTo !== undefined && yearTo < yearFrom) {
    errors.yearFrom =
      "Начало диапазона должно быть меньше или равно концу диапазона";
    errors.yearTo =
      "Конец диапазона должен быть больше или равен началу диапазона";
  }

  return errors;
};

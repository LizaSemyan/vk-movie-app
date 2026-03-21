import type { MovieFilters, MoviesQueryParams } from "../types/movie";
import {
  MIN_RATING,
  MAX_RATING,
  MIN_YEAR,
  MAX_YEAR,
} from "../constants/movieFilters";

const formatRatingRange = (
  from?: number,
  to?: number,
): string[] | undefined => {
  if (from === undefined && to === undefined) {
    return undefined;
  }

  const rangeFrom = from ?? MIN_RATING;
  const rangeTo = to ?? MAX_RATING;

  return [`${rangeFrom}-${rangeTo}`];
};

const formatYearRange = (from?: number, to?: number): string[] | undefined => {
  if (from === undefined && to === undefined) {
    return undefined;
  }

  const rangeFrom = from ?? MIN_YEAR;
  const rangeTo = to ?? MAX_YEAR;

  return [`${rangeFrom}-${rangeTo}`];
};

export const mapMovieFiltersToQueryParams = (
  filters: MovieFilters,
): Omit<MoviesQueryParams, "next"> => {
  return {
    limit: 50,
    selectFields: [
      "id",
      "name",
      "alternativeName",
      "year",
      "rating",
      "genres",
      "poster",
      "movieLength",
      "shortDescription",
    ],
    notNullFields: ["id"],
    "genres.name": filters.genres.length > 0 ? filters.genres : undefined,
    "rating.kp": formatRatingRange(filters.ratingFrom, filters.ratingTo),
    year: formatYearRange(filters.yearFrom, filters.yearTo),
  };
};

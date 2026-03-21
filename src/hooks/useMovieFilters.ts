import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { MovieFilters } from "../types/movie";

const parseNumber = (value: string | null): number | undefined => {
  if (!value) {
    return undefined;
  }

  const parsedValue = Number(value);

  return Number.isNaN(parsedValue) ? undefined : parsedValue;
};

export const useMovieFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<MovieFilters>(() => {
    const genresParam = searchParams.get("genres");

    return {
      genres: genresParam ? genresParam.split(",").filter(Boolean) : [],
      ratingFrom: parseNumber(searchParams.get("ratingFrom")),
      ratingTo: parseNumber(searchParams.get("ratingTo")),
      yearFrom: parseNumber(searchParams.get("yearFrom")),
      yearTo: parseNumber(searchParams.get("yearTo")),
    };
  }, [searchParams]);

  const setFilters = (nextFilters: MovieFilters) => {
    const nextSearchParams = new URLSearchParams();

    if (nextFilters.genres.length > 0) {
      nextSearchParams.set("genres", nextFilters.genres.join(","));
    }

    if (nextFilters.ratingFrom !== undefined) {
      nextSearchParams.set("ratingFrom", String(nextFilters.ratingFrom));
    }

    if (nextFilters.ratingTo !== undefined) {
      nextSearchParams.set("ratingTo", String(nextFilters.ratingTo));
    }

    if (nextFilters.yearFrom !== undefined) {
      nextSearchParams.set("yearFrom", String(nextFilters.yearFrom));
    }

    if (nextFilters.yearTo !== undefined) {
      nextSearchParams.set("yearTo", String(nextFilters.yearTo));
    }

    setSearchParams(nextSearchParams);
  };

  const resetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return {
    filters,
    setFilters,
    resetFilters,
  };
};

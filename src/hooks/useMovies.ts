import { useInfiniteQuery } from "@tanstack/react-query";
import { movieService } from "../api/movie.service";
import type { MoviesQueryParams } from "../types/movie";

export const useMovies = (params: Omit<MoviesQueryParams, "next"> = {}) => {
  return useInfiniteQuery({
    queryKey: ["movies", params],
    queryFn: ({ pageParam }) =>
      movieService.getMovies({
        ...params,
        next: pageParam,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext || !lastPage.next) {
        return undefined;
      }

      return lastPage.next;
    },
  });
};

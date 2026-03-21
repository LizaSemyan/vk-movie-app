import { useQuery } from "@tanstack/react-query";
import { movieService } from "../api/movie.service";

export const useMovie = (id?: string) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("ID фильма не передан");
      }

      return movieService.getMovieById(id);
    },
    enabled: Boolean(id),
  });
};

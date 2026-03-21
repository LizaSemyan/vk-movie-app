import apiClient from "./axios";
import type {
  MovieDetails,
  MoviesCursorResponse,
  MoviesQueryParams,
} from "../types/movie";

export const movieService = {
  async getMovies(
    params: MoviesQueryParams = {},
  ): Promise<MoviesCursorResponse> {
    const { data } = await apiClient.get<MoviesCursorResponse>("/v1.5/movie", {
      params,
      paramsSerializer: {
        indexes: null,
      },
    });

    return data;
  },

  async getMovieById(id: number | string): Promise<MovieDetails> {
    const { data } = await apiClient.get<MovieDetails>(`/v1.4/movie/${id}`);
    return data;
  },
};

export type MoviePoster = {
  url?: string | null;
  previewUrl?: string | null;
};

export type MovieRating = {
  kp?: number | null;
  imdb?: number | null;
};

export type MovieGenre = {
  name: string;
};

export type MovieListItem = {
  id: number;
  name?: string | null;
  alternativeName?: string | null;
  year?: number | null;
  shortDescription?: string | null;
  movieLength?: number | null;
  poster?: MoviePoster | null;
  rating?: MovieRating | null;
  genres?: MovieGenre[] | null;
};

export type MoviePremiere = {
  world?: string | null;
  russia?: string | null;
  digital?: string | null;
  cinema?: string | null;
};

export type MovieDetails = {
  id: number;
  name?: string | null;
  alternativeName?: string | null;
  description?: string | null;
  shortDescription?: string | null;
  year?: number | null;
  movieLength?: number | null;
  poster?: MoviePoster | null;
  rating?: MovieRating | null;
  genres?: MovieGenre[] | null;
  premiere?: MoviePremiere | null;
};

export type MovieFilters = {
  genres: string[];
  ratingFrom?: number;
  ratingTo?: number;
  yearFrom?: number;
  yearTo?: number;
};

export const createEmptyFilters = (): MovieFilters => ({
  genres: [],
  ratingFrom: undefined,
  ratingTo: undefined,
  yearFrom: undefined,
  yearTo: undefined,
});

export type MoviesQueryParams = {
  limit?: number;
  next?: string;
  selectFields?: string[];
  notNullFields?: string[];
  "genres.name"?: string[];
  "rating.kp"?: string[];
  year?: string[];
};

export type MoviesCursorResponse = {
  docs: MovieListItem[];
  total?: number;
  limit: number;
  next?: string | null;
  prev?: string | null;
  hasNext: boolean;
};

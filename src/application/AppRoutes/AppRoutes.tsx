import type { ReactNode } from "react";
import { MoviesPage, MoviePage, FavoritesPage, ComparePage } from "../../pages";

export type AppRoute = {
  path?: string;
  index?: boolean;
  element: ReactNode;
  label?: string;
  showInNav: boolean;
};

const AppRoutes: AppRoute[] = [
  {
    index: true,
    element: <MoviesPage />,
    label: "Фильмы",
    showInNav: true,
  },
  {
    path: "movie/:id",
    element: <MoviePage />,
    showInNav: false,
  },
  {
    path: "favorites",
    element: <FavoritesPage />,
    label: "Избранное",
    showInNav: true,
  },
  {
    path: "compare",
    element: <ComparePage />,
    label: "Сравнение",
    showInNav: true,
  },
];

export default AppRoutes;

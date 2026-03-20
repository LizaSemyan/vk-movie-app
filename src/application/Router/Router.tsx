import { createBrowserRouter } from "react-router-dom";
import { MoviesPage, MoviePage, FavoritesPage, ComparePage } from "../../pages";
import { AppLayout } from "../../components";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <MoviesPage /> },
      { path: "/movie/:id", element: <MoviePage /> },
      { path: "/favorites", element: <FavoritesPage /> },
      { path: "/compare", element: <ComparePage /> },
    ],
  },
]);

export default Router;

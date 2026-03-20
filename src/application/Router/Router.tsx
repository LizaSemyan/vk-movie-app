import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../../components";
import AppRoutes from "../AppRoutes";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: AppRoutes,
  },
]);

export default Router;

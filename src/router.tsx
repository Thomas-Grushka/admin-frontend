import { createBrowserRouter } from "react-router-dom";
import {LoginPage} from "./pages/Login";
import Sidebar from "./components/sidebar";
import { Dashboard } from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import Filters from "./pages/Filters";
import TelegramGroupsPage from "./pages/TelegramGroupsPage";
import TelegramSingleGroupPage from "./pages/TelegramSingleGroupPage";
import Activities from "./pages/Activities";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/activities",
        element: <Activities />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/filters",
        element: <Filters />,
      },
      {
        path: "/telegram-groups",
        element: <TelegramGroupsPage />,
      },
      {
        path: "/telegram-groups/:id",
        element: <TelegramSingleGroupPage />,
      },
    ],
  },
  // { path: "*", element: <Sidebar /> },
]);

export default router;

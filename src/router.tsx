import { createBrowserRouter, Navigate } from "react-router-dom";

import { MainLayout } from "./layouts";
import { SavedUsersPage, UsersPage } from "./pages";

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"users"} />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "savedUsers",
        element: <SavedUsersPage />,
      },
    ],
  },
]);

export { router };

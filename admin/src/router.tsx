import { createBrowserRouter, Navigate } from "react-router-dom"
import MainLayout from "./layouts/mainLayout"
import ErrorPage from "./pages/error"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import Article from "./pages/article"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to={"/article"} /> },
      {
        path: "/article",
        element: <Article />,
      },
      {
        path: "/two",
        element: <Dashboard />,
      },
      {
        path: "/three",
        element: <Dashboard />,
      },
      {
        path: "/four",
        element: <Dashboard />,
      },
      {
        path: "/five",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
])

export default router

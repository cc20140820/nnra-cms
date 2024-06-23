import { createBrowserRouter, Navigate } from "react-router-dom"
import MainLayout from "./layouts/mainLayout"
import ErrorPage from "./pages/error"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import Article from "./pages/article"
import Category from "./pages/category"
import Tag from "./pages/tag"

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
        path: "/category",
        element: <Category />,
      },
      {
        path: "/tag",
        element: <Tag />,
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

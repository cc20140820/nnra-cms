import { createBrowserRouter, Navigate } from "react-router-dom"
import MainLayout from "./layouts/mainLayout"
import ErrorPage from "./pages/error"
import Login from "./pages/loginCenter"
import Dashboard from "./pages/dashboard"
import Book from "./pages/readingCorner/book"
import Category from "./pages/readingCorner/category"
import Tag from "./pages/readingCorner/tag"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to={"/book"} /> },
      {
        path: "/book",
        element: <Book />,
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

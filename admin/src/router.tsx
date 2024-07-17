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
        path: "/a",
        element: <Dashboard />,
      },
      {
        path: "/b",
        element: <Dashboard />,
      },
      {
        path: "/c",
        element: <Dashboard />,
      },
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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
])

export default router

import { createBrowserRouter, Navigate } from "react-router-dom"
import MainLayout from "./layouts/mainLayout"
import ErrorPage from "./pages/error"
import Login from "./pages/loginCenter"
import Dashboard from "./pages/overview/dashboard"
import Books from "./pages/readingCorner/books"
import Categories from "./pages/readingCorner/categories"
import Tags from "./pages/readingCorner/tags"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to={"/dashboard"} /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "tags",
        element: <Tags />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
])

export default router

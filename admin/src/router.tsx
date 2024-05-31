import { createBrowserRouter, Navigate } from "react-router-dom"
import MainLayout from "./layouts/mainLayout"
import ErrorPage from "./pages/error"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import Product from "./pages/product"

// TODO: lazyload

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to={"/one"} /> },
      {
        path: "/one",
        element: <Product />,
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

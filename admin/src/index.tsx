import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom"
import { ConfigProvider } from "antd"
import ErrorPage from "./pages/error"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import Product from "./pages/product"
import MainLayout from "./layouts/mainLayout"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

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

root.render(
  <React.StrictMode>
    <ConfigProvider>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
)

// reportWebVitals(console.log)
